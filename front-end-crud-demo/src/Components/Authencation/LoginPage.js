import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, setUserData} from "../../Actions/userActions";
import {ToastContainer, toast} from 'react-toastify';

const Login = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [user, setUser] = useState({email: "", password: ""});
    const userResult = useSelector(state => state.userData.userResult)

    useEffect(() => {
        if (userResult && userResult.success) {
            navigate("/");
            dispatch(setUserData('userResult', null));
        }
        else if(userResult?.error){
            toast(userResult?.error,{type:'error'});
            dispatch(setUserData('userResult', null));
        }
    }, [userResult]);
    const handleOnChange = (event) => {
        let {name, value} = event.target;
        setUser({...user, [name]: value});
    };
    const handleOnSubmit = async () => {
        dispatch(loginUser(user));
    };
    const handleOnKeyPress = async (e) => {
        if (e.key === "Enter") {
            await handleOnSubmit();
        }
    };
    const {email, password} = user;
    return (
        <>
            <div className='flex justify-center mt-10'>
                <div
                    className="flex w-[500px] h-[500px] bg-[#2d343e] justify-evenly items-center rounded-[5px] flex-col p-8">
                    <h1>Login</h1>
                    <input
                        placeholder="Enter your email"
                        name={"email"}
                        value={email}
                        onChange={(e) => handleOnChange(e)}
                        className="h-[50px] w-[80%] bg-[#404450] rounded-[5px] border-none pl-[10px]"
                    />
                    <input
                        placeholder="Enter your password"
                        type="password"
                        name={"password"}
                        value={password}
                        onChange={(e) => handleOnChange(e)}
                        onKeyPress={(e) => handleOnKeyPress(e)}
                        className="h-[50px] w-[80%] bg-[#404450] rounded-[5px] border-none pl-[10px]"
                    />
                    <button
                        className="w-[100px] pt-[0.5rem] pr-[1rem] pb-[0.5rem] pl-[1rem] border-none bg-[#ffac41] rounded-[5px] text-[black] cursor-pointer"
                        onClick={handleOnSubmit}>Submit
                    </button>
                    <div className="flex flex-col items-start">
                        <Link to="/login" className="text-[blue]">Forgot Password?</Link>
                        If you don't have an account?<Link to="/register" className="text-[blue]">Sign In</Link>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
};
export default Login;
