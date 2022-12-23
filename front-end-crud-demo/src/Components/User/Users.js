import React, {useEffect, useState} from 'react';
import { FaSearch} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../../Actions/userActions";
import {ToastContainer} from "react-toastify";
import {sendRequest, getRequests, setRequest} from "../../Actions/requestActions";
import {getTokenObject} from "../../Helper/TokenHandler";
import './User.css'

const Users = () => {
    const users = useSelector(state => state.userData.users);
    const requests = useSelector(state => state.requestData.requests);
    const requestResult = useSelector(state => state.requestData.requestResult);
    const dispatch = useDispatch();
    let userToken = getTokenObject();
    let ab = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const [data, setData] = useState([
        // {letter:'A',data:[
        //         {name:'Akhil Bhuva',userName:'akhil_bhuva',followers:[]},
        //         {name:'Alpesh Bhuva',userName:'akhil_bhuva',followers:[]},
        //         {name:'Ashish Bhuva',userName:'akhil_bhuva',followers:[]},
        //         {name:'Bhuva',userName:'akhil_bhuva',followers:[]},
        //         {name:'Bhuva',userName:'akhil_bhuva',followers:[]},
        //         {name:'Ashwin Bhuva',userName:'akhil_bhuva',followers:[]},
        //     ]},
        // {letter:'B',data:[
        //         {name:'Bhuva Hiren',userName:'hiren_bhuva',followers:[]},
        //         {name:'Buha Hiren',userName:'hiren_bhuva',followers:[]},
        //         {name:'Bhu Hiren',userName:'hiren_bhuva',followers:[]},
        //         {name:'Bhavik Hirepara',userName:'hiren_bhuva',followers:[]},
        //     ]},
        // {letter:'C',data:[
        //         {name:'Bhuva Hiren',userName:'hiren_bhuva',followers:[]},
        //         {name:'Bhuva Hiren',userName:'hiren_bhuva',followers:[]},
        //         {name:'Bhuva Hiren',userName:'hiren_bhuva',followers:[]},
        //         {name:'Bhuva Hiren',userName:'hiren_bhuva',followers:[]},
        //     ]},
    ]);
    const [filterData, setFilterData] = useState([
        // {letter:'A',data:[
        //         {name:'Akhil Bhuva',userName:'akhil_bhuva',followers:[]},
        //         {name:'Alpesh Bhuva',userName:'akhil_bhuva',followers:[]},
        //         {name:'Ashish Bhuva',userName:'akhil_bhuva',followers:[]},
        //         {name:'Bhuva',userName:'akhil_bhuva',followers:[]},
        //         {name:'Bhuva',userName:'akhil_bhuva',followers:[]},
        //         {name:'Ashwin Bhuva',userName:'akhil_bhuva',followers:[]},
        //     ]},
        // {letter:'B',data:[
        //         {name:'Bhuva Hiren',userName:'hiren_bhuva',followers:[]},
        //         {name:'Buha Hiren',userName:'hiren_bhuva',followers:[]},
        //         {name:'Bhu Hiren',userName:'hiren_bhuva',followers:[]},
        //         {name:'Bhavik Hirepara',userName:'hiren_bhuva',followers:[]},
        //     ]},
        // {letter:'C',data:[
        //         {name:'Bhuva Hiren',userName:'hiren_bhuva',followers:[]},
        //         {name:'Bhuva Hiren',userName:'hiren_bhuva',followers:[]},
        //         {name:'Bhuva Hiren',userName:'hiren_bhuva',followers:[]},
        //         {name:'Bhuva Hiren',userName:'hiren_bhuva',followers:[]},
        //     ]},
    ]);
    const [active, setActive] = useState('Profile');
    const [searchText, setSearchText] = useState('');
    const [user, setUser] = useState({});
    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getRequests({type: 'allRequest'}))
    }, []);

    useEffect(() => {
        if (users && users.length) {
            let item = ab.map((ele) => {
                let filter = users.filter((user) => user.name.toLowerCase().startsWith(ele.toLowerCase()));
                if(filter.length){
                    return {letter: ele, data: filter};
                }
            }).filter(ele => ele);
            let filter = getFilteredData(item);
            setUser(filter[0]?.data[0])
            setFilterData([...filter]);
            setData([...item]);
        } else {
            setData([]);
            setFilterData([]);
        }
    }, [users]);
    useEffect(()=>{
        let filter = getFilteredData(data);
        setFilterData([...filter]);
    },[searchText]);
    useEffect(() => {
        if (requestResult && requestResult?.success) {
            dispatch(getRequests({type: 'allRequest'}));
            dispatch(setRequest())
        }
    }, [requestResult]);

    const getFilteredData = (data) => {
        let result = data;
        if(searchText){
            result = result.filter((item)=> {
                if(item.letter.toLowerCase() === searchText[0].toLowerCase()){
                    let data = item.data.filter((ele)=>{
                        return ele.name.toLowerCase().includes(searchText.toLowerCase())
                    });
                    return {...item,data:data}
                }
            });
        }
        return result;
    }
    const getRequestStatus = ({_id, followers}) => {
        let status = requests && requests.data && requests.data.find((ele) => ele?.toUserId === _id)?.status;
        let data = 'Follow';
        if (status === 'pending') {
            data = 'Requested';
        } else if (followers.includes(userToken?.user_id)) {
            data = 'Followed';
        } else {
            data = 'Follow';
        }
        return data;
    }
    const handleSendRequest = (e, item) => {
        dispatch(sendRequest({toUserId: item?._id, fromUserId: userToken?.user_id}));
    }
    const handleProfile = (e,item) => {
        setUser(item);
    }
    return (
        <>
            <div className="flex md:flex-row flex-wrap m-4">
                <div className="w-full md:w-1/4 bg-white-500 border text-left rounded-tl-lg rounded-bl-lg">
                    <div className='flex flex-col mb-7 mt-5 px-3 ml-3'>
                        <div className='text-black font-semibold text-[24px] '>Users</div>
                        <div className='text-gray-600'> Search users of 3000 users</div>
                    </div>
                    <div className='flex flex-row mb-2 px-3'>
                        <div
                            className="w-full md:w-4/4 px-3 mb-6 md:mb-0 relative text-gray-600 focus-within:text-gray-400">
                            <span className="absolute inset-y-3 left-3 flex  pl-2">
                                <FaSearch/>
                            </span>
                            <input
                                className="appearance-none pl-10 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:border-gray-400  focus:bg-white"
                                id="grid-first-name" value={searchText} onChange={(e)=> setSearchText(e.target.value)}  type="text" placeholder="Search"/>
                        </div>
                        {/*<div className="w-full md:w-1/4 pl-3">*/}
                        {/*    <button*/}
                        {/*        className="appearance-none block w-75 bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:border-gray-400"*/}
                        {/*        id="grid-last-name" type="button"><FaFilter size='20' color={'gray'}/></button>*/}
                        {/*</div>*/}
                    </div>
                    <div className='flex flex-col max-h-[477px] overflow-y-auto'>
                        {filterData && filterData.map((ele, index) => (
                            <React.Fragment key={index}>
                                <div className={`px-3 bg-gray-100 border z-40 sticky top-0 ${ele.data.length ? '' : 'hidden'}`}>
                                    {ele.letter}
                                </div>
                                {ele.data.map((item, id) => (
                                    <div className="flex p-4 border justify-between cursor-pointer hover:bg-gray-200" key={id} onClick={(e)=> handleProfile(e,item)}>
                                        <div className='flex justify-between'>
                                            <div className="mt-1">
                                                <img className="h-10 w-10 rounded-full"
                                                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                     alt=""/>
                                            </div>
                                            <div className="ml-4">
                                                <div
                                                    className="w-full mb-6 md:mb-0 relative text-gray-600 focus-within:text-gray-400">
                                                    <div className='font-semibold '>
                                                        {item?.name}
                                                    </div>
                                                    <div className='text-gray-500'>
                                                        {item?.userName}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mt-1">
                                                <button onClick={(e) => handleSendRequest(e, item)}
                                                        disabled={getRequestStatus(item) !== 'Follow'}
                                                        className={`appearance-none block w-75 text-blue-700 rounded py-2 px-4 leading-tight ${getRequestStatus(item) === 'Followed' ? '' : 'bg-gray-200 focus:border-gray-400 border border-gray-200'}`}
                                                        id="grid-last-name" type="button">{getRequestStatus(item)}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-3/4 ">
                    <div className="cover-photo w-full h-[200px] rounded-tr-lg"/>
                    <div className="absolute top-[180px] justify-center text-center left-[500px] bg-white rounded-[100px] p-[3px]">
                        <img className="h-[200px] w-[200px] rounded-full"
                             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                             alt=""/>
                        <div className='font-bold mt-6 text-[24px]'>
                            {user?.name}
                        </div>
                    </div>
                    <div className="w-full bg-white border px-4 pt-4">
                        <div className='row flex h-[60px] mt-4 justify-end'>
                            <div className='mx-4'>
                                <button
                                    className='bg-white border border-grey rounded-[6px] h-[40px] w-[150px] text-black-400'>Message
                                </button>
                            </div>
                            <div className='mx-4'>
                                <button
                                    className='bg-white border border-gray rounded-[6px] h-[40px] w-[100px] text-black-400'>Call
                                </button>
                            </div>
                        </div>
                        <div className='row flex mt-[80px] px-5 justify-start'>
                            <div onClick={()=> setActive('profile')}
                                className={`mx-5 font-semibold pb-[11px] cursor-pointer px-2 hover:border-indigo-300 ${active === 'Profile' ? 'border-b-2 border-indigo-300' : ''}`}>Profile
                            </div>
                            {/*<div className={`mx-5 pb-[8px] hover:border-indigo-300 ${active === 'Profile'?'border-b-4 border-indigo-300':''}`}>Profile</div>*/}
                            {/*<div className={`mx-5 pb-[8px] hover:border-indigo-300 ${active === 'Profile'?'border-b-4 border-indigo-300':''}`}>Profile</div>*/}
                        </div>
                    </div>
                    <div className="w-full bg-white border px-4 py-2 justify-start rounded-br-lg">
                        <div className='flex'>
                            <div className='col ml-7'>
                                <div className='mx-4 my-4'>
                                    <div className='text-gray-400'>User Name</div>
                                    <div>{user?.userName}</div>
                                </div>
                                <div className='mx-4 my-4'>
                                    <div className='text-gray-400'>Phone</div>
                                    <div>{user?.contact}</div>
                                </div>
                            </div>
                            <div className='col ml-7'>
                                <div className='mx-4 my-4'>
                                    <div className='text-gray-400'>Email</div>
                                    <div>{user?.email}</div>
                                </div>
                                <div className='mx-4 my-4'>
                                    <div className='text-gray-400'>Birth Date</div>
                                    <div>{new Date(user?.birthDate).toLocaleString('default', { month: 'long' })} {new Date(user?.birthDate).getDate()}, {new Date(user?.birthDate).getFullYear()}</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='ml-7'>
                                <div className='mx-4'>
                                    <div className='text-gray-400'>About</div>
                                    <div>Lorem EnspumLorem EnspumLorem EnspumLorem EnspumLorem EnspumLorem EnspumLorem EnspumLorem EnspumLorem EnspumLorem EnspumLorem EnspumLorem EnspumLorem EnspumLorem EnspumLorem EnspumLorem EnspumLorem EnspumLorem EnspumLorem Enspum</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer/>
        </>
    )
}

export default Users;