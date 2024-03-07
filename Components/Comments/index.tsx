import styles from "./comments.module.css";
import React from "react";
import { Comment } from "@/app/post/[id]/page";

const Comments: React.FC<{comment: Comment}> = ({comment}) => {
  return (
    <div className={styles.container}>
      <p className={styles.userName}>{comment?.username}</p>
      <p className={styles.comment}>
        {comment?.comment}
      </p>
    </div>
  );
};

export default Comments;
