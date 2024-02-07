import React, { useState } from 'react';
import axios from 'axios';
import api from '../api/students';
import { toast } from 'react-toastify'



export default function CreateSession() {
  const labelStyle = 'text-gray-400 font-semibold mt-2';
  const inputStyle = 'mt-1 p-2  border-2 rounded-md w-[70%]';

  const [sessionData, setSessionData] = useState({
    professor_id: '',
    subject: '', // Changed from 'module' to 'subject'
    class: 'GINF1', // Defaulting to 'GINF1'
    room: '',
    date: '',
    start_time: '',
    end_time: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const res = await api.post('/sessions/add', sessionData);
      toast.success("La session a été ajoutée");
      setSessionData({
        professor_id: '',
        subject: '', // Changed from 'module' to 'subject'
        class: 'GINF1', // Defaulting to 'GINF1'
        room: '',
        date: '',
        start_time: '',
        end_time: ''
      })
      console.log('Session added:'); // Assuming API returns data of the added session
      // Optionally, you can navigate to a different page or show a success message upon successful submission
    } catch (err) {
      console.error('Error adding session:', err);
      // Handle error, show error message, etc.
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='p-8 w-[82%]'>
      {console.log(sessionData)}
      <h1 className='text-3xl font-bold'>Ajouter une séance</h1>
      <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-2 mt-5'>
        <div>
          <label htmlFor="professor_id" className={labelStyle}>Professeur ID</label><br />
          <input
            type="text"
            value={sessionData.professor_id}
            onChange={handleChange}
            placeholder='Professeur id'
            className={inputStyle}
            name="professor_id" // Corrected name attribute
            id="profId"
          />
        </div>
        <div>
          <label htmlFor="subject" className={labelStyle}>Matière</label><br />
          <input
            type="text"
            value={sessionData.subject} // Changed 'module' to 'subject'
            onChange={handleChange}
            id='subject' // Changed 'module' to 'subject'
            name='subject' // Changed 'module' to 'subject'
            placeholder='Matière' // Changed 'Module' to 'Matière'
            className={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="class" className={labelStyle}>Filière</label><br />
          <select
            id="class"
            name="class"
            value={sessionData}
            onChange={handleChange}
            required
            className={inputStyle}
          >
            <option value="GINF1">GINF1</option>
            <option value="GINF2">GINF2</option>
          </select>
        </div>
        <div>
          <label htmlFor="room" className={labelStyle}>La salle</label><br />
          <input
            type="text"
            value={sessionData.room}
            onChange={handleChange}
            id='room'
            name='room'
            placeholder='La salle'
            className={inputStyle}
          />
        </div>
        <div>
          <label className={labelStyle} htmlFor="date">Date</label><br />
          <input
            type="date"
            value={sessionData.date}
            onChange={handleChange}
            className={inputStyle}
            id="date"
            name="date"
            required
          />
        </div>
        <div>
          <label className={labelStyle} htmlFor="start_time">Heure de début</label><br />
          <input
            type="time"
            value={sessionData.start_time}
            onChange={handleChange}
            placeholder='Heure de début'
            className={inputStyle}
            id="start_time"
            name="start_time"
            required
          />
        </div>
        <div>
          <label className={labelStyle} htmlFor="end_time">Heure de fin</label><br />
          <input
            type="time"
            value={sessionData.end_time}
            onChange={handleChange}
            placeholder='Heure de fin'
            className={inputStyle}
            id="end_time"
            name="end_time"
            required
          />
        </div>
        <div></div>
        <button type="submit" className='bg-blue-700 hover:bg-blue-800 w-[200px] text-white font-semibold mt-4 p-1 text-center rounded-md'>
          Ajouter
        </button>
      </form>
    </div>
  );
}
