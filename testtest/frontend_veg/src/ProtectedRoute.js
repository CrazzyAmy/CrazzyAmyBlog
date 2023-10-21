import { useAuth } from "./Context.js";
import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from "react";

export const ProtectedRoute = ({children}) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{

    // 無 token 導回登入頁
    if (!token){
      navigate('/login');
    }
  },[]);

  return <Outlet />
};