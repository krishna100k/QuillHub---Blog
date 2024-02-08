"use client"

import Header from "@/Components/Header";
import styles from "./login.module.css";
import Link from "next/link";
import { useState } from "react";
import axios from "axios"

const Register = () => {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const body = {
    username,
    password,
  };

  const submit = async () => {
    try{
      const response = await axios.post("/api/login", body);
      alert("Logged in successfully!")
      console.log(response);

    }catch(err : any){
      console.log(err);
      alert(err?.response?.data)
    }
  }
  return (
    <div>
      <Header />
      <div className={styles.registerBox}>
        <h2 className={styles.heading}>Login</h2>
        <div className={styles.dataBox}>
          <p>Username</p>
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
        </div>
        <div className={styles.dataBox}>
          <p>Password</p>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        </div>
        <div className={styles.strip}>
          <p>
            Don't have an account ?{" "}
            <Link style={{ background: "transparent" }} href={"/register"}>
              Register
            </Link>
          </p>
          <button onClick={submit} className={styles.submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
