import { NextResponse } from 'next/server';
import { FALLBACK_INSTAGRAM_POSTS, type InstagramPost } from '@/data/instagram';
import { siteConfig } from '@/data/siteConfig';

export const revalidate = 3600;

interface InstagramGraphMediaItem {
  id: string;
  caption?: string;
  media_type?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  permalink?: string;
  thumbnail_url?: string;
  timestamp?: string;
}

function formatRelativeTime(isoString?: string): string {
  if (!isoString) return 'recently';
  const now = Date.now();
  const past = new Date(isoString).getTime();
  if (Number.isNaN(past)) return 'recently';
  const diffDays = Math.floor((now - past) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return 'today';
  if (diffDays === 1) return '1d ago';
  if (diffDays < 7) return `${diffDays}d ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 5) return `${diffWeeks}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json({
      success: true,
      source: 'curated',
      username: siteConfig.instagram.handle,
      profileUrl: siteConfig.links.instagram,
      posts: FALLBACK_INSTAGRAM_POSTS,
      updatedAt: new Date().toISOString(),
    });
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=6&access_token=${token}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`Instagram API status: ${res.status}`);
    }

    const json = (await res.json()) as { data?: InstagramGraphMediaItem[] };
    const items = json.data;

    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('No media returned from Instagram');
    }

    const posts: InstagramPost[] = items.map((item) => {
      const mediaUrl =
        item.media_type === 'VIDEO'
          ? item.thumbnail_url || item.media_url || ''
          : item.media_url || '';

      return {
        id: item.id,
        caption: item.caption || '',
        mediaUrl,
        permalink: item.permalink || siteConfig.links.instagram,
        timestamp: item.timestamp || new Date().toISOString(),
        mediaType: item.media_type || 'IMAGE',
        location: 'Model Town, Panipat',
        shortDate: formatRelativeTime(item.timestamp),
      };
    });

    return NextResponse.json({
      success: true,
      source: 'live',
      username: siteConfig.instagram.handle,
      profileUrl: siteConfig.links.instagram,
      posts,
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({
      success: true,
      source: 'fallback',
      username: siteConfig.instagram.handle,
      profileUrl: siteConfig.links.instagram,
      posts: FALLBACK_INSTAGRAM_POSTS,
      updatedAt: new Date().toISOString(),
    });
  }
}
