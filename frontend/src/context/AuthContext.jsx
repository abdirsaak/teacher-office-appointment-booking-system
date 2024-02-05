import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (user_type,email, password) => {
    try {
      // Validate form data
      if (!email || !password || !user_type) {
        toast.error("Fadlan geli meelaha banaan.");
        return;
      }

      setLoading(true);

      const requestData = {
        user_type: user_type,
        email: email,
        password: password,
      };

      const response = await axios.post(
        "http://localhost:5555/login",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log("data", data);

      
      
      if (data.status === "success") {
        // console.log("value of data abdi", data.values)
        toast.success(`Login successful. User type: ${requestData.user_type}`);
        setIsLogin(true);
        // window.localStorage.setItem("id",data.id)
        // let id = window.localStorage.getItem("id")
        const admin_userid  = data.values[0][1]
        const teacher_userid  = data.values[0][1]
        const student_userid  = data.values[0][1]
        window.localStorage.setItem("isLogin", true);
        window.localStorage.setItem("user_type", user_type);
    
        // navigate("/");
        switch(user_type){
          case "admin":
            navigate("/admin-dashboard");
            window.localStorage.setItem("admin_id",admin_userid )
            break;
            case "teacher":
              navigate("/Teaceher-Dashboard");
              window.localStorage.setItem("teacher_id",teacher_userid )
            break;
            case "student":
              navigate("/Check-schedule");
              window.localStorage.setItem("student_id",student_userid )
              break;
            default:
              // navigate("/")
              toast.error("isticmaale aan la aqoonsanen");
              break
        }
      }
      
     
       else{
        
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      // toast.error("server error happened");
    } finally {
      setLoading(false);
    }
  };

  const values = {
    isLogin,
    login,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
