import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import styles from "@/styles/css/components/portableText.module.css";

interface ImageBlockValue {
  _type: "imageBlock";
  image: any;
  alt?: string;
}

export function ImageBlock({ value }: { value: ImageBlockValue }) {
  if (!value.image) return null;

  return (
    <figure className={styles.imageBlock}>
      <div className={styles.imageWrapper}>
        <Image
          src={urlFor(value.image).width(800).url()}
          alt={value.alt || ""}
          width={800}
          height={450}
          className={styles.image}
        />
      </div>
      {value.alt && (
        <figcaption className={styles.imageCaption}>{value.alt}</figcaption>
      )}
    </figure>
  );
}
