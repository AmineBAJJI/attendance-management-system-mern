import React from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Feature({data}) {

    const {title,amount}= data;
    return (
        <div className='rounded-lg shadow-xl w-full'>
            <div className='p-8'>
                <span className='text-2xl '>{title}</span>
                <div className='flex items-center mt-4 mb-4'>
                    <span className='text-3xl font-semibold mr-3'>
                         {amount} h
                    </span>
                </div>
            </div>
        </div>
    )
}
