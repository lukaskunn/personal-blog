import React from "react";

import style from "./Quote.module.scss";

type QuoteProps = {
  text: string;
  author: string;
};

const Quote = ({ text, author }: QuoteProps) => {
  return (
    <div className={style.container}>
      <blockquote className={style["blockquote"]}>
        <p className={style["quote"]}>{`"${text}"`}</p>
        <footer className={style["author"]}>{author}</footer>
      </blockquote>
    </div>
  );
};

export default Quote;
