import React from 'react'
import { Link } from 'react-router-dom'
import Chart from '../components/Chart'
import { UserData } from '../data/data'
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import Feature from '../components/Feature';

export default function Home() {
 const userInfo = useSelector(state=>state.auth).userInfo.user;

    const inputStyle = "mt-1 border  border-y-2 border-x-0 border-t-0 border-gray-400 p-1";
    return (
        <div className='p-8 w-[82%] '>
            {console.log(userInfo)}
            <div>
                <h1 className='text-3xl font-bold'>Bienvenue, M. Hassan</h1>
            </div>
            <div className='flex item-center mt-6 gap-8'>
                <div className='w-[100%] rounded-md shadow-xl p-12'>
                    <div className='flex items-center gap-4'>
                        <Avatar>H</Avatar>
                        <div>
                            <span className='text-lg font-semibold'>M.Hassan</span>
                            <p className='text-sm font-thin text-gray-500'>Professeur et chef de filiere </p>
                        </div>
                    </div>
                    <h3 className='mt-4 font-semibold text-gray-400'>les details de l'Enseignant</h3>
                    <div className='flex items-center mt-4'>
                        <p className='font-bold'>ID:</p>
                        <span className='ml-2'>{userInfo._id}</span>
                    </div>
                    
                    <div className='flex items-center mt-4'>
                        <p className='font-bold'>Nom et Prénom:</p>
                        <span className='ml-2'>Hassan </span>
                    </div>
                    <div className='flex items-center mt-4'>
                        <p className='font-bold'>E-mail:</p>
                        <span className='ml-2'>{userInfo.email} </span>
                    </div>
                    <div className='flex items-center mt-4'>
                        <p className='font-bold'>Votre rôle:</p>
                        <span className='ml-2'>{userInfo.role}</span>
                    </div>
                   
                    <div className='flex items-center mt-4'>
                        <p className='font-bold'>Les matiers que vous enseignez:</p>
                        <span className='ml-2'>K14366921</span>
                    </div>
                    <div className='flex items-center mt-4'>
                        <p className='font-bold'>Année scolaire:</p>
                        <span className='ml-2'>2023/2024</span>
                    </div>
                    



                </div>
               






            </div>
        </div>
    )
}
