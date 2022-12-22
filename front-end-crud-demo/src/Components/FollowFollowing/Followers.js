import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFollowers, getRequests, updateRequest} from "../../Actions/requestActions";
import {getTokenObject} from "../../Helper/TokenHandler";
import Table from "../Table";


const Followers = () => {
    const dispatch = useDispatch();
    const followers = useSelector(state => state.requestData.followers);
    const requestResult = useSelector(state => state.requestData.requestResult);
    const [rowData,setRowData] = useState([]);
    // console.log('requests',followers)
    const headers = ['id','name','userName','remove'];
    const getButton = (id,status,text,color) => {
        return <button
            className={`w-[50px] h-[30px] border-none bg-[${color}] rounded-[5px] text-[white] cursor-pointer`}
            onClick={() => handleRequest(id, status)}>{text}
        </button>
    }
    useEffect(()=>{
        dispatch(getFollowers({type:'user',state:'followers'}))
    },[]);
    useEffect(()=>{
        if(followers && followers.data && followers.data.length){
            let data = followers.data.map((ele,index)=>{
                return {
                    ...ele,
                    id: index + 1,
                    remove:getButton(ele?._id,'remove','Remove','red'),
                }
            });
            setRowData([...data]);
        }
        else {
            setRowData([]);
        }
    },[followers])
    const handleRequest = (id,status) => {
        // dispatch(updateRequest({id:id,status:status}))
    }
    return (
        <>
            <div className='flex justify-evenly items-center rounded-[5px] flex-col p-8'>
                <div className='overflow-x-auto relative"'>
                    <Table headers={headers} rowData={rowData}/>
                </div>
            </div>
        </>
    )
};

export default Followers;