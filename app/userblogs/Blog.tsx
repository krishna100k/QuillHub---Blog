"use client"
import React from "react";
import styles from "./userblogs.module.css";
import { Blog as BlogInterface } from "@/Components/Blogs";
import { useRouter } from "next/navigation";
import axios from "axios"
import { getStorage, ref, deleteObject } from 'firebase/storage';
import firebase from 'firebase/compat/app'; 
import { imageDB } from "../config";


interface Props{
    blog: BlogInterface
}

const Blog:React.FC<Props> = ({blog}) => {
    const router = useRouter();

    const deleteFile = async () => {
      // const storage = getStorage(firebase.app()); 
      const fileRef = ref(imageDB, blog?.image); 
  
      try {
        await deleteObject(fileRef);
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    };

    const deletePost = async () => {
      try{
        const response = await axios.delete(`/api/authenticated/blog?id=${blog?.id}`, {withCredentials: true})
        deleteFile();
        console.log(response);
        router.refresh();
      }catch(err){
        console.log(err)
      }
    }

  return (
    <div className={styles.blogContainer}>
      <div className={styles.blogLeft}>
        <p onClick={() => router.push(`/post/${blog?.id}`)} className={styles.title}>{blog?.title}</p>
        <p className={styles.desc}>
          {blog?.description}
        </p>
        <div className={styles.buttons}>
        <button onClick={() => router.push(`/edit/${blog?.id}`)}>Edit</button>
        <button onClick={deletePost}>Delete</button>
        </div>
      </div>
      <div className={styles.blogRight}>
        <img src={blog?.image} alt="BlogImage" />
      </div>
    </div>
  );
};

export default Blog;
