import styles from "./footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
      <h2 className={styles.logo}>QuillHub</h2>
      <p className={styles.para}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
        incidunt unde sint sunt quos repellat eligendi dolorum labore a quis,
        deleniti aliquam molestiae, expedita veniam hic commodi earum nam. Magni
        minus eaque earum veniam facilis eveniet animi obcaecati magnam
        voluptatum, laudantium debitis vitae doloribus nesciunt itaque laborum
        ad a voluptatem?
      </p>
      </div>
      <div className={styles.right}>
        <div>
        <h5 >Useful Links</h5>
        <ul>
          <Link href={"/"} style={{ textDecoration: 'none' }}><li>Home</li></Link>
          <li>Add a post</li>
          <li>Register</li>
          <li>Signup</li>
        </ul>
        </div>
        <div>
        <h5 >Socials</h5>
        <ul>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Twitter</li>
          <li>Linkedin</li>
        </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
