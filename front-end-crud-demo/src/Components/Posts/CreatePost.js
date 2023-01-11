import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import { MentionsInput, Mention } from 'react-mentions'
import {getAllUsers} from "../../Actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import {createPost} from "../../Actions/postActions";
import {getTokenObject} from "../../Helper/TokenHandler";

const CreatePost = () => {
    const dispatch = useDispatch();
    let userToken = getTokenObject();
    const users = useSelector(state => state.userData.users);
    const [mentionUsers,setMentionUsers] = useState([]);
    const [file,setFile] = useState({});
    const [post,setPost] = useState({
        content:'',
        title:'',
        imageUrl:'',
        likes:[],
        hashTags:[],
        comments:[],
        // mentions:[],
    });
    const [mentions,setMentions] =  useState('');
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getAllUsers())
    }, []);
    useEffect(() => {
        if(users && users.length){
            let item = users.map((ele)=>{
                return {id:'@' + ele?.userName,display:'@' + ele?.userName};
            });
            setMentionUsers([...item]);
        }
    }, [users]);
    const handleChange = (e) => {
        let {name,value,checked} = e.target
        if(name === 'hobby'){
            if(checked && !post.hobby.includes(value)){
                post.hobby.push(value);
                setPost({...post})
            }
            else {
                let index = post.hobby.indexOf(value)
                post.hobby.splice(index,1);
                setPost({...post})
            }
        }
        if(name === 'imageUrl'){
            setPost({...post,[name]:e.target.files[0]?.name});
            setFile(e.target.files[0]);
        }
        else{
            setPost({...post,[name]: value})
        }
    };
    const handleMentions = (e,data,value) => {
        if(value !== "@"){
            setMentions(e.target.value);
        }
        else {
            setMentions(e.target.value);
        }
    };
    const handleCreate = async (e) => {
        const time = new Date().toISOString();
        dispatch(createPost({...post,createdTime:time,updatedTime: time,createdBy: userToken?.user_id}))
    };
    let {title,imageUrl,content,hashTags} = post;
    return (
        <>
            <div className='flex justify-evenly items-center rounded-[5px] flex-col p-8'>
                <div className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full  px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-first-name">
                                Title
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                   id="grid-first-name" type="text" name='title' value={title} onChange={(e)=> handleChange(e)} placeholder="Title"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-password">
                                Content
                            </label>
                            <textarea
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name='content' value={content} onChange={(e)=> handleChange(e)}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-password">
                                Image
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-password" name='imageUrl' type="file" onChange={(e)=> handleChange(e)} placeholder="Contact"/>
                        </div>
                    </div>
                    {/*<div className="flex flex-wrap -mx-3 mb-6">*/}
                    {/*    <div className="w-full px-3">*/}
                    {/*        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"*/}
                    {/*               htmlFor="grid-password">*/}
                    {/*            Mentions*/}
                    {/*        </label>*/}
                    {/*        <div>*/}
                    {/*            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{'tag'}</span>*/}
                    {/*        </div>*/}
                    {/*        <MentionsInput value={mentions} onChange={(e,data,value)=>{ handleMentions(e,data,value)}} className={'h-[40px]'}>*/}
                    {/*            <Mention*/}
                    {/*                trigger="@"*/}
                    {/*                data={mentionUsers}*/}
                    {/*                markup={'@[display](__id__)'}*/}
                    {/*                appendSpaceOnAdd={true}*/}
                    {/*                style={{*/}
                    {/*                    backgroundColor: "#00ffff",*/}
                    {/*                    borderRadius:'5px',*/}
                    {/*                }}*/}
                    {/*                onAdd={(id)=>{*/}
                    {/*                    setMentionUsers([...mentionUsers.filter(ele => ele.id !== id)]);*/}
                    {/*                    let value = id.slice(1);*/}
                    {/*                    setPost({...post,mentions:[...post.mentions,value]});*/}
                    {/*                }}*/}
                    {/*            />*/}
                    {/*            <Mention*/}
                    {/*                trigger="#"*/}
                    {/*                data={[{id:'Hiren Bhuva'}]}*/}
                    {/*            />*/}
                    {/*        </MentionsInput>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div onClick={(e)=> {handleCreate(e)}} className='w-[100%] text-center pt-[0.5rem] pr-[1rem] pb-[0.5rem] pl-[1rem] mb-2 border-none bg-[#ffac41] rounded-[5px] text-[black] cursor-pointer'>
                        <button>Create</button>
                    </div>
                    <div onClick={(e)=> {navigate('/')}} className='w-[100%] text-center pt-[0.5rem] pr-[1rem] pb-[0.5rem] pl-[1rem] mb-2 border border-[red] rounded-[5px] text-[black] cursor-pointer'>
                        <button>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreatePost;