import axios from "axios";
export function loadUser(params) {
  return axios.get("/per/user", { params });
}

export function deleteUser(idArr) {
  return Promise.all(idArr.map(id => axios.delete(`/per/user/${id}`)));
}

export default {
  loadUser,
  deleteUser,
  addUser(user) {
    user = Object.assign(
      {
        // id: Date.now(),
        del: 0,
        avatar: "",
        isTeacher: true
      },
      user
    );
    return axios.post("/per/user", user);
  },
  loadAllRole() {
    return axios.get("/per/role");
  },
  loadUserRole(userId) {
    return axios.get(`/per/user_role?userId=${userId}`);
  }
};
