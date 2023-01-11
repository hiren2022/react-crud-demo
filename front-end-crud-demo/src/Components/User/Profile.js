import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../Actions/userActions";
import {useParams} from "react-router-dom";
import {getTokenObject} from "../../Helper/TokenHandler";
import PersonalDetail from "./PersonalDetail";
import Followers from "./Followers";
import {getFollowers, getRequests, sendRequest, updateRequest} from "../../Actions/requestActions";

const Profile = () => {
    const [user, setUser] = useState({});
    const {id} = useParams();
    let userToken = getTokenObject();
    let userData = userToken?._doc;
    const dispatch = useDispatch();
    const profile = useSelector(state => state.userData.profile);
    const loading = useSelector(state => state.userData.loading);
    const requests = useSelector(state => state.requestData.requests);
    const [active, setActive] = useState('Profile');
    console.log('active',active)
    const tabs = ['Profile','Followers','Followings'];
    useEffect(()=>{
        if(id){
            dispatch(getProfile({id:id}));
            dispatch(getRequests({type: 'allRequest'}));
            dispatch(getFollowers({state:'followers',id: id}));
            dispatch(getFollowers({state:'followings',id: id}));
        }
    },[id]);
    useEffect(()=>{
        if(profile){
            setUser({...profile});
        }
    },[profile]);
    const renderUserDetails = () => {
        switch (active) {
            case 'Followings':
                return <Followers user={user} type={'followings'} setActive={setActive}/>;
            case 'Followers':
                return <Followers user={user} type={'followers'} setActive={setActive} />;
            case 'Profile':
            default:
                return <PersonalDetail user={user}/>;
        }
    }
    const handleButton = (e,item,status) => {
        e.stopPropagation();
        if(userToken?.user_id === id ){

        }
        else if(status === 'Follow'){
            dispatch(sendRequest({toUserId: item?._id, fromUserId: userToken?.user_id}));
        }
        else if(status === 'Requested'){
            let req = requests && requests.data && requests.data.filter(ele => ele?.fromUserId === userToken?.user_id).find((ele)=> ele?.toUserId === item?._id);
            if(req){
                dispatch(updateRequest({id:req?._id,status:status}));
            }
        }
    }
    const getRequestStatus = ({_id}) => {
        let status = requests && requests.data && requests.data.find((ele) => ele?.toUserId === _id)?.status;
        let data = 'Follow';
        if (status === 'pending') {
            data = 'Requested';
        }
        return data;
    }
    return (
        <>
            <div className="flex justify-center m-4">
                <div className="w-full md:w-full min-[375px]:w-[345px] min-[540px]:w-full min-[280px]:w-[250px]">
                    {(user) ? <><div className="cover-photo w-full h-[200px] min-[280px]:h-[200px] rounded-tr-lg rounded-tl-lg"/>
                        <div className="absolute top-[100px] md:top-[195px] xl:top-[195px] lg:top-[195px] sm:top-[195px] sm:left-[100px] md:left-[100px] min-[280px]:left-[50px] lg:left-[200px] min-[320px]:left-[180px] min-[540px]:left-[230px]  min-[320px]:top-[100px] min-[375px]:left-[70px] justify-center text-center xl:left-[180px] left-[200px] ">
                            <div className='bg-white rounded-[100px] p-[3px]'><img className="h-[200px] min-[280px]:h-[150px] min-[280px]:w-[150px] w-[200px] rounded-full"
                                                                                   src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                                   alt=""/>
                            </div>
                            <div className='font-bold mt-6 text-[24px]'>
                                {user?.name}
                            </div>
                        </div>
                        <div className="w-full bg-white border px-4 pt-4">
                            <div className='row flex h-[60px] md:mt-4 sm:mt-4 sm:justify-end md:justify-end '>
                                <div className='mx-4 min-[280px]:mx-2'>
                                    <button onClick={(e)=>handleButton(e, user,getRequestStatus(user))}
                                        className='bg-white border border-grey rounded-[6px] h-[40px] w-[150px] text-black-400'>{userToken?.user_id === id ? "Edit Profile":getRequestStatus(user)}
                                    </button>
                                </div>
                                <div className='mx-4'>
                                    <button
                                        className='bg-white border border-gray rounded-[6px] h-[40px] w-[100px] text-black-400'>Call
                                    </button>
                                </div>
                            </div>
                            <div className='row flex mt-[80px] px-5 justify-start'>
                                {tabs.map((tab,index)=>(
                                    <div key={index} onClick={()=> setActive(tab)}
                                         className={`mx-5 font-semibold pb-[11px] cursor-pointer px-2 hover:border-indigo-300 ${active === tab ? 'border-b-4 border-indigo-300' : ''}`}>{tab}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {renderUserDetails()}</>:
                        <></>}

                </div>
            </div>
        </>
    )
}
export default Profile;