import React from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { GoAlertFill } from "react-icons/go";
import { FaCircleInfo, FaCheck, FaLightbulb } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import styles from "@/styles/css/components/portableText.module.css";

interface CalloutBlockValue {
  _type: "calloutBlock";
  tone: "tip" | "warning" | "info" | "error" | "success";
  title: string;
  content: any[];
}

interface CalloutBlockProps {
  value: CalloutBlockValue;
  components: PortableTextComponents;
}

export function CalloutBlock({ value, components }: CalloutBlockProps) {
  const toneIcons: Record<CalloutBlockValue["tone"], React.JSX.Element> = {
    tip: <FaLightbulb />,
    warning: <GoAlertFill />,
    info: <FaCircleInfo />,
    error: <FaTimes />,
    success: <FaCheck />,
  };

  const iconColors: Record<CalloutBlockValue["tone"], string> = {
    tip: "#27ae60",
    warning: "#f39c12",
    info: "#3498db",
    error: "#e74c3c",
    success: "#27ae60",
  };

  return (
    <div className={`${styles.callout} ${styles[`callout${value.tone.charAt(0).toUpperCase() + value.tone.slice(1)}`]}`}>
      <div className={styles.calloutHeader}>
        <span className={styles.calloutIcon} style={{ color: iconColors[value.tone] }}>{toneIcons[value.tone]}</span>
        <span className={styles.calloutTitle}>{value.title}</span>
      </div>
      <div className={styles.calloutContent}>
        <PortableText value={value.content} components={components} />
      </div>
    </div>
  );
}
