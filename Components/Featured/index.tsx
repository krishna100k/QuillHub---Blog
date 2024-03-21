import { Blog } from "../Blogs";
import styles from "./featured.module.css";

import React from "react";

interface FeaturedProps {
  blogData?: Blog;
}

const Featured : React.FC<FeaturedProps> = ({blogData}) => {
  return (
    <div style={{backgroundImage: `url(${blogData?.image})`}} className={styles.container}>
      <div className={styles.content}>
      <h2>{blogData?.title}</h2>
      <p>{blogData?.description}</p>
      </div>
    </div>
    );
};

export default Featured;
