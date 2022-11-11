import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {htpDelete, htpGet} from "../../Helper/api";



const Users = () => {
    let navigate = useNavigate()
    const [users,setUsers] = useState(null)
    const getAllUsers = async ()=>{
        let resp = await htpGet('/user/all')
        if(resp.data && resp.data.length){
            setUsers([...resp.data])
        }
    }
    useEffect(()=>{
        getAllUsers()
    },[])

    const handleOnDelete = async (id) => {
        let resp = await htpDelete(`/user/delete/${id}`)
        if(resp && resp.success){
            getAllUsers()
        }
    }
    const handleOnEdit = async (id) => {
        console.log('id',id)
        navigate(`/edit-user/${id}`)
    }
    return (
        <>
            <div>
                <div>
                    <button onClick={(e)=> {navigate('/add-user')}}>Add User</button>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Gender</th>
                        <th>Hobby</th>
                        <th>Color</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users && users.length && users.map((ele,index)=> (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{ele?.name}</td>
                            <td>{ele?.email}</td>
                            <td>{ele?.contact}</td>
                            <td>{ele?.gender}</td>
                            <td>{ele?.hobby.join(',')}</td>
                            <td>{ele?.color}</td>
                            <td><button onClick={()=> handleOnEdit(ele?._id)}>Edit</button></td>
                            <td><button onClick={()=> handleOnDelete(ele?._id)}>Delete</button></td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Users;