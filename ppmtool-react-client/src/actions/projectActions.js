import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT } from "./types";

// Burası api isteklerinin yapıldığı yer

export const createProject = (project, history) => async dispatch => {
  try {
    await axios.post("http://localhost:8080/api/project", project);
    history.push("/dashboard");
    // Alt bölüm eski bir hatanın çözümü için var bu sürümde o hata yok
    // sadece not olarak koydum
    // Hata: Yeni state gelirken eski state kaldığı için hata yokkende hata
    // var diye diyor. kısade hatalar güncellenmiyor.
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: {}
    // });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
// error nesneleri buraya gelecek

export const getProjects = () => async dispatch => {
  const res = await axios.get("http://localhost:8080/api/project/all");
  dispatch({
    type: GET_PROJECTS,
    payload: res.data
  });
};

//historyden push ile istediğimiz adrese gidebiliyoruz
export const getProject = (id, history) => async dispatch => {
  axios
    .get(`http://localhost:8080/api/project/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROJECT,
        payload: res.data
      });
    })
    .catch(err => {
      // eğer istenilen adres yoksa yönlendirme yapıyor.
      history.push("/dashboard");
    });
};
