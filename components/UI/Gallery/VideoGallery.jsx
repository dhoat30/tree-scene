"use client";
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import BeforeAfterMasonry from "../BeforeAfterSlider/BeforeAfterMasonry";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

const ReactPlayer = dynamic(
  () => import("react-player").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  },
);

export default function VideoGallery({ galleryData }) {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);
  if (!galleryData) return null;

  return (
    <Section>
      <div className="grid">
        {galleryData.map((item, index) => (
          <div key={index} className="image-container">
            {hasWindow && (
              <ReactPlayer
                src={`https://www.youtube.com/watch?v=${item.youtube_id}`}
                light={`https://i.ytimg.com/vi/${item.youtube_id}/hqdefault.jpg`}
                playing
                previewAriaLabel={`Play tree work video ${index + 1}`}
                wrapper="div"
                width="100%"
                height="100%"
                controls={true}
                style={{ position: "absolute", top: 0, left: 0 }}
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-top: 16px;
  .tabs-wrapper {
    .MuiTabs-flexContainer {
    }

    button {
      border-bottom: 1px solid var(--light-outline-variant);
    }
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 0 0 24px 0;
    margin: 0 16px;
    gap: 16px;
    @media (max-width: 1366px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 800px) {
      grid-template-columns: 1fr;
    }
  }
  .image-container {
    position: relative;
    aspect-ratio: 16 / 9;
    min-width: 0;
    overflow: hidden;
    border-radius: 12px;
    background: var(--light-secondary);
  }
`;
