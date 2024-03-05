"use client";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { loaded, loading, setUser } from "../redux/userSlice";
import { useEffect } from "react";
import axios from "axios";

//Fetch User on Mount!
export const fetchUser = async (dispatch: Dispatch<any>) => {
  try {
    const response = await axios.get(`/api/me`, {
      withCredentials: true,
    });
    const userName: string = response.data;
    dispatch(loading())
    dispatch(setUser(userName))
    dispatch(loaded())
  } catch (err) {
    console.log(err);
    dispatch(loading())
    dispatch(setUser(null))
    dispatch(loaded())
  }
};



const InitialInvoke = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser(dispatch);
  }, []);
  return <></>;
};

export default InitialInvoke;
