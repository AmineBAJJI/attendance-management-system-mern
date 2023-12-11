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
                    <div> {params.row.username}</div>
                );
            },
        },
        { field: "email", headerName: "Groupe", width: 200 },
        {
            field: "status",
            headerName: "Gestion Des Absences ",
            width: 250,
            renderCell: (params) => {
                return (
                    <div className='flex gap-6 items-center ml-8'>
                      <input type="checkbox"  className="checkbox checkbox-accent border-gray-400 [--chkfg:white]" />
                      <input type="checkbox"  className="checkbox checkbox-accent [--chkfg:white] border-gray-400" />
                    </div>
                );
            },
        },
        // {
        //     field: "transaction",
        //     headerName: "Transaction Volume",
        //     width: 200,
        // },
        {
            field: "action",
            headerName: "Action",
            width: 100,
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
            
            <div className=' w-[80%]  flex items-center justify-center mx-auto mt-12 '>
                <DataGrid

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
