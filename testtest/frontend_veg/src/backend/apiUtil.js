import axios from "axios";
const baseUrl = `http://localhost:8000/subscribers`;

export default axios.create({
    baseURL: 'http://localhost:8000/subscribers',
    headers: { 'Content-Type': 'application/json' },
  })

// export const login = (email, userPassword) => {
//     return userRequest.post("/",
//     JSON.stringify({
//         email,
//         userPassword,})
//         ).then((res) => res.data).catch((err)=>err.toString());
//   };