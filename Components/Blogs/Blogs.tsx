"use client"

import styles from "./blog.module.css";
import { Blog } from ".";
import { useRouter } from "next/navigation";

const Blogs = ({data}: {data: Blog}) => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <div className={styles.film}></div>
      <img className={styles.image} src={data?.image} alt="Image" />
      <div className={styles.textContent}>
        <p className={styles.title}>{data?.title}</p>
        <p className={styles.para}>
          {data?.description}
        </p>
        <p className={styles.userName}>by {data?.username}</p>
      </div>
      <button onClick={() => router.push(`/post/${data?.id}`)}>Read More</button>
    </div>
  );
};

export default Blogs;
