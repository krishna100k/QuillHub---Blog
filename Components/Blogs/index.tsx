import Blog from "./blog"
import styles from "./blogs.module.css"
const Blogs = () => {
  return (
    <div className={styles.container}>
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        </div>
  )
}

export default Blogs