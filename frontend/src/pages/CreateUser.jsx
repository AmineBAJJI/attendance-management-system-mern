import React from 'react'

export default function CreateUser() {

  const labelStyle = 'text-gray-400 font-semibold mt-2';
  const inputStyle = 'mt-1 p-2  border-2 rounded-md w-[70%]'
  return (
    <div className='p-8  w-[82%]'>
      <h1 className='text-3xl font-bold'>Ajouter un(e) étudiant(e)</h1>
      <form action="#" method="post" className='grid grid-cols-2 gap-2 mt-5 '>
        <div>
          <label for="last_name" className='text-gray-400 font-semibold mt-2'>Nom</label><br />
          <input type="text" id="last_name" name="last_name" placeholder='Nom' required className='mt-1 p-2  border-2 rounded-md w-[70%]' />
        </div>
        <div>
          <label for="last_name" className={labelStyle}>Prénom</label><br />
          <input className={inputStyle} placeholder='Prénom' type="text" id="last_name" name="last_name" required />
        </div>
        <div>
          <label className={labelStyle} for="email">Email</label><br />
          <input className={inputStyle} placeholder='email' type="email" id="email" name="email" required />
        </div>
        <div>
          <label className={labelStyle} for="password">Mot de Passe</label><br />
          <input className={inputStyle} placeholder='Mot de Passe' type="password" id="password" name="password" required />
        </div>
      
        <div>
          <label for="filld" className={labelStyle}>Filière</label><br/>
          <select id="filed" name="status" required className={inputStyle}>
            <option value="f1">f1</option>
            <option value="f2">f2</option>
          </select>
        </div>

      </form>
      <button type="submit" className=' bg-blue-700 hover:bg-blue-800 w-[200px] text-white font-semibold mt-4 p-1 text-center rounded-md'>Ajouter</button>
    </div>
  )
}
