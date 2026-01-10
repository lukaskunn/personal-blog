import React from "react";
import styles from "@/styles/css/components/portableText.module.css";

interface DividerBlockValue {
  _type: "dividerBlock";
  style: "solid" | "dashed" | "dotted" | "stars" | "spacing";
}

export function DividerBlock({ value }: { value: DividerBlockValue }) {
  const styleMap: Record<DividerBlockValue["style"], string> = {
    solid: styles.dividerSolid,
    dashed: styles.dividerDashed,
    dotted: styles.dividerDotted,
    stars: styles.dividerStars,
    spacing: styles.dividerSpacing,
  };

  if (value.style === "stars") {
    return (
      <div className={`${styles.divider} ${styleMap[value.style]}`}>
        <span>* * *</span>
      </div>
    );
  }

  return <hr className={`${styles.divider} ${styleMap[value.style || "solid"]}`} />;
}
