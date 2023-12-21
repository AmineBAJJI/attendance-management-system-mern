import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { userRows } from '../data/data';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import Filter from '../components/Filter';

export default function Users() {
    const [data, setData] = useState(userRows);

    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
    }
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
        { field: "email", headerName: "Groupe", width: 100 },
        {
            field: "status",
            headerName: "8-10 ",
            width: 100,
            renderCell: (params) => {
                return (
                        <input type="checkbox" className="checkbox checkbox-accent border-gray-400 [--chkfg:white]" />
                );
            },
        },
        {
            field: "status",
            headerName: "8-10 ",
            width: 100,
            renderCell: (params) => {
                return (
                        
                        <input type="checkbox" className="checkbox checkbox-accent border-gray-400 [--chkfg:white]" />

                );
            },
        },

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
                <Filter />
            </div>

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

    )
}
