"use client";

import Header from "@/Components/Header";
import styles from "./edit.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useSelector, UseSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Blog } from "@/Components/Blogs";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { imageDB } from "@/app/config";
import { v4 } from "uuid";

const Edit = () => {
  const router = useRouter();
  const { id } = useParams();

  const user: string | null = useSelector(
    (state: { user: { user: string } }) => state?.user?.user
  );


  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);

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

  const [blogData, setBlogData] = useState<Blog | undefined>(undefined)
  const [title, setTitle] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [content, setContent] = useState<any>("");
  const [cover, setCover] = useState<File | undefined>();
  const [imgAdd, setImgAdd] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imgupload, setImgUpload] = useState<string | undefined>();


  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(`/api/authenticated/oneBlog?id=${id}`);
        const data: Blog = response.data;
        setBlogData(data)
        setTitle(data?.title);
        setDescription(data?.description);
        setContent(data?.content);
        setImgAdd(data?.image);
        setImgUpload(data?.image);
      } catch (err) {
        console.log(err);
      }
    };
    getBlog();
  }, []);

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
        return null;
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

  const deleteFile = async () => {
    const fileRef = ref(imageDB, blogData?.image);

    try {
      await deleteObject(fileRef);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const downloadURL = await uploadFile();
        downloadURL && await deleteFile();
        const body = {
          userid: blogData?.userid,
          title,
          description,
          image: downloadURL ? downloadURL : imgAdd,
          content
        };
        const response = await axios.put(`/api/authenticated/blog?id=${id}`, body, { withCredentials: true });
        console.log(response);
        setLoading(false);
        router.push(`/`);
        alert("Blog Edited Successfully!");

    } catch (err) {
      setLoading(false);
      console.log(err);
      alert("An error occurred while editing the blog.");
    }
  };

  return (
    <div className={styles.container}>
      <Header submit={handleSubmit} loading = {loading} blogId={id as string} />
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

export default Edit;
