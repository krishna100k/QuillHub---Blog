import styles from "./page.module.css";
import Featured from "@/Components/Featured";
import Blogs from "@/Components/Blogs";
import Header from "@/Components/Header";
import { Blog } from "@/Components/Blogs";
import { redirect } from "next/navigation";
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
  const blog: Blog[] = await fetchAllBlogs();

  // Finding Featured Index
  let featuredIndex = -1;
    blog.forEach((blog, i) => {
    if(blog.id == 14){
      featuredIndex = i
      return i;
    }
  })
  //

  const imageLink = blog[featuredIndex].image


  return (
    <main className={styles.main}>
      <Header home={true} />
      <Featured imageLink={imageLink} />
      <Strip />
      <Blogs blog={blog} />
    </main>
  );
}
