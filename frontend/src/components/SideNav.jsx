import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/auth/usersApiSlice';
import { logout } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';


const liStyle = 'mb-1 flex items-center hover:bg-gray-300 rounded-md px-2 py-2 mt-2 cursor-pointer';

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
    <div className='w-[18%] h-screen p-4 bg-slate-200 shadow-md rounded-r-md sticky top-[50px] '>
      <div>
        <h3 className='text-gray-400 font-bold'>Tableau De Bord</h3>
        <ul className='py-2 px-5'>
          <Link to='/' className={liStyle}>
            <HomeOutlinedIcon className='text-gray-400 mr-2 !important' />
            <p >Accueil</p>
          </Link>
          <Link to='/users' className={liStyle}>
            <PersonOutlineIcon className='text-gray-400 mr-2 !important' />
            <p >Étudiants</p>
          </Link>
          <Link to='/newuser' className={liStyle}>
            <PersonOutlineIcon className='text-gray-400 mr-2 !important' />
            <p >Add Student </p>
          </Link>
          <Link to='/newsession' className={liStyle}>
            <PersonOutlineIcon className='text-gray-400 mr-2 !important' />
            <p >Add Session </p>
          </Link>
          <li onClick={clickHandler} className={liStyle}>
            <FeedbackIcon className='text-gray-400 mr-2 !important' />
            <div >Se déconnecter</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
