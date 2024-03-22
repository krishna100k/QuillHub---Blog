"use client"

import styles from "../../app/page.module.css";
import { useRouter } from "next/navigation";

const Strip = () => {
    const router = useRouter();

  return (
    <div className={styles.strip}>
    <p>Recent Blogs</p>
    <div className={styles.buttons}>
      <button onClick={() => router.push("/all")}>All Blogs</button>
    </div>
  </div>
  )
}

export default Strip