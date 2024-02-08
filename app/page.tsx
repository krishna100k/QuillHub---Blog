import styles from "./page.module.css";
import Featured from "@/Components/Featured";
import Blogs from "@/Components/Blogs";
import Header from "@/Components/Header";


export default function Home() {

  return (
    <main className={styles.main}>
      <Header home={true} />
      <Featured />
      <div className={styles.strip}>
        <p>Recent Blogs</p>
        <div className={styles.buttons}>
        <button>Previous</button>
        <button>Next</button>
        </div>
      </div>
      <Blogs />

    </main>
  );
}
