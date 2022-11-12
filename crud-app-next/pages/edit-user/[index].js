import React from 'react'
import AddUser from "../../Components/User/AddUser";
import {useRouter} from "next/router";



const UserAdd = () => {
    const router = useRouter()
    const {index}  = router.query
    return (
        <AddUser params={{id:index}}/>
    )
}

export default UserAdd;