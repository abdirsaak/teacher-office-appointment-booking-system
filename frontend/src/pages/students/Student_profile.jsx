import React, { useEffect } from 'react'
import { MdEdit, MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';
function Student_profile() {
  const [model,setMdoel] = useState(false)
  const [model2,setMdoel2] = useState(false)
  const [model3,setMdoel3] = useState(false)
  const [model4,setMdoel4] = useState(false)
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
  const modelToggle4 = () => {
    setMdoel4(!model4)
    
  }
  const closeModel3 = () =>{
    setMdoel3(!model3)
  }
  const closeModel4 = () =>{
    setMdoel4(!model4)
  }
    const naviagte = useNavigate()
    const Logout = () => {
  
      console.log("your logut")
      window.localStorage.clear('isLogin')
      naviagte('/login')
    }



    // ....... studnet profile 
    const [students,setStudents] = useState([])

    useEffect(() => {
      const fetchStudents = async () => {
          try {
            let student_id = window.localStorage.getItem("student_id")
            const respont = await fetch(`http://localhost:5555/display-students/${student_id}`)
            const data  = await respont.json()

            console.log("students-ka", data)
            if(data){
              setStudents(data.data)
            }else{
              console.log("error getting students")
            }
            
          } catch (error) {
            console.error("errorka students", error.message)
          }
      }
      fetchStudents();
    }, []);

    // ......... update student name

    const update_studentUsername = async (oldName,newName) => {
        try {
          let student_id = window.localStorage.getItem("student_id")
          const response = await fetch(`http://localhost:5555/update-username/${student_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ old_username: oldName, username: newName }),
          });

          const data = await response.json();
          console.log("updating username response", data)
          if(data.status === "success"){
                console.log("updated username")
                toast.success("si saxan ayad u badashay magacaaga")
                setMdoel(!model)
          }else if(data.status === "fail"){
            toast.error(data.message)
          }
          else{
            toast.error("qalad aya jiro,markale isku daya")

          }
        } catch (error) {
            console.error("error updating-ka", error)
        }
    }
    


    // ......... update student email
    const update_UserEmail = async (oldEmail,newEmail) => {
      try {
        let student_id = window.localStorage.getItem("student_id")
        const response = await fetch(`http://localhost:5555/update-user-email/${student_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ old_email: oldEmail, email: newEmail }),
        });

        const data = await response.json();
        if(data.status === "success"){
              console.log("updated user email")
              toast.success("si saxan ayad u badashay email")
              setMdoel2(!model2)
        }else if(data.status === "fail"){
          toast.error(data.message)
        }
        else{
          // toast.error("error while updating student email")

        }
      } catch (error) {
          console.error("error updating-ka", error)
      }
  }



  


    // ......... update student passowrd


    const update_student_password = async (oldPassword,newPassword) => {
        try {
          let student_id = window.localStorage.getItem("student_id")
          
          const response = await fetch(`http://localhost:5555/update-user-password/${student_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ old_password: oldPassword, new_password:newPassword}),
          });

          const data = await response.json();
          if(data.status === "success"){
                console.log("updated student password")
                toast.success("updated student password")
                setMdoel3(!model3)
          }else if(data.status === "fail"){
            toast.error(data.message)
          }
          else{
            toast.error("error while updating student passowrd")

          }
        } catch (error) {
            console.error("error updating-ka", error)
        }
    }
    // ......... update sex passowrd


    const update_student_sex = async (newSex) => {
        try {
      
     
          let student_id = window.localStorage.getItem("student_id")
          const response = await fetch(`http://localhost:5555/update-student-gender/${student_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ student_gender: newSex}),
          });

          const data = await response.json();
          if(data.status === "success"){
                console.log("updated student sex")
                toast.success("updated student sex")
                setMdoel4(!model4)
          }else if(data.status === "fail"){
            toast.error(data.message)
          }
          else{
            toast.error("error while updating student sex")

          }
        } catch (error) {
            console.error("error updating-ka", error)
        }
    }
  return (
    <>
      <section className="h-[92vh] lg:h-[76vh] pb-10 mb-20 form lg:m-10 bg-[#E9F1FA] w-auto lg:w-4/5 lg:mr-44 md:w-[900px] sm:w-[660px] p-10">
    <div>
{/* ... other JSX elements ... */}

{students.map((student) => (
<div key={student.id}>
{/* Admin Details */}
<div className="content flex mt-4 items-center justify-between w-[300px] lg:w-[400px] bg-white p-4 rounded-md">
 <div className="name"><h3>{student.name}</h3></div>
 <div className="name cursor-pointer" onClick={model1}>
   <span><MdEdit /></span>
 </div>
</div>


{/* .....             email */}
<div className="content flex mt-4 items-center justify-between w-[300px] lg:w-[400px] bg-white p-4 rounded-md">
       <div className="name"><h3>{student.email}</h3></div>
       <div className="name cursor-pointer" onClick={modelToggle2}><span><MdEdit /></span></div>
   </div>
 
 {/* )} */}

  {/* .....             passowrd */}
  <div className="content flex mt-4 items-center justify-between w-[300px] lg:w-[400px] bg-white p-4 rounded-md">
       <div className="name"><h3>***</h3></div>
       <div className="name cursor-pointer" onClick={modelToggle3}><span><MdEdit /></span></div>
   </div>
   {/* ...... gender */}
  <div className="content flex mt-4 items-center justify-between w-[300px] lg:w-[400px] bg-white p-4 rounded-md">
       <div className="name"><h3>{student.sex}</h3></div>
       <div className="name cursor-pointer" onClick={modelToggle4}><span><MdEdit /></span></div>
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
           const oldName = e.target.elements.oldName.value;
           const newName = e.target.elements.newName.value;
           update_studentUsername(oldName,newName);
         }}
           action="" className='flex flex-col'>
     
           <div>
           <input type  = "text" className='border-2 border-gray text-[16px] lg:w-[400px] h-[50px] my-4 text-black
            pl-4 outline-none' placeholder='enter New username'
           name='oldName' />
           </div>
           <div>
           <input type  = "text" className='border-2 border-gray text-[16px] lg:w-[400px] h-[50px] my-4 text-black
            pl-4 outline-none' placeholder='enter New username'
           name='newName' />
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
           const oldEmail = e.target.elements.oldEmail.value;
           const newEmail = e.target.elements.newEmail.value;
           update_UserEmail(oldEmail,newEmail);
         }}
         action="" className='flex flex-col'>
          
           <div>
           <input type  = "text" className='border-2 border-gray text-[16px] 
           lg:w-[400px] h-[50px] my-4 text-black
            pl-4 outline-none' placeholder='enter old email'
            name='oldEmail'/>
           </div>
           <div>
           <input type  = "text" className='border-2 border-gray text-[16px] lg:w-[400px] h-[50px] my-4 text-black
            pl-4 outline-none' placeholder='enter New email'
            name='newEmail'/>
           </div>
          
           <button className='bg-[#00ABE4] lg:w-[290px] 
           lg:w-full   md:w-[400px] h-[48px]
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
     <div className="bg-white lg:w-[500px] w-[300px] p-4 rounded-md">
       {/* Add your modal content here */}
             <div className='mb-10 cursor-pointer'  onClick={closeModel3}> <span className='float-right'><MdClose /></span>
             </div>
         <form  
          onSubmit={(e) => {
           e.preventDefault();
           const oldPassword = e.target.elements.oldPassword.value;
           const newPassword = e.target.elements.newPassword.value;
           update_student_password(oldPassword, newPassword);
       }}
          action="" className='flex flex-col'>
           <div>

           <input type  = "text" className='border-2  border-gray text-[16px]
            lg:w-[400px] h-[50px] my-4 text-black 
           pl-4 outline-emerald-50' placeholder='enter old password'  
            name='oldPassword'/>
           </div>
           <div>
           <input type  = "text" className='border-2 border-gray text-[16px]
            lg:w-[400px] h-[50px] my-4 text-black
            pl-4 outline-none' placeholder='enter New password'
            name='newPassword'/>
           </div>
          
           <button className='bg-[#00ABE4]  lg:w-[290px] 
           lg:w-full  md:w-[400px] h-[48px]
        text-white rounded-md mt-10 text-[16px]'>Update</button>
         </form>
       
       
     </div>
   </div>
 )}
{/* ................ sex model edit */}
{model4 && (
   <div
   
   className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center"
   
   >
     <div className="bg-white lg:w-[400px] p-4 rounded-md">
       {/* Add your modal content here */}
             <div className='mb-10 cursor-pointer'  onClick={closeModel4}> <span className='float-right'><MdClose /></span>
             </div>
         <form  
          onSubmit={(e) => {
           e.preventDefault();
           const newSex = e.target.elements.newSex.value;
           update_student_sex(newSex);
       }}
          action="" className='flex flex-col'>
          
          <div>
            <select className='border-2 border-gray-100 w-full h-[50px]' name="newSex" id="">
              {/* <label htmlFor="">sex</label> */}

              <option value="male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
           <button className='bg-[#00ABE4] w-[290px] 
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
    
    </>
  )
}

export default Student_profile
