"use client";
import Header from "@/Components/Header";
import styles from "./add.module.css";
import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), 
    { 
        loading: () => <p>Editor Loading...</p>, 
        ssr: false 
    }
);
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
  // const [user, setUser] =  useState<string | null >();

  // useEffect(() => {
  //   const state = store.getState() as RootState;
  //   setUser(state?.user?.user);
  // }, [user, ])

  const user = useSelector((state : RootState) => state?.user?.user)

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user]);


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

 return (
    <div className={styles.container}>
        <Header submit={handleSubmit} loading={loading} />
      <div className={styles.contentContainer}>
        <label className={styles.customFileUpload}>
          <span>Cover Image</span>
          <input type="file" accept="image/*" onChange={handleFile} />
        </label>
        <img className={styles.coverImg} src={imgAdd} />
        <input
          className={styles.title}
          type="text"
          placeholder="Enter a Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className={styles.title}
          type="text"
          placeholder="Enter a Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
          <ReactQuill
          theme="snow"
          className="quill-editor"
          modules={modules}
          formats={formats}
          value={content}
          onChange={(html) => setContent(html)}
        />
      </div>
    </div>
  );
};

export default Write;
