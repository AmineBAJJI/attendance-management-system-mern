import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/auth/usersApiSlice';
import { logout } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const liStyle = 'mb-1 flex items-center hover:bg-gray-200 rounded-md px-2 py-1 cursor-pointer';

export default function SideNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall]= useLogoutMutation();
  

  const clickHandler = async () => {
    try {
      await logoutApiCall();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className='w-[18%] h-screen p-4 bg-slate-100 shadow-md rounded-r-md sticky top-[50px] '>
      <div>
        <h3 className='text-gray-400 font-bold'>tableau de bord</h3>
        <ul className='py-2 px-5'>
          <li className={liStyle}>
            <HomeOutlinedIcon className='text-gray-400 mr-2 !important' />
            <Link to='/'>Accueil</Link>
          </li>
          <li className={liStyle}>
            <PersonOutlineIcon className='text-gray-400 mr-2 !important' />
            <Link to='/users'>Étudiants</Link>
          </li>
          <li className={liStyle}>
            <FeedbackIcon className='text-gray-400 mr-2 !important' />
            <div onClick={clickHandler}>Se déconnecter</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
