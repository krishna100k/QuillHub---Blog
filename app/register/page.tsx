"use client";

import Header from "@/Components/Header";
import styles from "./register.module.css";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'

const Register = () => {

  const router = useRouter();

  const [fullname, setFullname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const body = {
    name: fullname,
    username,
    email,
    password,
  };

  const submit = async () => {
    if(fullname === ""){
      return alert("name is Required!")
    }else if (username === ""){
      return alert("username is Required!")
    }else if (password === ""){
      return alert("password is Required!")
    }else if (email === ""){
      return alert("email is required!")
    }
    try {
      const response = await axios.post(
        `/api/register`,
        body
      );
      alert("Registration Successful!")
      console.log(response);
      router.push("/")
    } catch (err) {
      console.log(err);
      alert("Username or Email already exists!")
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.registerBox}>
        <h2 className={styles.heading}>Register</h2>
        <div className={styles.dataBox}>
          <p>Fullname</p>
          <input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.dataBox}>
          <p>Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
        </div>
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
            Already have an account{" "}
            <Link style={{ background: "transparent" }} href={"/login"}>
              Login
            </Link>
          </p>
          <button onClick={submit} className={styles.submit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
