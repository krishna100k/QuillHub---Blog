import styles from "./blog.module.css";
const blog = () => {
  return (
    <div className={styles.container}>
      <div className={styles.film}></div>
      <img className={styles.image} src="/featured.png" alt="Image" />
      <div className={styles.textContent}>
        <p className={styles.title}>Exploring the universe's wonders</p>
        <p className={styles.para}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
          tenetur consectetur natus vel enim ex, labore explicabo similique
          ipsam! Fuga eaque nostrum molestias!
        </p>
        <p className={styles.userName}>by krshna10k</p>
      </div>
      <button>Read More</button>
    </div>
  );
};

export default blog;
