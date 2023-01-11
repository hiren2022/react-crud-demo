import React, {useEffect, useState} from 'react';
import {SlCalender} from 'react-icons/sl';
import {BsHandThumbsUp,BsHandThumbsUpFill, BsShare} from 'react-icons/bs';
import {TfiComment} from 'react-icons/tfi';
import {useDispatch, useSelector} from "react-redux";
import {createLike, getAllPost} from "../../Actions/postActions";
import {getTokenObject} from "../../Helper/TokenHandler";


const BlogPage = () => {
    const dispatch = useDispatch();
    let userToken = getTokenObject();
    const posts = useSelector(state => state.postData.posts);
    const [blog, setBlog] = useState([]);
    const [like, setLike] = useState(false);
    useEffect(()=>{
        if(posts && posts.length){
            setBlog([...posts]);
        }
        else {
            setBlog([]);
        }
    },[posts])
    useEffect(()=> {
        dispatch(getAllPost());
    },[]);
    const handleCreateLike = (id) => {
        dispatch(createLike({ "postId":id, "likeBy":userToken?.user_id}))
    }
    return (
        <>
            <div className=''>
                {blog.map((ele,index) => (
                    <div className="flex mx-[200px] my-10 rounded overflow-hidden border-[grey] border-[2px] shadow-lg" key={index}>
                        <div className='w-1/3'><img className="w-full"
                                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt="Sunset in the mountains"/></div>
                        <div className='4/3'>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{ele?.title}</div>
                                <p className="text-gray-700 text-base">
                                    {ele?.content}
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                {ele?.hashTags.length ? ele.hashTags.map((tag,id) => (<span key={id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>)):null}
                            </div>
                            <div className="flex items-center mb-3 flex-wrap">
                                <div className="flex mx-4 items-center font-bold cursor-pointer" onClick={()=> handleCreateLike(ele?._id)}>{ele?.likes.includes(userToken?.user_id) ? <BsHandThumbsUpFill/>:<BsHandThumbsUp/>}&nbsp;&nbsp;{ele?.likes.length} likes</div>
                                <div className="flex mx-4 items-center font-bold"><TfiComment/>&nbsp;&nbsp;{ele?.comments.length} comments</div>
                                <div className="flex mx-4 items-center font-bold"><BsShare/>&nbsp;&nbsp;share</div>
                                <div className="flex mx-4 items-center"><SlCalender/>&nbsp;&nbsp;{ele?.createdTime}</div>
                            </div>
                        </div>
                    </div>))}
            </div>
        </>
    )
};

export default BlogPage;