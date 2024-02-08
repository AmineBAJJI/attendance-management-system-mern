import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import api from '../api/students';
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
import AccessibleIcon from '@mui/icons-material/Accessible';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';


export default function User({ props }) {
    const [student, setStudent] = useState({});
    const { userId ,classId ,elementId } = useParams();

    useEffect(() => {
        const studentData = async () => {
            try {

                const endpoint = `/students/class/${classId}/element/${elementId}/id/${userId}/`;

                const res = await api.get(endpoint);

                setStudent(res.data)
                console.log(res.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        studentData();
    }, []);

    const car = student.first_name && student.last_name ? student.first_name[0] + student.last_name[0] : '';
    const studentStatus = {
        hasDisabilityStatus: student.hasDisability ? 'Oui' : 'Non',
        hasChronicDiseaseStatus: student.hasChronicDisease ? 'Oui' : 'Non',


    }
    return (
        <div className='p-8 w-[82%] '>

            <div>
                <h1 className='text-3xl font-bold'>Les informations de l'étudiant(e) </h1>
            </div>
            <div className='w-full rounded-md shadow-xl p-12'>
                    <div className='flex items-center gap-4'>
                    <Avatar>{car}</Avatar>

                        <div>
                            <span className='text-lg font-semibold'>{student.first_name} {student.last_name}</span>
                            <p className='text-sm font-thin text-gray-500'>{student.class}</p>
                        </div>
                    </div>
                    <h3 className='mt-4 font-semibold text-gray-400'>les details de l'etudiant</h3>
                    <div className='flex items-center mt-4'>
                        <p className='font-bold'>Nom complete :</p>
                        <span className='ml-2'>{student.first_name} {student.last_name}</span>
                    </div>
                    <div className='flex items-center mt-4'>
                    <p className='font-bold'>Code Apoggee :</p>
                        <span className='ml-2'>{student.apogee}</span>
                    </div>
                    <div className='flex items-center mt-4'>
                    <p className='font-bold'>Groupe :</p>
                        <span className='ml-2'>{student.class}</span>
                    </div>
                    <div className='flex items-center mt-4'>
                    <p className='font-bold'>Année scolaire :</p>
                        <span className='ml-2'>2023/2024</span>
                    </div>
                   



                </div>
            <div className='flex item-center mt-6 gap-8'>
           
                <div className='w-full'>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <Feature data={{ icon: <AccessibleIcon fontSize='large' className='text-gray-400 mr-2 !important ' />, title: 'A-t-il un handicap ?', amount: studentStatus.hasDisabilityStatus, }} className='w-full' />
                        <Feature data={{ icon: <MedicalInformationIcon fontSize='large' className='text-gray-400 mr-2 !important ' />, title: 'A-t-il une maladie chronique ?', amount: studentStatus.hasChronicDiseaseStatus, }} className='w-full' />
                        <Feature data={{ icon: <LeaderboardIcon fontSize='large' className='text-gray-400 mr-2 !important ' />, title: "Le nombre total d'absences ( justifiée)", amount: `${student.total_absences} (${student.total_justified})` }} className='w-full' />
                        <Feature data={{ icon: <LeaderboardIcon fontSize='large' className='text-gray-400 mr-2 !important ' />, title: "Le nombre d'absences par matière ( justifiée)", amount: `${student.element_absences} (${student.element_justified})`, }} className='w-full' />
                        
                    </div>

                </div>






            </div>
        </div>
    )
}
