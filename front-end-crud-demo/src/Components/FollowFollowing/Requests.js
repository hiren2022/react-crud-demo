import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getRequests, updateRequest} from "../../Actions/requestActions";
import {getTokenObject} from "../../Helper/TokenHandler";


const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(state => state.requestData.userRequests);
    useEffect(()=>{
        dispatch(getRequests({type:'user'}))
    },[])
    const handleRequest = (id,status) => {
        dispatch(updateRequest({id:id,status:status}))
    }
    return (
        <>
            <div className='flex justify-evenly items-center rounded-[5px] flex-col p-8'>
                <div className='overflow-x-auto relative"'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">Id</th>
                            <th scope="col" className="py-3 px-6">Content</th>
                            <th scope="col" className="py-3 px-6">Status</th>
                            <th scope="col" className="py-3 px-6">Accept</th>
                            <th scope="col" className="py-3 px-6">Reject</th>
                        </tr>
                        </thead>
                        <tbody>
                        {requests && requests?.data?.length && requests.data.map((ele, index) => (
                            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={index}>
                                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                                <td className="py-4 px-6">{ele?.toUserId}</td>
                                <td className="py-4 px-6">{ele?.status ? 'Active' : 'Inactive'}</td>
                                <td className="py-4 px-6">
                                    <button
                                        className='w-[50px] h-[30px] border-none bg-[green] rounded-[5px] text-[white] cursor-pointer'
                                        onClick={() => handleRequest(ele?._id,'accepted')}>Accept
                                    </button>
                                </td>
                                <td className="py-4 px-6">
                                    <button
                                        className='w-[50px] h-[30px] border-none bg-[red] rounded-[5px] text-[white] cursor-pointer'
                                        onClick={() => handleRequest(ele?._id,'rejected')}>Reject
                                    </button>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};

export default Requests;