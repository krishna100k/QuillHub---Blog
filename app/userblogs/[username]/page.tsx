import Header from "@/Components/Header";
import styles from "../userblogs.module.css";
import Blogs from "../Blogs";
import { cookies } from "next/headers";
import { Blog } from "@/Components/Blogs";

interface Props {
  params: { username: string; token: string };
}

const fetchUserBlogs = async (username: string, token: string) => {
  const headers = {
    Cookie: `JWT=${token}`,
  };
  try {
    const res = await fetch(
      `${process.env.base_url}/api/authenticated/blog?username=${username}`,
      { method: "GET", cache: "no-store", headers }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const UserBlogs: React.FC<Props> = async ({ params }) => {
  const cookieStore = cookies();
  const JWT = cookieStore.get("JWT");
  const token = JWT?.value as string;

  const { username } = params;
  const data : Blog[] = await fetchUserBlogs(username, token);
  return (
    <div className={styles.container}>
      <Header />
      <Blogs blog = {data} username = {username}/>
    </div>
  );
};

export default UserBlogs;
