import React from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Feature({data}) {

    const {icon,title,amount}= data;
    return (
        <div className='rounded-lg shadow-xl w-full'>
            <div className='p-8'>
                <div className='flex items-center'>
                   {icon && <div>{icon}</div>} 
                    <span className='text-xl'>{title}</span>
                </div>
                
                <div className='flex items-center mt-4 mb-4'>
                    <span className='text-2xl text-center  mr-3'>
                         {amount} 
                    </span>
                </div>
            </div>
        </div>
    )
}
