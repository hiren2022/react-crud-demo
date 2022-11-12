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
        else {
            setUsers(null)
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
        navigate(`/edit-user/${id}`)
    }
    return (
        <div className='flex justify-evenly items-center rounded-[5px] flex-col p-8'>
            <div onClick={(e)=> {navigate('/add-user')}} className='w-[50%] text-center pt-[0.5rem] pr-[1rem] pb-[0.5rem] pl-[1rem] mb-2 border-none bg-[#ffac41] rounded-[5px] text-[black] cursor-pointer'>
                <button>Add User</button>
            </div>
            <div className='overflow-x-auto relative"'>
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">Id</th>
                        <th scope="col" className="py-3 px-6">Name</th>
                        <th scope="col" className="py-3 px-6">Email</th>
                        <th scope="col" className="py-3 px-6">Contact</th>
                        <th scope="col" className="py-3 px-6">Gender</th>
                        <th scope="col" className="py-3 px-6">Hobby</th>
                        <th scope="col" className="py-3 px-6">State</th>
                        <th scope="col" className="py-3 px-6">Color</th>
                        <th scope="col" className="py-3 px-6">Edit</th>
                        <th scope="col" className="py-3 px-6">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users && users.length && users.map((ele,index)=> (
                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={index}>
                            <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                            <td className="py-4 px-6">{ele?.name}</td>
                            <td className="py-4 px-6">{ele?.email}</td>
                            <td className="py-4 px-6">{ele?.contact}</td>
                            <td className="py-4 px-6">{ele?.gender}</td>
                            <td className="py-4 px-6">{ele?.hobby.join(',')}</td>
                            <td className="py-4 px-6">{ele?.state}</td>
                            <td className="py-4 px-6">{ele?.color}</td>
                            <td className="py-4 px-6"><button className='w-[50px] h-[30px] border-none bg-[green] rounded-[5px] text-[white] cursor-pointer' onClick={()=> handleOnEdit(ele?._id)}>Edit</button></td>
                            <td className="py-4 px-6"><button className='w-[50px] h-[30px] border-none bg-[red] rounded-[5px] text-[white] cursor-pointer' onClick={()=> handleOnDelete(ele?._id)}>Delete</button></td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users;