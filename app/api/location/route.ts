import { NextResponse } from 'next/server';
import { siteConfig } from '@/data/siteConfig';

export interface GroundedPlaceLocation {
  placeId: string | null;
  displayName: string;
  formattedAddress: string;
  lat: number;
  lng: number;
  googleMapsUri: string;
}

interface LocationPayload {
  mapsApiKey: string;
  place: GroundedPlaceLocation | null;
  quotaExceeded: boolean;
}

const CACHE_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours (< 30-day ToS limit)
let cachedPlace: { data: GroundedPlaceLocation; fetchedAt: number } | null =
  null;

function getMapsApiKey(): string {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ||
    process.env.GOOGLE_MAPS_API_KEY?.trim() ||
    ''
  );
}

export async function GET() {
  const mapsApiKey = getMapsApiKey();
  if (!mapsApiKey) {
    const emptyPayload: LocationPayload = {
      mapsApiKey: '',
      place: null,
      quotaExceeded: false,
    };
    return NextResponse.json(emptyPayload, {
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  if (cachedPlace && Date.now() - cachedPlace.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json({
      mapsApiKey,
      place: cachedPlace.data,
      quotaExceeded: false,
    } satisfies LocationPayload);
  }

  // Primary grounding: Places API (New) Text Search
  try {
    const placesRes = await fetch(
      'https://places.googleapis.com/v1/places:searchText',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': mapsApiKey,
          'X-Goog-FieldMask':
            'places.id,places.displayName,places.formattedAddress,places.location,places.googleMapsUri',
          'X-Goog-Maps-Solution-ID': 'gmp_mcp_codeassist_v1_aistudio',
        },
        body: JSON.stringify({
          textQuery: `${siteConfig.name} ${siteConfig.address.full}`,
          regionCode: 'IN',
          languageCode: 'en',
          pageSize: 1,
        }),
        cache: 'no-store',
      }
    );

    const placesJson = await placesRes.json().catch(() => null);
    if (
      placesRes.status === 429 ||
      placesJson?.error?.status === 'RESOURCE_EXHAUSTED'
    ) {
      return NextResponse.json({
        mapsApiKey,
        place: null,
        quotaExceeded: true,
      } satisfies LocationPayload);
    }

    const first = placesJson?.places?.[0];
    const lat = first?.location?.latitude;
    const lng = first?.location?.longitude;
    if (typeof lat === 'number' && typeof lng === 'number') {
      const resolved: GroundedPlaceLocation = {
        placeId: first.id ?? null,
        displayName: first.displayName?.text ?? siteConfig.name,
        formattedAddress: first.formattedAddress ?? siteConfig.address.full,
        lat,
        lng,
        googleMapsUri: first.googleMapsUri ?? siteConfig.links.maps,
      };
      cachedPlace = { data: resolved, fetchedAt: Date.now() };
      return NextResponse.json({
        mapsApiKey,
        place: resolved,
        quotaExceeded: false,
      } satisfies LocationPayload);
    }
  } catch {
    // Fall through to Geocoding REST fallback or client Places SDK lookup
  }

  // Secondary grounding: Geocoding REST API (server-side proxy avoids CF1 CORS)
  try {
    const geocodeUrl = new URL(
      'https://maps.googleapis.com/maps/api/geocode/json'
    );
    geocodeUrl.searchParams.set('address', siteConfig.address.full);
    geocodeUrl.searchParams.set('region', 'in');
    geocodeUrl.searchParams.set('key', mapsApiKey);

    const geoRes = await fetch(geocodeUrl.toString(), { cache: 'no-store' });
    const geoJson = await geoRes.json().catch(() => null);
    if (
      geoRes.status === 429 ||
      geoJson?.status === 'OVER_QUERY_LIMIT' ||
      geoJson?.error_message?.toLowerCase?.().includes('quota')
    ) {
      return NextResponse.json({
        mapsApiKey,
        place: null,
        quotaExceeded: true,
      } satisfies LocationPayload);
    }

    const firstGeo = geoJson?.results?.[0];
    const lat = firstGeo?.geometry?.location?.lat;
    const lng = firstGeo?.geometry?.location?.lng;
    if (typeof lat === 'number' && typeof lng === 'number') {
      const resolved: GroundedPlaceLocation = {
        placeId: firstGeo.place_id ?? null,
        displayName: siteConfig.name,
        formattedAddress: firstGeo.formatted_address ?? siteConfig.address.full,
        lat,
        lng,
        googleMapsUri: siteConfig.links.maps,
      };
      cachedPlace = { data: resolved, fetchedAt: Date.now() };
      return NextResponse.json({
        mapsApiKey,
        place: resolved,
        quotaExceeded: false,
      } satisfies LocationPayload);
    }
  } catch {
    // Client SDK Place.searchByText will attempt resolution on load
  }

  return NextResponse.json({
    mapsApiKey,
    place: null,
    quotaExceeded: false,
  } satisfies LocationPayload);
}
