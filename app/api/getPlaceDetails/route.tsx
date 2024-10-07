// app/api/getPlaceDetails/route.ts

import { NextRequest, NextResponse } from "next/server";

// Define the expected structure for the Google Place Response
type GooglePlaceResponse = {
  result?: {
    name: string;
    rating?: number;
    formatted_address: string;
    formatted_phone_number?: string;
    opening_hours?: {
      weekday_text: string[];
    };
    photos?: {
      photo_reference: string;
    }[];
    reviews?: {
      text: string;
    }[];
  };
  error_message?: string;
};

// Function to expand a shortened Google Maps URL
async function expandShortenedUrl(shortUrl: string): Promise<string | null> {
  try {
    // Use fetch to get the final URL (will follow redirects automatically)
    const response = await fetch(shortUrl, {
      method: "HEAD",
      redirect: "follow",
    });

    // Return the final redirected URL
    return response.url;
  } catch (error) {
    console.error("Error expanding URL:", error);
    return null;
  }
}

// Function to extract Place ID from the full Google Maps URL
function extractPlaceIdFromUrl(url: string): string | null {
  const placeIdMatch = url.match(/!1s([^!]+)/);
  return placeIdMatch ? placeIdMatch[1] : null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const shortUrl = searchParams.get("shortUrl");

  if (!shortUrl) {
    return NextResponse.json({ error: "Shortened URL is required" }, { status: 400 });
  }

  // Step 1: Expand the shortened URL
  const fullUrl = await expandShortenedUrl(shortUrl);
  if (!fullUrl) {
    return NextResponse.json({ error: "Failed to expand the shortened URL" }, { status: 500 });
  }

  // Step 2: Extract Place ID from the expanded URL
  const placeId = extractPlaceIdFromUrl(fullUrl);
  if (!placeId) {
    return NextResponse.json({ error: "Failed to extract Place ID from the URL" }, { status: 400 });
  }

  // Fetch place details from Google Places API
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data: GooglePlaceResponse = await response.json();

    if (data.error_message) {
      return NextResponse.json({ error: data.error_message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching place details" },
      { status: 500 }
    );
  }
}
