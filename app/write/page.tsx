"use client";
import Header from "@/Components/Header";
import styles from "./add.module.css";
import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDB } from "../config";
import { v4 } from "uuid";
import axios from "axios";
import { useRouter } from "next/navigation";

interface RootState {
  user: {
    user: string;
  };
}

const Write = () => {
  const router = useRouter();

  const store = useStore();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  // const user = useSelector(
  //   (state: { user: { user: string } }) => state.user.user
  // );
  const state = store.getState() as RootState;
  const user = mounted && state?.user?.user;

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);

  const [title, setTitle] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState<File | undefined>();
  const [imgAdd, setImgAdd] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);

  return <div>Write</div>;
};

export default Write;
