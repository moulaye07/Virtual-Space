import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";


export const getUser = (uid) => {
    return (dispatch) => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}user/${uid}`)
        .then((res) => {
          dispatch({ type: GET_USER, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };


