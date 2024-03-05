import Header from "@/Components/Header";
import styles from "./post.module.css";
import React from "react";
import Featured from "@/Components/Featured";
import Comments from "@/Components/Comments";
import { Blog } from "@/Components/Blogs";

const getPost = async (id: number) => {
  try{
    const res = await fetch(`${process.env.base_url}/api/oneblog?id=${id}`)
    const data = await res.json();
    return data;
  }catch(err){
    console.log(err);
  }
}

const Post = async ({params}: {params: {id: number}}) => {
  const {id} = params;
  const blog: Blog = await getPost(id);
  return (
    <>
      <Header />
      <Featured imageLink = {blog?.image} />
      <div className={styles.container}>
        <div className={styles.content}>
        <h1 className={styles.heading}>{blog.title}</h1>
        <div className={styles.contentRender}>
          <div  dangerouslySetInnerHTML={{ __html: blog?.content as string  }} />
        </div>
        </div>
        <div className={styles.comments}>
          <h1 className={styles.commentHeading}>Comments</h1>
          <div className={styles.commentArea}>
          <textarea className={styles.commentInput} placeholder="Write a Comment"></textarea>
          <button className={styles.submit}>Submit</button>
          </div>
        </div>
        <Comments />
        <Comments />
        <Comments />
      </div>
    </>
  );
};

export default Post;
