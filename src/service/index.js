import axios from "axios";
export function loadUser(params) {
  return axios.get("/per/user", { params });
}

export default { loadUser };
