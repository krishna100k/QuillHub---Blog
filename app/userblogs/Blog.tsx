"use client"
import React from "react";
import styles from "./userblogs.module.css";
import { Blog as BlogInterface } from "@/Components/Blogs";
import { useRouter } from "next/navigation";

interface Props{
    blog: BlogInterface
}

const Blog:React.FC<Props> = ({blog}) => {
    const router = useRouter();
  return (
    <div className={styles.blogContainer}>
      <div className={styles.blogLeft}>
        <p onClick={() => router.push(`/post/${blog?.id}`)} className={styles.title}>{blog?.title}</p>
        <p className={styles.desc}>
          {blog?.description}
        </p>
        <div className={styles.buttons}>
        <button>Edit</button>
        <button>Delete</button>
        </div>
      </div>
      <div className={styles.blogRight}>
        <img src={blog?.image} alt="BlogImage" />
      </div>
    </div>
  );
};

export default Blog;
