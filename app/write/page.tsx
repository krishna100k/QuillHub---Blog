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

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files;
    if (!files) return "File Not Found";
    setCover(files[0]);
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setImgAdd(reader.result as string);
      };
    }
  };

  const uploadFile = async () => {
    try {
      if (!cover) {
        return;
        // alert("Please Select Cover Image");
      }
      const imgRef = ref(imageDB, `files/${v4()}`);
      await uploadBytes(imgRef, cover);
      const downloadURL: string | void = await getDownloadURL(imgRef);
      return downloadURL;
    } catch (err) {
      console.log(err);
      return alert("Failed to upload Cover Image");
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const imgUrl: string | void = await uploadFile();
      const userResp = await axios.get(
        `/api/authenticated/user?username=${user}`,
        { withCredentials: true }
      );
      const userid = userResp.data[0].id;
      if (!imgUrl) {
        return alert("Cover Image Not Found!");
      }
      const body = {
        userid,
        title,
        description,
        image: imgUrl,
        content,
        username: user,
      };
      const response = await axios.post(`/api/authenticated/blog`, body, {
        withCredentials: true,
      });
      alert(response?.data?.message);
      setLoading(false);
      setTitle("");
      setDescription("");
      setContent("");
      setImgAdd("");
    } catch (err) {
      console.log(err);
    }
  };

  return <div>Write</div>;
};

export default Write;
