import styles from "./page.module.css";
import Featured from "@/Components/Featured";
import Blogs from "@/Components/Blogs";
import Header from "@/Components/Header";
import { Blog } from "@/Components/Blogs";

const fetchAllBlogs = async () => {
  try {
    const response = await fetch(`${process.env.base_url}/api/blog`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default async function Home() {
  const blog: Blog[] = await fetchAllBlogs();

  const imageLink = blog[0].image

  return (
    <main className={styles.main}>
      <Header home={true} />
      <Featured imageLink={imageLink} />
      <div className={styles.strip}>
        <p>Recent Blogs</p>
        <div className={styles.buttons}>
          <button>Previous</button>
          <button>Next</button>
        </div>
      </div>
      <Blogs blog={blog} />
    </main>
  );
}
