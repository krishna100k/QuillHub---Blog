import Header from "@/Components/Header"
import styles from "./all.module.css"
import Blogs from "@/Components/Blogs"
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

const All = async () => {
  const blog: Blog[] = await fetchAllBlogs();
  return (
    <div>
      <Header />
      <Blogs blog={blog} />
    </div>
  )
}

export default All