import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../api/students';
import Avatar from '@mui/material/Avatar';

function StudentAbs() {
    const [student, setStudent] = useState({});
    const { studentId, classId } = useParams();
    const car = student.first_name && student.last_name ? student.first_name[0] + student.last_name[0] : '';
    useEffect(() => {
        const studentData = async () => {
            try {

                const endpoint = `/students/${studentId}/`;

                const res = await api.get(endpoint);

                setStudent(res.data)
                console.log(res.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        studentData();
    }, []);
    return (
        <div className='p-8 w-[82%]'>
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
            <div>
                <h1 className='text-3xl font-bold mt-8'> La Liste des absences </h1>
            </div>
            <div className='w-full rounded-md shadow-xl p-12'>
             
            <table className="table w-full">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>APOGEE</th>
                                        <th>NOM</th>
                                        <th>PRENOM</th>
                                        <th>GROUPE</th>
                                        
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  
                                        <tr >
                                            <th></th>
                                            <th></th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            
                                                
                                        
                                            <td>
                                                
                                                    <button className='bg-green-500 hover:bg-green-600 rounded-md px-2 py-1 mr-2 text-white font-semibold'>Justifier l'absence</button>
                                               
                                            </td>
                                        </tr>
                             
                                </tbody>
                            </table>

                
            </div>
        </div>
    )
}

export default StudentAbs