import axios from "axios";

export const GET_DIRECTORIES = "GET_DIRECTORIES";

export const getDirectories = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}directory/`)
            .then((res) => {
                dispatch({ type: GET_DIRECTORIES, payload: res.data});
            })
            .catch((err) => console.log(err))
    }
}

export const createDirectory = (dossier) => {
    return (dispatch) => {
       return axios
           .post(`${process.env.REACT_APP_API_URL}directory/`, dossier)
           .then((res) => {
               console.log(res);
           })
           .catch((err) => {
               console.log(err);
           })
   }
}