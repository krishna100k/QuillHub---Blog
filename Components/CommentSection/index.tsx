"use client";
import React, { FormEvent, useState } from "react";
import styles from "../../app/post/[id]/post.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";

interface userState {
  user: {
    user: string;
  };
}

interface Body{
    blogid: number,
    username: string | unknown,
    comment:string
}

const CommentSection: React.FC<{ blogid: number }> = ({blogid}) => {
  const username = useSelector<userState>((state) => state?.user?.user);
  const [commentData, setCommentData] = useState<string>("");

  const router = useRouter();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const body: Body = {
      blogid,
      username,
      comment: commentData,
    };

    try {
      const response = await axios.post(`/api/authenticated/comments`, body, {withCredentials: true});
      alert(response?.data?.message);
      setCommentData("")
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={styles.comments}>
      <h1 className={styles.commentHeading}>Comments</h1>
      <div className={styles.commentArea}>
        <textarea
        value={commentData}
          onChange={(e) => setCommentData(e.target.value)}
          className={styles.commentInput}
          placeholder="Write a Comment"
        ></textarea>
        <button onClick={submitHandler} className={styles.submit}>Submit</button>
      </div>
    </form>
  );
};

export default CommentSection;
