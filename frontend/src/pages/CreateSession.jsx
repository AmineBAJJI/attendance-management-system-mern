import React from 'react'

export default function CreateSession() {
    const labelStyle = 'text-gray-400 font-semibold mt-2';
    const inputStyle = 'mt-1 p-2  border-2 rounded-md w-[70%]'
    return (
      <div className='p-8  w-[82%]'>
        <h1 className='text-3xl font-bold'>Ajouter une séance</h1>
        <form action="#" method="post" className='grid grid-cols-2 gap-2  mt-5 '>
          <div>
          <label for="status" className={labelStyle}>Professeur</label><br/>
            <select id="status" name="status" required className={inputStyle}>
              <option value="active">prof1</option>
              <option value="notActive">prof2</option>
            </select>
          </div>
          <div>
          <label for="status" className={labelStyle}>Module</label><br/>
            <select id="status" name="status" required className={inputStyle}>
              <option value="active">module1</option>
              <option value="notActive">module2</option>
            </select>
          </div>
          <div>
          <label for="status" className={labelStyle}>filière</label><br/>
            <select id="status" name="status" required className={inputStyle}>
              <option value="active">f1</option>
              <option value="notActive">f2</option>
            </select>
          </div>
          <div>
            <label className={labelStyle} for="date">date</label><br />
            <input className={inputStyle}  type="date" id="date" name="date" required />
          </div>
          <div>
            <label className={labelStyle} for="heure_debut">heure de début</label><br />
            <input className={inputStyle} placeholder='heure_debut' type="time" id="heure_debut" name="heure_debut" required />
          </div>
          <div>
            <label className={labelStyle} for="heure_fin">heure de fin</label><br />
            <input className={inputStyle} placeholder='heure_fin' type="time" id="heure_fin" name="heure_fin" required />
          </div>

          <button type="submit" className=' bg-blue-700 hover:bg-blue-800 w-[200px] text-white font-semibold mt-4 p-1 text-center rounded-md'>Ajouter</button>
        </form>
      </div>
    )
}
