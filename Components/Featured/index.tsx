"use client"
import { Blog } from "../Blogs";
import styles from "./featured.module.css";
import { useRouter } from "next/navigation";

import React from "react";

interface FeaturedProps {
  blogData?: Blog;
}

const Featured : React.FC<FeaturedProps> = ({blogData}) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/post/${blogData?.id}`)} style={{backgroundImage: `url(${blogData?.image})`}} className={styles.container}>
      <div className={styles.content}>
      <h2>{blogData?.title}</h2>
      <p>{blogData?.description}</p>
      </div>
    </div>
    );
};

export default Featured;
