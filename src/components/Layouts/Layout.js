import { Divider, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserProfile } from "../../api/api_auth";
import LeftSidebar from "../Sidebar/LeftSidebar/LeftSidebar";
import RightSidebar from "../Sidebar/RightSidebar/RightSidebar";
import { useNavigate } from 'react-router-dom';
import Styles from '../../styles/Main.module.css'

function Layout({ children }) {

  const [wait, setWait] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    getUserProfile((isOk, data) => {
      if (!isOk) {
        toast.error(data);
        localStorage.clear();
        navigate('/login');
      }
      localStorage.setItem('x-auth-token', data['x-auth-token']);
      localStorage.setItem('name', data.name);
      localStorage.setItem('image', data.image);
      localStorage.setItem('username', data.username);
      setWait(false)
    })
  }, []);

  if (wait) {
    return (
      <div className={Styles.waiting}>
        <CircularProgress 
        value={100}
        size={50}
        thickness={3}/>
        <p>
          لطفا شکیبا باشید.
        </p>
      </div>
    );
  }else {
    return (
      <div className={Styles.rootlayout}>
        <RightSidebar />
        <Divider orientation={'vertical'} className={Styles.divider} />
        <div className={Styles.content}>
          {children}
        </div>
        <Divider orientation={'vertical'} className={Styles.divider} />
        <LeftSidebar />
      </div>
    );
  }


}

export default Layout;
