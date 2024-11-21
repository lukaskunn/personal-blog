import React from "react";
import { promises as fs } from 'fs';

import BreadCrumb from "@/components/BreadCrumb";
import ComponentRender from "@/components/ComponentRender";
import styles from "./Article.module.scss"

type Props = {
  params: Promise<{ id: string }>;
};

const Article = async ({ params }: Props) => {
  const id = (await params).id;
  const file = await fs.readFile(`public/content/${id.split("-")[0]}/${id}.json`, 'utf8');
  const data = JSON.parse(`${file}`);

  const { title, content } = data;

  return <div className={styles.container}>
    <BreadCrumb pageTitle={title} showPageTitle={true} />
    <h2 className={styles["article-title"]}>{title}</h2>
    <ComponentRender componentList={content} />
  </div>;
};

export default Article;
