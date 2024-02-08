import styles from "./comments.module.css";

import React from "react";

const Comments = () => {
  return (
    <div className={styles.container}>
      <p className={styles.userName}>@krishna10k</p>
      <p className={styles.comment}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
        debitis repudiandae pariatur ducimus omnis, reiciendis cum adipisci sit
        alias asperiores reprehenderit repellat et praesentium explicabo porro
        rem recusandae inventore doloremque dicta rerum ratione dignissimos
        possimus facere a. Numquam corporis perferendis, explicabo a
        perspiciatis atque amet vitae nam delectus nulla iure?
      </p>
    </div>
  );
};

export default Comments;
