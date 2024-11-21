import React from "react";

import style from "./ExternalLink.module.scss";

type ExternalLinkProps = {
  text: string;
  url: string;
  openLinkInNewTab?: boolean;
};

const ExternalLink = ({ text, url, openLinkInNewTab }: ExternalLinkProps) => {
  return (
    <div className={style.container}>
      <a
        href={url}
        target={openLinkInNewTab ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className={style.link}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};

export default ExternalLink;
