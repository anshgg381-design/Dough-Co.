'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  AdvancedMarker,
  APILoadingStatus,
  APIProvider,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import type { GroundedPlaceLocation } from '@/app/api/location/route';

interface LocationApiResponse {
  mapsApiKey: string;
  place: GroundedPlaceLocation | null;
  quotaExceeded: boolean;
}

function StaticAddressFallback({ message }: { message?: string }) {
  return (
    <div
      data-testid="visit-map-fallback"
      className="h-[340px] sm:h-[400px] w-full border border-[#0B0A09] bg-[#FFFFFF] p-7 sm:p-10 flex flex-col justify-between"
    >
      <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 text-[#8C6200] shrink-0 mt-1" />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C6200]">
            Model Town, Panipat
          </p>
          <p className="mt-1.5 font-display text-[26px] font-bold uppercase tracking-[-0.01em] text-[#0B0A09]">
            {siteConfig.name}
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-[#46423D] max-w-[46ch]">
            {siteConfig.address.full}
          </p>
          {message && (
            <p className="mt-2 text-[13px] text-[#6B655D]">{message}</p>
          )}
        </div>
      </div>

      <div className="pt-5 border-t border-[#0B0A09]/15 flex flex-wrap items-center justify-between gap-4">
        <span className="text-[13px] font-medium text-[#46423D]">
          Landmark: Next to IDFC Bank, near Ram Lal Chowk
        </span>
        <a
          href={siteConfig.links.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 border border-[#0B0A09] bg-[#0B0A09] px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#FFFFFF] transition-colors duration-200 hover:bg-[#F5C300] hover:text-[#0B0A09]"
        >
          <span>Open in Google Maps</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

function InteractiveMapCanvas({
  initialPlace,
}: {
  initialPlace: GroundedPlaceLocation | null;
}) {
  const apiStatus = useApiLoadingStatus();
  const placesLib = useMapsLibrary('places');

  const [resolvedPlace, setResolvedPlace] =
    useState<GroundedPlaceLocation | null>(initialPlace);
  const [resolvingClientPlace, setResolvingClientPlace] = useState(
    initialPlace === null
  );
  const [infoOpen, setInfoOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const handleOpenInfo = useCallback(() => setInfoOpen(true), []);
  const handleCloseInfo = useCallback(() => setInfoOpen(false), []);

  useEffect(() => {
    if (resolvedPlace || !placesLib) return;
    let cancelled = false;

    const lookupPlace = async () => {
      try {
        const result = await placesLib.Place.searchByText({
          textQuery: `${siteConfig.name} ${siteConfig.address.full}`,
          fields: ['id', 'displayName', 'formattedAddress', 'location', 'googleMapsURI'],
          maxResultCount: 1,
          region: 'IN',
        });

        if (cancelled) return;
        const first = result.places?.[0];
        const loc = first?.location;
        if (loc) {
          setResolvedPlace({
            placeId: first.id ?? null,
            displayName: first.displayName ?? siteConfig.name,
            formattedAddress: first.formattedAddress ?? siteConfig.address.full,
            lat: loc.lat(),
            lng: loc.lng(),
            googleMapsUri: first.googleMapsURI ?? siteConfig.links.maps,
          });
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (
          msg.includes('RESOURCE_EXHAUSTED') ||
          msg.includes('OVER_QUERY_LIMIT') ||
          msg.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
      } finally {
        if (!cancelled) {
          setResolvingClientPlace(false);
        }
      }
    };

    void lookupPlace();
    return () => {
      cancelled = true;
    };
  }, [placesLib, resolvedPlace]);

  if (
    apiStatus === APILoadingStatus.FAILED ||
    apiStatus === APILoadingStatus.AUTH_FAILURE
  ) {
    return (
      <StaticAddressFallback message="Interactive map could not load right now — use the direct Google Maps link for navigation." />
    );
  }

  if (!resolvedPlace) {
    if (resolvingClientPlace) {
      return (
        <div
          aria-busy="true"
          className="h-[340px] sm:h-[400px] w-full border border-[#0B0A09] bg-[#F5F2EB] flex items-center justify-center p-6 text-center"
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#46423D]">
            Loading Google Map for Model Town, Panipat...
          </p>
        </div>
      );
    }
    return <StaticAddressFallback />;
  }

  const position = { lat: resolvedPlace.lat, lng: resolvedPlace.lng };

  return (
    <div
      data-testid="visit-google-map"
      className="relative h-[340px] sm:h-[400px] w-full border border-[#0B0A09] bg-[#F5F2EB] overflow-hidden"
    >
      <GoogleMap
        mapId="DEMO_MAP_ID"
        defaultZoom={16}
        defaultCenter={position}
        gestureHandling="cooperative"
        streetViewControl={false}
        mapTypeControl={false}
        fullscreenControl={true}
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
      >
        <AdvancedMarker
          ref={markerRef}
          position={position}
          onClick={handleOpenInfo}
          title={resolvedPlace.displayName}
        >
          <Pin
            background="#0B0A09"
            borderColor="#0B0A09"
            glyphColor="#F5C300"
            scale={1.18}
          />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow
            anchor={marker}
            maxWidth={270}
            onCloseClick={handleCloseInfo}
          >
            <div className="p-1 text-[#0B0A09]">
              <p className="font-display text-[17px] font-bold uppercase tracking-[-0.01em]">
                {resolvedPlace.displayName}
              </p>
              <p className="mt-1 text-[12px] leading-snug text-[#46423D]">
                {resolvedPlace.formattedAddress}
              </p>
              <a
                href={resolvedPlace.googleMapsUri}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#8C6200] underline underline-offset-4"
              >
                <span>Get directions</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default function VisitMap() {
  const [config, setConfig] = useState<LocationApiResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadLocationConfig = async () => {
      try {
        const res = await fetch('/api/location', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const payload = (await res.json()) as LocationApiResponse;
        if (cancelled) return;

        if (payload.quotaExceeded) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        setConfig(payload);
      } catch {
        // Fallback renders cleanly
      } finally {
        if (!cancelled) {
          setLoaded(true);
        }
      }
    };

    void loadLocationConfig();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!loaded) {
    return (
      <div
        aria-busy="true"
        className="h-[340px] sm:h-[400px] w-full border border-[#0B0A09] bg-[#FFFFFF] flex items-center justify-center p-6 text-center"
      >
        <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#46423D]">
          Loading location map...
        </p>
      </div>
    );
  }

  const clientFallbackKey =
    (typeof process !== 'undefined'
      ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim()
      : '') ||
    ((globalThis as { GOOGLE_MAPS_API_KEY?: string }).GOOGLE_MAPS_API_KEY?.trim() ??
      '');

  const resolvedApiKey = config?.mapsApiKey || clientFallbackKey;

  if (!resolvedApiKey) {
    return <StaticAddressFallback />;
  }

  return (
    <APIProvider
      apiKey={resolvedApiKey}
      language="en"
      region="IN"
      libraries={['places', 'marker']}
    >
      <InteractiveMapCanvas initialPlace={config?.place ?? null} />
    </APIProvider>
  );
}
