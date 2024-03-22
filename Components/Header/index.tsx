"use client";
import { Avatar } from "@mui/material";
import styles from "./header.module.css";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
// import { fetchUser } from "@/app/InitialInvoke/InitialInvoke";
import { loaded, loading, setUser } from "../../app/redux/userSlice";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { useStore } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  home?: boolean | undefined | null;
  submit?: any;
  loading?: boolean;
  blogId?: string;
};

interface RootState {
  user: {
    user: string;
  };
}

const fetchUser: any = async (dispatch: Dispatch<any>) => {
  try {
    const response = await axios.get(`/api/me`, {
      withCredentials: true,
    });
    const userName: string = response.data;
    dispatch(loading());
    dispatch(setUser(userName));
    dispatch(loaded());
    return userName
  } catch (err) {
    console.log(err);
    dispatch(loading());
    dispatch(setUser(null));
    dispatch(loaded());
  }
};

const Header = ({ home, submit, loading, blogId }: Props) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();



  // const store = useStore();

  // const [mounted, setMounted] = useState<boolean>(false);

  // // const state = store.getState() as RootState;
  // // let user = mounted ? state?.user?.user : null;
  // const user = useSelector((state : {user: {user: string}}) => state?.user?.user)
  // console.log(user)

  const [user, setUser] = useState<string | null>()

  useEffect(() => {
    const settingUser = async () => {
      const data = await fetchUser(dispatch);
      setUser(data)
    }

    settingUser();
  }, [user]);

  // useEffect(() => {
  //   setMounted(true);
  // }, [mounted]);

  



  const logout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
      });
      const data = await response.json();
      fetchUser(dispatch);
      setUser(null);
      alert(data);
      router.push("/");
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
          <div className={styles.transparentButton1}>
            {pathname === "/write" || pathname === `/edit/${blogId}` ? (
              <>
                {loading && (
                  <CircularProgress style={{ width: "20px", height: "20px" }} />
                )}
                <button
                  disabled={loading}
                  onClick={submit}
                  className={styles.publishButton}
                >
                  Publish
                </button>
              </>
            ) : (
              <>
                <Link
                  className={styles.linkButton}
                  style={{ textDecoration: "none", color: "floralwhite" }}
                  href={`/userblogs/${user}`}
                >
                  Your Blogs
                </Link>
                <Link
                  className={styles.linkButton}
                  style={{ textDecoration: "none", color: "floralwhite" }}
                  href={"/write"}
                >
                  Write
                </Link>
              </>
            )}
          </div>
          <div className={styles.avatar}>
            <Avatar
              sx={{ width: 50, height: 50, cursor: "pointer", zIndex: 1 }}
              alt={user as string}
              src="/static/images/avatar/1.jpg"
            />
            <LogoutIcon
              sx={{ width: "100%", height: "35%" }}
              onClick={logout}
              className={styles.logoutIcon}
            />
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
