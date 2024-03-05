"use client";
import { Avatar } from "@mui/material";
import styles from "./header.module.css";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/app/InitialInvoke/InitialInvoke";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Header = ({ home, submit }: { home?: boolean | undefined | null; submit?: any }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const user = useSelector(
    (state: { user: { user: string } }) => state.user.user
  );

  const logout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
      });
      const data = await response.json();
      fetchUser(dispatch);
      alert(data);
      router.push("/")
      
    } catch (err) {
      console.log(err);
    }
  };

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
            {pathname === "/add" ? (
              <button onClick={submit} className={styles.publishButton}>Publish</button>
            ) : (
              <Link
                style={{ textDecoration: "none", color: "floralwhite" }}
                href={"/add"}
              >
                Add a Post
              </Link>
            )}
          </button>
          <div className={styles.avatar}>
            <Avatar
              sx={{ width: 50, height: 50, cursor: "pointer", zIndex: 1 }}
              alt={"Krishna"}
              src="/static/images/avatar/1.jpg"
            />
            <LogoutIcon onClick={logout} className={styles.logoutIcon} />
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
