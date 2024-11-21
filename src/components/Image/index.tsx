import React from "react";
import NextImage from "next/image";
import style from "./Image.module.scss";

type ImageProps = {
  src: string;
  srcMobile: string;
  alt: string;
};

const Image = ({ src, alt, srcMobile }: ImageProps) => {
  return (
    <div className={style.container}>
      <NextImage
        src={src}
        alt={alt}
        className={`${style.image} ${style.desktop}`}
        width={0}
        height={0}
        sizes="100%"
      />
      <NextImage
        src={srcMobile}
        alt={alt}
        className={`${style.image} ${style.mobile}`}
        width={0}
        height={0}
        sizes="100%"
      />
    </div>
  );
};

export default Image;
