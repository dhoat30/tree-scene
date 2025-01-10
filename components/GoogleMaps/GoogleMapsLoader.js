// components/GoogleMapsLoader.js

"use client";

import Script from 'next/script';

export default function GoogleMapsLoader({ onLoad }) {
  return (
    <Script
      src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBXgP4lHtDjEfraejSCNe99RDTweKuP0R0&libraries=places`}
      strategy="lazyOnload"
      onLoad={onLoad}
    />
  );
}