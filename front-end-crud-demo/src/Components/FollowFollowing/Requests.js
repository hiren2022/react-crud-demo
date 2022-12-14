import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getRequests, updateRequest} from "../../Actions/requestActions";
import {getTokenObject} from "../../Helper/TokenHandler";
import Table from "../Table";


const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(state => state.requestData.userRequests);
    const requestResult = useSelector(state => state.requestData.requestResult);
    const [rowData,setRowData] = useState([]);
    const headers = ['id','content','accept','reject'];
    const getButton = (id,status,text,color) => {
        return <button
            className={`w-[50px] h-[30px] border-none bg-[${color}] rounded-[5px] text-[white] cursor-pointer`}
            onClick={() => handleRequest(id, status)}>{text}
        </button>
    }
    useEffect(()=>{
        if(requests && requests.data && requests.data.length){
            let data = requests.data.map((ele,index)=>{
                return {
                    ...ele,
                    id: index + 1,
                    accept:getButton(ele?._id,'accepted','Accept','green'),
                    reject:getButton(ele?._id,'rejected','Reject','red'),
                }
            });
            setRowData([...data]);
        }
        else {
            setRowData([]);
        }
    },[requests])
    const handleRequest = (id,status) => {
        dispatch(updateRequest({id:id,status:status}))
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

export default Requests;