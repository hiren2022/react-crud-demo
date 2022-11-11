import React, {useEffect, useState} from 'react';
import {htpGet, htpPost} from "../../Helper/api";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";




const AddUser = () => {
    const [user,setUser] = useState({
        name:'',
        email:'',
        contact:'',
        gender:'',
        hobby:[],
        color:''
    })
    const navigate = useNavigate()
    const params = useParams()
    const getUserById = async (id) => {
        let resp = await htpGet(`/user/get/${id}`)
        if(resp && resp.success){
            setUser({...resp.data[0]})
        }
    }
    useEffect(()=>{
        if(params && params.id){
            getUserById(params.id)
        }
    },[params])
    const handleChange = (e) => {
        let {name,value,checked} = e.target
        if(name === 'hobby'){
            if(checked && !user.hobby.includes(value)){
                user.hobby.push(value)
                setUser({...user})
            }
            else {
                let index = user.hobby.indexOf(value)
                user.hobby.splice(index,1)
                setUser({...user})
            }
        }
        else{
            setUser({...user,[name]: value})
        }
    }
    const handleCreate = async (e) => {
        let type = (params && params.id) ? '/user/update': '/user/create';
        let resp = await htpPost(type,user)
        if(resp.status === 201){
            navigate('/')
        }
    }
    let {name,email,contact,gender,hobby,color} = user;
    return (
        <>
            <div>
                <div>
                    Add User
                </div>
                <div>
                    <div>
                        <label>Name:-</label>
                        <input type='text' name='name' value={name} onChange={(e)=> {handleChange(e)}}/>
                    </div>
                    <div>
                        <label>Email:-</label>
                        <input type='text' name='email' value={email} onChange={(e)=> {handleChange(e)}}/>
                    </div>
                    <div>
                        <label>Contact:-</label>
                        <input type='text' name='contact' value={contact} onChange={(e)=> {handleChange(e)}}/>
                    </div>
                    <div>
                        <label>Gender:-</label>
                        <input type='radio' name='gender' value='Male' checked={gender === 'Male'}  onChange={(e)=> {handleChange(e)}}/>Male
                        <input type='radio' name='gender' value='Female' checked={gender === 'Female'}  onChange={(e)=> {handleChange(e)}}/>Female
                    </div>
                    <div>
                        <label>Hobby:-</label>
                        <input type='checkbox' name='hobby' checked={hobby.includes('Reading')}  value='Reading' onChange={(e)=> {handleChange(e)}}/>Reading
                        <input type='checkbox' name='hobby' checked={hobby.includes('Programming')}  value='Programming' onChange={(e)=> {handleChange(e)}}/>Programming
                        <input type='checkbox' name='hobby' checked={hobby.includes('Riding')}  value='Riding' onChange={(e)=> {handleChange(e)}}/>Riding
                        <input type='checkbox' name='hobby' checked={hobby.includes('Coding')}  value='Coding' onChange={(e)=> {handleChange(e)}}/>Coding
                    </div>
                    <div>
                        <label>Favorite Color:-</label>
                        <input type='color' name='color' value={color} onChange={(e)=> {handleChange(e)}}/>
                    </div>
                    <div>
                        <input type='button' value='Create' onClick={(e)=> {handleCreate(e)}}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddUser;