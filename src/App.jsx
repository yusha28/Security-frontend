import React, {useEffect, useContext} from 'react'
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Navbar from './components/Layout/Navbar';
import Home from './components/Home/Home'
import Jobs from './components/Job/Jobs'
import JobDetails from './components/Job/JobDetails'
import MyJobs from './components/Job/MyJobs'
import PostJobs from './components/Job/PostJob'
import Application from './components/Application/Application'
import MyApplications from './components/Application/MyApplications'

import {Employers} from './components/Application/Employers'

import NotFound from './components/NotFound/NotFound'
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { Context } from './components/context/UserContextProvider';

const App = () => {

  // const {isAuthorized, setIsAuthorized, setUser} = useContext(Context);
  // useEffect(()=>{
  //   const fetchUser = async()=>{
  //     try {
  //       const response = await axios.get("http://localhost:4000/api/v1/user/getuser", {withCredentials: true});
  //       setUser(response.data.user);
  //       setIsAuthorized(true);
  //     } catch (error) {
  //       setIsAuthorized(false);
  //     }
  //   };
  //   fetchUser();
  // }, [isAuthorized]);
  
  return (
    <>
    <Toaster/>
   <Navbar />
   <Routes>
  <Route element={<Home />} path='/' />
  <Route element={<Login />} path='/login'/>
  <Route element={<Register />} path='/register'/>
  <Route element ={<Jobs/>} path='/job/getall'/>
  <Route  element={<JobDetails/>} path='/job/:id'/>
  <Route element={<Application/>}path='/application/:id'/>
  <Route  element={<MyApplications/>} path='/applications/me'/>
  <Route  element={<Employers/>} path='/employers'/>

  <Route  element={<PostJobs/>} path='/job/post'/>
  <Route  element={<MyJobs/>} path='/job/me'/>
  {/* <Route path='/jobs/getall' element={<Jobs/>} /> */}
   </Routes>
   {/* <Footer/> */}
    </>
    // <Router>
    //   <Navbar/>
    //   <Routes>
    //     <Route path='/' element={<Home/>}></Route>
    //     {/* <Route path='/login' element={<Login/>}></Route>
    //     <Route path='/register' element={<Register/>}></Route>
    //     <Route path='/job/getall' element={<Jobs/>}></Route>
    //     <Route path='/job/:id' element={<JobDetails/>}></Route>
    //     <Route path='/job/post' element={<PostJobs/>}></Route>
    //     <Route path='/job/me' element={<MyJobs/>}></Route>
    //     <Route path='/application/:id' element={<Application/>}></Route>
    //     <Route path='/application/me' element={<MyApplications/>}></Route>
    //     <Route path='*' element={<NotFound/>}></Route> */}
    //   </Routes>

  )
  
}

export default App