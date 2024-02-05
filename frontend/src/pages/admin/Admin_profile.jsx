import React, { useEffect } from 'react'
import { MdEdit, MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import toast from 'react-hot-toast';
function Admin_profile() {


  
  const [model,setMdoel] = useState(false)
  const [model2,setMdoel2] = useState(false)
  const [model3,setMdoel3] = useState(false)
  const model1 = () => {
    setMdoel(!model)

  }
  const closeModel1 = () =>{
    setMdoel(!model)
  }
  const modelToggle2 = () => {
    setMdoel2(!model2)
    
  }
  const closeModel2 = () =>{
    setMdoel2(!model2)
  }
  const modelToggle3 = () => {
    setMdoel3(!model3)
    
  }
  const closeModel3 = () =>{
    setMdoel3(!model3)
  }
    const naviagte = useNavigate()
    const Logout = () => {
  
      console.log("your logut")
      window.localStorage.clear('isLogin')
      naviagte('/login')
    }



    // ....... admin profile 
    const [admins,setAdmins] = useState([])

    useEffect(() => {
      const fetchAdmins = async () => {
          try {
            let admin_id = window.localStorage.getItem("admin_id")
            const respont = await fetch(`http://localhost:5555/display-admins/${admin_id}`)
            const data  = await respont.json()

            console.log("admins-ka", data)
            if(data){
                  setAdmins(data)
            }else{
              console.log("error getting admins")
            }
            
          } catch (error) {
            console.error("errorka admins", error)
          }
      }
      fetchAdmins();
    }, []);

    // ......... update udmin name

    const update_admin_username = async (newUsername) => {
        try {
          let admin_id = window.localStorage.getItem("admin_id")
          
          const response = await fetch(`http://localhost:5555/update-admin-username/${admin_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ admin_name: newUsername }),
          });

          const data = await response.json();
          if(data.status === "success"){
                console.log("updated username")
                toast.success("updated admin username")
                setMdoel(!model)
          }else{
            toast.error(data.message)

          }
        } catch (error) {
            console.error("error updating-ka", error)
        }
    }


    // ......... update udmin email


    const update_admin_email = async (adminNewEmail) => {
        try {
          let admin_id = window.localStorage.getItem("admin_id")
          
          const response = await fetch(`http://localhost:5555/update-admin-email/${admin_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ admin_email: adminNewEmail }),
          });

          const data = await response.json();
          if(data.status === "success"){
                console.log("updated admin email")
                toast.success(data.message)
                setMdoel2(!model2)
          }else{
            toast.error(data.message)

          }
        } catch (error) {
            console.error("error updating-ka", error)
        }
    }



    // ......... update udmin passowrd


    const update_admin_password = async (oldPassword,newPassword) => {
        try {
          let admin_id = window.localStorage.getItem("admin_id")
          
          const response = await fetch(`http://localhost:5555/update-admin-password/${admin_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: oldPassword, new_password:newPassword}),
          });

          const data = await response.json();
          if(data.status === "success"){
                console.log("updated admin password")
                toast.success(data.message)
                setMdoel3(!model3)
          }else{
            toast.error(data.message)

          }
        } catch (error) {
            console.error("error updating-ka", error)
        }
    }
  return (
  
            <section className="h-[92vh] lg:h-[76vh] pb-10 mb-20 form lg:m-10 bg-[#E9F1FA] w-auto lg:w-4/5 lg:mr-44 md:w-[900px] sm:w-[660px] p-10">
               <div>
      {/* ... other JSX elements ... */}

      {admins.map((admin) => (
        <div key={admin.admin_id}>
          {/* Admin Details */}
          <div className="content flex mt-4 items-center justify-between w-[300px] lg:w-[400px] bg-white p-4 rounded-md">
            <div className="name"><h3>{admin.admin_name}</h3></div>
            <div className="name cursor-pointer" onClick={model1}>
              <span><MdEdit /></span>
            </div>
          </div>
        

         {/* .....             email */}
         <div className="content flex mt-4 items-center justify-between w-[300px] lg:w-[400px] bg-white p-4 rounded-md">
                  <div className="name"><h3>{admin.admin_email}</h3></div>
                  <div className="name cursor-pointer" onClick={modelToggle2}><span><MdEdit /></span></div>
              </div>
            
            {/* )} */}

             {/* .....             passowrd */}
             <div className="content flex mt-4 items-center justify-between w-[300px] lg:w-[400px] bg-white p-4 rounded-md">
                  <div className="name"><h3>***</h3></div>
                  <div className="name cursor-pointer" onClick={modelToggle3}><span><MdEdit /></span></div>
              </div>
                
            {/* )} */}
        </div>
      ))}


      {/* username edit model */}

      {model && (
              <div
              
              className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center"
              
              >
                <div className="bg-white p-4 rounded-md lg:w-[500px] w-[300px]">
                  {/* Add your modal content here */}
                        <div className='mb-10 cursor-pointer'  onClick={closeModel1}> <span className='float-right'><MdClose /></span>
                        </div>
                    <form 
                     onSubmit={(e) => {
                      e.preventDefault();
                      const newUsername = e.target.elements.newUsername.value;
                      update_admin_username(newUsername);
                    }}
                      action="" className='flex flex-col'>
                
                      <div>
                      <input type  = "text" className='border-2 border-gray text-[16px] lg:w-[400px] h-[50px] my-4 text-black
                       pl-4 outline-none' placeholder='enter New username'
                      name='newUsername' />
                      </div>
                     
                      <button className='bg-[#00ABE4] lg:w-[290px] 
                      lg:w-full  md:w-[400px] h-[48px]
                   text-white rounded-md mt-10 text-[16px]' type='submit'>Update</button>
                    </form>
                  
                  
                </div>
              </div>
            )}

    {/* ............. email model edit */}
    {model2 && (
              <div
              
              className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center"
              
              >
                <div className="bg-white p-4 rounded-md lg:w-[500px] w-[300px]">
                  {/* Add your modal content here */}
                        <div className='mb-10 cursor-pointer'  onClick={closeModel2}> <span className='float-right'><MdClose /></span>
                        </div>
                    <form 
                    
                    onSubmit={(e) => {
                      e.preventDefault();
                      const adminNewEmail = e.target.elements.adminNewEmail.value;
                      update_admin_email(adminNewEmail);
                    }}
                    action="" className='flex flex-col'>
                     
                      <div>
                      <input type  = "text" className='border-2 border-gray text-[16px] w-[400px] h-[50px] my-4 text-black
                       pl-4 outline-none' placeholder='enter New email'
                       name='adminNewEmail'/>
                      </div>
                     
                      <button className='bg-[#00ABE4] lg:w-[290px] 
                      lg:w-full  md:w-[400px] h-[48px]
                   text-white rounded-md mt-10 text-[16px]'
                    type='submit'
                   >Update</button>
                    </form>
                  
                  
                </div>
              </div>
            )}



{/* ................ password model edit */}
{model3 && (
              <div
              
              className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center"
              
              >
                <div className="bg-white p-4 rounded-md lg:w-[500px] w-[300px]">
                  {/* Add your modal content here */}
                        <div className='mb-10 cursor-pointer'  onClick={closeModel3}> <span className='float-right'><MdClose /></span>
                        </div>
                    <form  
                     onSubmit={(e) => {
                      e.preventDefault();
                      const oldPassword = e.target.elements.oldPassword.value;
                      const newPassword = e.target.elements.newPassword.value;
                      update_admin_password(oldPassword, newPassword);
                  }}
                     action="" className='flex flex-col'>
                      <div>

                      <input type  = "text" className='border-2  border-gray text-[16px] lg:w-[400px] h-[50px] my-4 text-black 
                      pl-4 outline-emerald-50' placeholder='enter old password'  
                       name='oldPassword'/>
                      </div>
                      <div>
                      <input type  = "text" className='border-2 border-gray text-[16px] lg:w-[400px] h-[50px] my-4 text-black
                       pl-4 outline-none' placeholder='enter New password'
                       name='newPassword'/>
                      </div>
                     
                      <button className='bg-[#00ABE4] lg:w-[290px] 
                      lg:w-full  md:w-[400px] h-[48px]
                   text-white rounded-md mt-10 text-[16px]'>Update</button>
                    </form>
                  
                  
                </div>
              </div>
            )}
      <button className='bg-[#00ABE4] w-[290px] lg:w-[150px] md:w-[400px] h-[48px]
                     text-white rounded-md mt-10'  onClick={Logout}>Ka bax</button>
    </div>
            </section>
  )
}

export default Admin_profile
