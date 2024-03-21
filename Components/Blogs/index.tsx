
import Blog from "./Blogs";
import styles from "./blogs.module.css";

export interface Blog {
  id?: number;
  userid?: number;
  title?: string;
  description?: string;
  image?: string;
  content?: string;
  username?: string;
}

interface BlogsProps {
  blog: Blog[];
}


const Blogs : React.FC<BlogsProps> = async ({blog}) => {
  return (
    <div className={styles.container}>
      {blog.map((blogData: Blog, i: number) => {
        return <Blog key={i} data={blogData} />;
      })}
    </div>
  );
};

export default Blogs;
