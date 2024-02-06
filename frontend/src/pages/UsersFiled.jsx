import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { userRows } from '../data/data';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';


export default function UsersFiled() {
    const [data, setData] = useState(userRows);
    const [filterInfo, setFilterInfo] = useState({
        module: '',
        matiere: '',
        filiere: '',
      
    });
    // return true if all filter inputs were selected
    const areFiltersComplete = () => {
        return Object.values(filterInfo).every(value => value !== '');
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilterInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        {
            field: "user",
            headerName: "Nom et Prénom",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className='flex items-center gap-5'>
                        <div className="avatar h-[35px] w-[35px]">
                            <div className="w-24 rounded-full">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <div> {params.row.username}</div>
                    </div>

                );
            },
        },
        { field: "email", headerName: "Groupe", width: 150 },
        { field: "abs", headerName: "nbr d'abs", width: 150 },
        {
            field: "action",
            headerName: "Action",
            width: 90,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row.id}>
                            <button className='bg-green-500 hover:bg-green-600 rounded-md px-2 py-1 mr-2 text-white font-semibold'>Afficher</button>
                        </Link>

                    </>
                );
            },
        },
    ];

    return (
        <div className='w-[82%]'>
            <div className='w-[75%] mx-auto mt-8'>
                <div className=' px-10 pt-8 mt-4 grid grid-cols-2  gap-6'>
                <div>
                        <select
                            name="module"
                            value={filterInfo.module}
                            onChange={handleFilterChange}
                            className="select select-ghost w-full max-w-xs border-2 border-gray-300"
                        >
                            <option disabled value="">Veuillez choisir un module</option>
                            <option>Java</option>
                            <option>Oracle</option>
                            <option>Optimisation</option>
                        </select>
                    </div>
                    <div>
                        <select
                            name="matiere"
                            value={filterInfo.matiere}
                            onChange={handleFilterChange}
                            className="select select-ghost w-full max-w-xs border-2 border-gray-300"
                        >
                            <option disabled value="">Veuillez choisir une matière</option>
                            <option>Java</option>
                            <option>Oracle</option>
                            <option>Optimisation</option>
                        </select>
                    </div>
                    <div>
                        <select
                            name="filiere"
                            value={filterInfo.filiere}
                            onChange={handleFilterChange}
                            className="select select-ghost w-full max-w-xs border-2 border-gray-300"
                        >
                            <option disabled value="">Veuillez choisir une filière</option>
                            <option>Ginf1</option>
                            <option>Ginf2</option>
                            <option>Ginf3</option>
                        </select>
                    </div>
                    
                </div>
            </div>

            {areFiltersComplete() ?
                <div>
                    <div className=' w-[66%]  flex items-center justify-center mx-auto mt-12 '>
                        <DataGrid

                            className='flex justify-center'
                            rows={data}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}

                        />

                    </div>
                    
                </div>
                :
                <div role="alert" className="alert alert-warning w-fit mx-auto mt-20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>Veuillez sélectionner tous les filtres !</span>
                </div>
            }

        </div>

    )
}
