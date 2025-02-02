import React, { useContext } from 'react'

import { Link } from 'react-router-dom'
import { FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'
import { Context } from '../context/UserContextProvider';

const Footer = () => {
  const { isAuthorized} = useContext(Context);
  return (
    <Footer className = {isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Yusha.</div>
    </Footer>
  );
};

export default Footer;