import Header from "@/Components/Header";
import styles from "./post.module.css";
import React from "react";
import Comments from "@/Components/Comments";
import { Blog } from "@/Components/Blogs";
import CommentSection from "@/Components/CommentSection";


export interface Comment extends Blog {
  username?: string;
  comment?: string;
  blogid?: string;
}

const getPost = async (id: number) => {
  try {
    const res = await fetch(`${process.env.base_url}/api/oneblog?id=${id}`, {cache: "no-store"});
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

 const getComments = async (id: number) => {
  try {
    const res = await fetch(
      `${process.env.base_url}/api/comments?blogid=${id}`,
      { method: "GET", cache: "no-store" }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const Post = async ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const blog: Blog = await getPost(id);
  const comment: Comment[] = await getComments(id);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contentRender}>
            <div className={styles.contentTop}>
          <h1 className={styles.heading}>{blog.title}</h1>
          <p>{blog?.description}</p>
          <img src={blog?.image} alt="Cover Image" className={styles.img}/>
          </div>
            <div className={styles.htmlRender}
              dangerouslySetInnerHTML={{ __html: blog?.content as string }}
            />
          </div>
        </div>
        <CommentSection blogid = {id} />
        {
          comment.map((comment: Comment, i: number) => {
            return <Comments key={i} comment = {comment} />
          })
        }
      </div>
    </>
  );
};

export default Post;
