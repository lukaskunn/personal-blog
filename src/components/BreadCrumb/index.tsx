import React from "react";
import Link from "next/link";
import styles from "./Breadcrumb.module.scss";

type BreadCrumbProps = {
  pageTitle?: string;
  showPageTitle?: boolean;
};

const BreadCrumb = ({
  pageTitle = "",
  showPageTitle = false,
}: BreadCrumbProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.breadcrumb}>
        <Link
          className={`${styles["breadcrumb-link"]} ${styles["light-weight"]}`}
          href="https://lucasoliveira.io"
        >
          @http.lucaso
        </Link>
        {" / "}
        <Link
          className={`${styles["breadcrumb-link"]} ${
            showPageTitle ? styles["light-weight"] : ""
          }`}
          href="/"
        >
          home
        </Link>
        {showPageTitle && " / "}
        {showPageTitle && (
          <span className={styles["breadcrumb-page-title"]}>{pageTitle}</span>
        )}
      </div>
    </div>
  );
};

export default BreadCrumb;
