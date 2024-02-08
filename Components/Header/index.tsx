import { Avatar } from "@mui/material";
import styles from "./header.module.css";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = ({ home }: { home?: boolean | undefined | null }) => {
  const user = null;

  return (
    <div
      style={home ? { position: "absolute" } : { position: "relative" }}
      className={styles.container}
    >
      <h2 className={styles.logo}>
        <Link style={{ textDecoration: "none" }} href={"/"}>
          QuillHub
        </Link>
      </h2>
      {user ? (
        <div className={styles.buttonContainer}>
          <button className={styles.transparentButton1}>
            <Link
              style={{ textDecoration: "none", color: "floralwhite" }}
              href={"/add"}
            >
              Add a Post
            </Link>
          </button>
          <div className={styles.avatar}>
            <Avatar
              sx={{ width: 50, height: 50, cursor: "pointer", zIndex: 1 }}
              alt={"Krishna"}
              src="/static/images/avatar/1.jpg"
            />
            <LogoutIcon className={styles.logoutIcon} />
          </div>
        </div>
      ) : (
        <div className={styles.buttonContainer}>
          <button className={styles.transparentButton}>
            <Link
              style={{ textDecoration: "none", color: "floralwhite" }}
              href={"/login"}
            >
              Login
            </Link>
          </button>
          <Link style={{ textDecoration: "none" }} href={"/register"}>
            <button className={styles.button}>Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
