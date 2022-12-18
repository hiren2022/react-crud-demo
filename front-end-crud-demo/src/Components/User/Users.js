import React, {useEffect, useState} from 'react';
import {FaHeart, FaFilter, FaSearch} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../../Actions/userActions";
import {ToastContainer} from "react-toastify";
import {sendRequest, getRequests, setRequest} from "../../Actions/requestActions";
import {getTokenObject} from "../../Helper/TokenHandler";


const Users = () => {
    const users = useSelector(state => state.userData.users);
    const requests = useSelector(state => state.requestData.requests);
    const requestResult = useSelector(state => state.requestData.requestResult);
    const dispatch = useDispatch();
    let {user_id} = getTokenObject();
    let ab = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const [data, setData] = useState([]);
    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getRequests({type:'allRequest'}))
    }, []);

    useEffect(() => {
        if (users && users.length) {
            let item = ab.map((ele) => {
                let filter = users.filter((user) => user.name.toLowerCase().startsWith(ele.toLowerCase()));
                return {letter: ele, data: filter};
            });
            setData([...item]);
        } else {
            setData([]);
        }
    }, [users]);

    useEffect(()=>{
        if(requestResult && requestResult?.success){
            dispatch(getRequests({type:'allRequest'}));
            dispatch(setRequest())
        }
    },[requestResult])
    const getRequestStatus = (id) => {
        let status = requests && requests.data && requests.data.find((ele)=> ele?.toUserId === id)?.status;
        let data = 'Follow';
        if(status === 'pending'){
            data = 'Requested';
        }
        else if(status === 'accepted'){
            data = 'Followed';
        }
        else {
            data = 'Follow';
        }
        return data;
    }
    const handleSendRequest = (e,item) => {
        dispatch(sendRequest({toUserId:item?._id,fromUserId:user_id}));
    }
    return (
        <>
            <div className="flex md:flex-row flex-wrap m-4">
                <div className="w-full md:w-1/4 bg-white-500 border text-left">
                    <div className='flex flex-col mb-7 mt-5 px-3'>
                        <div className='text-black font-semibold text-[24px] '>Users</div>
                        <div className='text-gray-600'> Search users of 3000 users</div>
                    </div>
                    <div className='flex flex-row mb-2 px-3'>
                        <div
                            className="w-full md:w-3/4 px-3 mb-6 md:mb-0 relative text-gray-600 focus-within:text-gray-400">
                            <span className="absolute inset-y-3 left-3 flex  pl-2">
                                <FaSearch/>
                            </span>
                            <input
                                className="appearance-none pl-10 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:border-gray-400  focus:bg-white"
                                id="grid-first-name" type="text" placeholder="Search"/>
                        </div>
                        <div className="w-full md:w-1/4 pl-3">
                            <button
                                className="appearance-none block w-75 bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:border-gray-400"
                                id="grid-last-name" type="button"><FaFilter size='20' color={'gray'}/></button>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        {data && data.map((ele, index) => (
                            <React.Fragment key={index}>
                                {ele.data.length ? <>
                                    <div className={`px-3 bg-gray-100 border ${ele.data.length ? '' : 'hidden'}`}>
                                        {ele.letter}
                                    </div>
                                    {ele.data.map((item, id) => (
                                        <div className="flex p-4 justify-between" key={id}>
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
                                                    <button onClick={(e)=> handleSendRequest(e,item)}
                                                            disabled={getRequestStatus(item?._id) !== 'Follow'}
                                                        className={`appearance-none block w-75 text-blue-700 rounded py-2 px-4 leading-tight ${getRequestStatus(item?._id) === 'Followed' ? '':'bg-gray-200 focus:border-gray-400 border border-gray-200'}`}
                                                        id="grid-last-name" type="button">{getRequestStatus(item?._id)}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </> : null}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-3/4 bg-gray-400 p-4 text-center text-gray-700">Development Pending</div>
            </div>
            <ToastContainer/>
        </>
    )
}

export default Users;