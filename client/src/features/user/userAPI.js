import api from "../../helpers/api";

export async function login({ email, password }) {
    try {
        const res = await api.post("/users/login", { email, password });
        return res.data;
      } catch (err) {
        throw new Error(err);
      }
  }

  export async function signup({name, email, password }) {
    try {
        const response = await api.post("/users/signup", { name, email, password });
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
        }
        console.log("gfhfhfgh")
        return response.data;
      } catch (err) {
        console.log("response")
        Promise.reject(err)
        //throw new Error(err);
      }
  }