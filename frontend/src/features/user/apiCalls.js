
import { publicRequest } from "../../api/requestMethod";

import { loginStart,loginError,loginSucces } from "./userSlice";



export const login = async (dispatch, user )=>{
    dispatch(loginStart());
    try{
       const res = await publicRequest.post('login',user);
        dispatch(loginSucces(res.data));
    }catch(error)
    {
        dispatch(loginError());
    }
}