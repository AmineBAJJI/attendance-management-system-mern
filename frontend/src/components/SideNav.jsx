import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/auth/usersApiSlice';
import { logout } from '../features/auth/authSlice';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useDispatch ,useSelector} from 'react-redux';


const liStyle = 'mb-1 flex items-center hover:bg-gray-300 rounded-md px-2 py-2 mt-2 cursor-pointer';

export default function SideNav() {
  const userInfo = useSelector(state=>state.auth).userInfo.user;
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
            <HomeIcon className='text-gray-400 mr-2 !important' />
            <p >Accueil</p>
          </Link>
          {userInfo.email !=='chaimae@gmail.com' && <div>
          <Link to='/users' className={liStyle}>
            <PersonIcon className='text-gray-400 mr-2 !important' />
            <p >Étudiants</p>
          </Link>
          {userInfo.email =='hassan@gmail.com' &&
          <Link to='/usersfiled' className={liStyle}>
          <BarChartIcon className='text-gray-400 mr-2 !important' />
          <p >Suivre l'absence </p>
        </Link>
        }
          </div> }
          { userInfo.email =='chaimae@gmail.com' && <div>
            <Link to='/jusifieabs' className={liStyle}>
            < PostAddIcon className='text-gray-400 mr-2 !important' />
            <p > Justifier l'absence </p>
          </Link>
          <Link to='/newuser' className={liStyle}>
            <PersonAddIcon className='text-gray-400 mr-2 !important' />
            <p >Ajouter un(e) étudiant(e) </p>
          </Link>
          <Link to='/newsession' className={liStyle}>
            <CalendarMonthIcon className='text-gray-400 mr-2 !important' />
            <p > Ajouter une session </p>
          </Link>
        </div>}
          
          
          <li onClick={clickHandler} className={liStyle}>
            <FeedbackIcon className='text-gray-400 mr-2 !important' />
            <div >Se déconnecter</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
