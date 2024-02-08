import React, { useState } from 'react';
import axios from 'axios';
import api from '../api/students';
import { toast } from 'react-toastify'
import {profData} from '../data/profData';
import { elementData } from '../data/coursesData';
import { modulesData } from '../data/coursesData';



export default function CreateSession() {

  const labelStyle = 'text-gray-400 font-semibold mt-2';
  const inputStyle = 'mt-1 p-2  border-2 rounded-md w-[70%]';

  const [sessionData, setSessionData] = useState({
    professor_id: '',
    module: '', 
    element: '',// Changed from 'module' to 'subject'
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
          <label htmlFor="professor_id" className={labelStyle}>Professeur </label><br />
          <select
            id="professor_id"
            name="professor_id"
            value={sessionData.professor_id}
            onChange={handleChange}
            className={inputStyle} // Apply the same style as other inputs
          >
            <option value="">Select Professor</option> {/* Optional default option */}
            {profData.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="module" className={labelStyle}>Module</label><br />
          <select
            id="module"
            name="module"
            value={sessionData.module}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Select Module</option>
            {modulesData.map((module) => (
              <option key={module.id} value={module.id}>
                {module.module}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="element" className={labelStyle}>Element</label><br />
          <select
            id="element"
            name="element"
            value={sessionData.element}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Select Element</option>
            {elementData.map((element, index) => (
              <option key={index} value={element}>
                {element}
              </option>
            ))}
          </select>
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
            <option value="GINF2">GINF3</option>
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
        <button type="submit" className='bg-blue-700 hover:bg-blue-800 w-[200px] text-white font-semibold mt-4 p-1 text-center rounded-md'>
          Ajouter
        </button>
      </form>
    </div>
  );
}
