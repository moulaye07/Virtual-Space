import axios from "axios";

export const GET_FILES= "GET_FILES";

export const getFiles = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}file/`)
            .then((res) => {
                dispatch({ type: GET_FILES, payload: res.data});
            })
            .catch((err) => console.log(err))
    }
}

export const createFile = (fichier) => {
    return (dispatch) => {
       return axios
           .post(`${process.env.REACT_APP_API_URL}file/`, fichier)
           .then((res) => {
               console.log(res);
           })
           .catch((err) => {
               console.log(err);
           })
   }
}