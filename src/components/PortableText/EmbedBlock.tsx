import React from "react";
import styles from "@/styles/css/components/portableText.module.css";

interface EmbedBlockValue {
  _type: "embedBlock";
  provider: "youtube" | "codesandbox" | "twitter" | "vimeo" | "codepen" | "figma" | "other";
  url: string;
  caption?: string;
}

export function EmbedBlock({ value }: { value: EmbedBlockValue }) {
  const getEmbedUrl = (url: string, provider: string): string => {
    if (provider === "youtube") {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (provider === "vimeo") {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  return (
    <figure className={styles.embed}>
      <div className={styles.embedWrapper}>
        <iframe
          src={getEmbedUrl(value.url, value.provider)}
          title={value.caption || `${value.provider} embed`}
          allowFullScreen
          className={styles.embedIframe}
        />
      </div>
      {value.caption && (
        <figcaption className={styles.embedCaption}>{value.caption}</figcaption>
      )}
    </figure>
  );
}
