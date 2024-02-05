import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login_form() {
  const [formData, setFormData] = useState({
    user_type: "student",
    email: "",
    password: "",
  });

  // hooks
  const { login } = useAuth();

  //    const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("Current State:", formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData.user_type,formData.email, formData.password);
  
  };

  return (
    <>
      <section
        className="flex lg:justify-center lg:items-center 
    md:justify-center md:items-center sm:justify-center sm:items-center "
      >
        <div className="main  ">
          <div className="form lg:m-10 bg-[#E9F1FA] w-[440px] lg:w-[800px] md:w-[900px] sm:w-[660px] p-10 ">
            <h1 className="md:text-center lg:text-center font-sans font-bold pb-10 sm:text-center">
              Login here
            </h1>
            <form onSubmit={handleSubmit} className="">
              {/* .......... username */}
            
              <div className="user_name">
                <input
                  className="w-[290px] lg:w-[350px] border-gray-300 my-4 h-[48px] pl-4 outline-none rounded-md "
                  type="text"
                  name="email"
                  id=""
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="userEmail ..."
                />
              </div>
              {/* ......... passowrd */}
              <div className="user_name">
                <input
                  className="w-[290px] lg:w-[350px] border-gray-300 my-4 h-[48px] pl-4 outline-none rounded-md "
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  id=""
                  placeholder="password ..."
                />
              </div>
              <div className="user_type">
                  <select 
                  onChange={handleChange}
                   name="user_type" 
                   value={formData.user_type}
                   id=""
                   className="w-[350px] h-[50px] rounded-md text-gray-400 pl-4">
                    <option value="student">student</option>
                    <option value="teacher">teacher</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

              {/* ......button */}
              <button
                className="bg-[#00ABE4] w-[290px] lg:w-[400px] md:w-[400px] h-[48px] text-white mt-10"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login_form;
