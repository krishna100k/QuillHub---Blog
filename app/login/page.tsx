"use client";

import Header from "@/Components/Header";
import styles from "./login.module.css";
import Link from "next/link";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { fetchUser } from "../InitialInvoke/InitialInvoke";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const body = {
    username,
    password,
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
       await axios.post("/api/login", body);
      fetchUser(dispatch);
      alert("Logged in successfully!");
      setLoading(false);
      router.push("/");
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      alert(err?.response?.data);
    }
  };
  return (
    <div>
      <Header />
      <form className={styles.registerBox}>
        <h2 className={styles.heading}>Login</h2>
        <div className={styles.dataBox}>
          <p>Username</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.dataBox}>
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <div className={styles.strip}>
          <p>
            Don't have an account ?{" "}
            <Link style={{ background: "transparent" }} href={"/register"}>
              Register
            </Link>
          </p>
          {
            loading && <CircularProgress
            color="secondary"
            style={{ width: "20px", height: "20px" }}
          /> 
          }
          <button disabled={loading} onClick={submit} className={styles.submit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
