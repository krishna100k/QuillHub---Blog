"use client";
import styles from "./userblogs.module.css";
import Blog from "./Blog";
import { Blog as BlogInterface } from "@/Components/Blogs";
import { useSelector } from "react-redux";

interface Props {
  blog: BlogInterface[];
  username: string;
}

const Blogs: React.FC<Props> = ({ blog, username }) => {
  const user = useSelector((state: {user: {user: string}}) => state.user.user);
  return (
    <div className={styles.blogsContainer}>
      <h1>Your Blogs</h1>
      {user === username && blog.map((individualBlog) => {
        return (
          <div key={individualBlog?.id} className={styles.blogs}>
            <Blog key={individualBlog?.id} blog={individualBlog} />
          </div>
        );
      } )}
    </div>
  );
};

export default Blogs;
