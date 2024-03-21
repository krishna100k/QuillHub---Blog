import styles from "./page.module.css";
import Featured from "@/Components/Featured";
import Blogs from "@/Components/Blogs";
import Header from "@/Components/Header";
import { Blog } from "@/Components/Blogs";
import Strip from "@/Components/Strip";




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
  const blogData: Blog[] = await fetchAllBlogs();
  const blog = blogData.slice(0, 6);

  // Finding Featured Index
  let featuredIndex = -1;
    blog.forEach((blog, i) => {
    if(blog.id == 38){
      featuredIndex = i
      return i;
    }
  })
  //



  return (
    <main className={styles.main}>
      <Header home={true} />
      <Featured blogData={blog[featuredIndex]} />
      <Strip />
      <Blogs blog={blog} />
    </main>
  );
}
