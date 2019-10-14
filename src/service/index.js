import axios from "axios";
export function loadUser(params) {
  return axios.get("/per/user", { params });
}

export function deleteUser(idArr) {
  return Promise.all(idArr.map(id => axios.delete(`/per/user/${id}`)));
}

export default {
  loadUser,
  deleteUser
};
