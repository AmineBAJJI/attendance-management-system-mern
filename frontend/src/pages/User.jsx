import React from 'react'
import { Link } from 'react-router-dom'
import Chart from '../components/Chart'
import { UserData } from '../data/data'
import Avatar from '@mui/material/Avatar';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import Feature from '../components/Feature';

export default function User() {

    const inputStyle = "mt-1 border  border-y-2 border-x-0 border-t-0 border-gray-400 p-1";
    return (
        <div className='p-8 w-[82%] '>
            <div>
                <h1 className='text-3xl font-bold'>Les informations de l'étudiant</h1>
            </div>
            <div className='flex item-center mt-6 gap-8'>
                <div className='w-[40%] rounded-md shadow-xl p-12'>
                    <div className='flex items-center gap-4'>
                        <Avatar>H</Avatar>
                        <div>
                            <span className='text-lg font-semibold'>Nabil Kachar</span>
                            <p className='text-sm font-thin text-gray-500'>GINF 1 </p>
                        </div>
                    </div>
                    <h3 className='mt-4 font-semibold text-gray-400'>Accout Details</h3>
                    <div className='flex items-center mt-4'>
                        <PersonOutlineOutlinedIcon />
                        <span className='ml-2'>Nabil kachar</span>
                    </div>
                    <div className='flex items-center mt-4'>
                        <CalendarTodayOutlinedIcon />
                        <span className='ml-2'>07.02.2003</span>
                    </div>
                    <h3 className='mt-4 font-semibold text-gray-400'>Contact Details</h3>
                    <div className='flex items-center mt-4'>
                        <PhoneAndroidOutlinedIcon />
                        <span className='ml-2'>+212 770378917</span>
                    </div>
                    <div className='flex items-center mt-4'>
                        <AlternateEmailOutlinedIcon />
                        <span className='ml-2'>nabilkachar03@gmail.com</span>
                    </div>
                    <div className='flex items-center mt-4'>
                        < FmdGoodOutlinedIcon />
                        <span className='ml-2'>Tanger | MA</span>
                    </div>



                </div>
                <div className='w-[60%]'>
                    <div className='flex justify-center items-center gap-8 w-full'>
                        <Feature data={{ title: 'blablab', amount: 5, change: 5 }} className='w-full' />
                        <Feature data={{ title: 'blablab', amount: 5, change: 5 }} className='w-full' />
                        <Feature data={{ title: 'blablab', amount: 5, change: 5 }} className='w-full' />
                    </div>
                    <div className='w-full h-fit'>
                        <Chart data={UserData} title="User Analytics" grid dataKey="active User" />
                    </div>
                </div>






            </div>
        </div>
    )
}
