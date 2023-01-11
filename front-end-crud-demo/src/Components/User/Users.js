import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../../Actions/userActions";
import {ToastContainer} from "react-toastify";
import {sendRequest, getRequests, setRequest} from "../../Actions/requestActions";
import {getTokenObject} from "../../Helper/TokenHandler";
import './User.css'

const Users = () => {
    const users = useSelector(state => state.userData.users);
    const loading = useSelector(state => state.userData.loading);
    const requests = useSelector(state => state.requestData.requests);
    const requestResult = useSelector(state => state.requestData.requestResult);
    const dispatch = useDispatch();
    let userToken = getTokenObject();
    let ab = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
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
            console.log('filter',filter)
            setUser(filter[0]?.data[0])
            setFilterData([...filter]);
            setData([...item]);
        } else {
            setData([]);
            setFilterData([]);
        }
    },[users]);

    useEffect(()=>{
        let filter = getFilteredData(data);
        setFilterData([...filter]);
    },[searchText]);
    useEffect(() => {
        if (requestResult && requestResult?.success) {
            dispatch(getRequests({type: 'allRequest'}));
            dispatch(getRequests({type:'user'}))
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
    const handleSendRequest = (e, item) => {
        dispatch(sendRequest({toUserId: item?._id, fromUserId: userToken?.user_id}));
    }
    const handleProfile = (e,item) => {
        setUser(item);
    }
    return (
        <>
            <div className='flex justify-center'>Work in progress...</div>
            <ToastContainer/>
        </>
    )
}

export default Users;