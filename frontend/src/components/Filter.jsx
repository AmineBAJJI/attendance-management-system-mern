import React from 'react'

export default function Filter() {
    return (
        <div className='flex justify-between px-10 pt-8 mt-4 items-center'>
            <div>
                <select className="select select-ghost w-full max-w-xs border-2 border-gray-300">
                    <option disabled selected>Veuillez choisir une filier</option>
                    <option>Ginf1</option>
                    <option>Ginf2</option>
                    <option>Ginf3</option>
                </select>
            </div>
            <div>
            <select className="select select-ghost w-full max-w-xs border-2 border-gray-300">
                    <option disabled selected>Veuillez choisir une  module</option>
                    <option>Java</option>
                    <option>Oracle</option>
                    <option>Optimisation</option>
                </select>
            </div>
            <div>
                <input 
                type="date"
                name=""
                id=""
                className='p-2 px-5 border-2 border-gray-300 rounded-lg'
                />
            </div>

        </div>
    )
}
