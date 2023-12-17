import { Link,useNavigate } from "react-router-dom"
import image1 from '../assets/image1.jpg';
import { useState,useEffect } from "react";
import { useDispatch ,useSelector } from 'react-redux';
import { useLoginMutation } from "../features/auth/usersApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import {toast} from 'react-toastify'





export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    
    const [login,{ isLoading}] = useLoginMutation();
    const { userInfo} = useSelector(state=>state.auth);
    useEffect (()=>{
        if (userInfo){
            navigate('/');
        }
    }, [navigate,userInfo]);



    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const res = await login({email,password}).unwrap();
            console.log(res);
            dispatch(setCredentials({...res}));
            navigate('/');
            
        }catch(err){
            toast.error(err.data.errors.email);
        }
    }
    return (
        <div>
            <div className='bg-blue-400 flex justify-between items-center h-screen '>
                <div className="w-[50%] flex justify-center">
                    <div className="mockup-browser border bg-base-300 shadow-2xl mx-5">
                        <div className="mockup-browser-toolbar">
                            <div className="input">https://GestiPro.com</div>
                        </div>
                        <div className="flex justify-center   bg-base-200">
                            <img src={image1} alt="" />
                        </div>
                    </div>
                </div>
                <div className="w-[70%]">
                    <div className='bg-white md:w-[50%] mx-auto p-8 rounded-xl shadow-2xl '>
                        <form action="" method="post"  >
                            <div className='flex flex-col justify-center  mx-auto '>
                                <h1 className='font-bold text-[20px] text-center my-2'> Bienvenue à <span className='text-gray-400'>GestiPro</span></h1>
                                <input
                                    type="email"
                                      onChange={(e) => { setEmail(e.target.value) }}
                                    placeholder="nom d'utilisateur"
                                    className='my-4 py-1.5 px-2 rounded-md font-medium bg-gray-100 border-2 border-gray-100' />
                                <input
                                      onChange={(e) => { setPassword(e.target.value) }}
                                    type="password"
                                    placeholder='mot de passe'
                                    className='my-4 py-1.5 px-2 rounded-md font-medium bg-gray-100 border-2 border-gray-100' />
                                <button 
                                className='bg-teal-500 rounded-md p-2 my-3 w-[100%] hover:bg-teal-400 text-white font-semibold'
                                // disabled={isFetching}
                                onClick={handleSubmit}
                                >Se connecter</button>
                                {/* {error && <span className="text-center text-red-600 font-light">Your username or password is wrong  </span>} */}
                            </div>
                        </form>
                        
                        
                        
                        
                    </div>
                </div>
            </div>
            
        </div>
    )
}
