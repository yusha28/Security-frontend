// import React, { useContext, useState } from "react";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { RiLock2Fill } from "react-icons/ri";
// import { Link, Navigate } from "react-router-dom";
// import { FaRegUser } from "react-icons/fa";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Context } from "../context/UserContextProvider";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");

//   const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:4000/api/v1/user/login",
//         { email, password, role },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       toast.success(data.message);
//       setUser({
//         id: data.user.id, // Replace with actual data properties
//         name: data.user.name, // Replace with actual data properties
//         email: data.user.email, // Replace with actual data properties
//         role: data.user.role, // Replace with actual data properties
//       })
//       setIsAuthorized(true);
//       localStorage.setItem('role',data.user.role)

//     } catch (error) {
//       setEmail("");
//       setPassword("");
//       setRole("");
//       toast.error(error.response.data.message);
//     }
//   };

//   if(isAuthorized){
//     return <Navigate to={'/'}/>
//   }

//   return (
//     <>
//       <section className="authPage">
//         <div className="container">
//           <div className="header">
//             <img src="/WorkWise Freelancer.png" alt="logo" />
//             <h3>Login to your account</h3>
//           </div>
//           <form>
//             <div className="inputTag">
//               <label>Login As</label>
//               <div>
//                 <select value={role} onChange={(e) => setRole(e.target.value)}>
//                   <option value="">Select Role</option>
//                   <option value="Employer">Employer</option>
//                   <option value="Admin">Admin</option>

//                   <option value="Job Seeker">Job Seeker</option>
//                 </select>
//                 <FaRegUser />
//               </div>
//             </div>
//             <div className="inputTag">
//               <label>Email Address</label>
//               <div>
//                 <input
//                   type="email"
//                   placeholder="eg@gmail.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <MdOutlineMailOutline />
//               </div>
//             </div>
//             <div className="inputTag">
//               <label>Password</label>
//               <div>
//                 <input
//                   type="password"
//                   placeholder="Your Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <RiLock2Fill />
//               </div>
//             </div>
//             <button type="submit" onClick={handleLogin}>
//               Login
//             </button>
//             <Link to={"/register"}>Register Now</Link>
//           </form>
//         </div>
//         <div className="banner">
//           <img src="/login.png" alt="login" />
//         </div>
//       </section>
//     </>
//   );
// };

// export default Login;