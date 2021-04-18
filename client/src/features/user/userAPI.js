import api from "../../helpers/api";

export async function login({ email, password }) {
    try {
        const res = await api.post("/users/login", { email, password });
        return res.data;
      } catch (err) {
        throw new Error(err);
      }
  }