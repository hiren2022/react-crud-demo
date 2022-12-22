import React from 'react';


const Table = ({rowData,headers,handleAction}) => {
    return (
        <>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead
                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {headers && headers?.map((ele,index)=>(
                        <th scope="col" className="py-3 px-6" key={index}>{ele.toUpperCase()}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rowData && rowData?.length && rowData.map((ele, index) => (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={index}>
                        {headers && headers?.map((item,id)=>(
                            <td className="py-4 px-6" key={id}>{ele[item]}</td>
                        ))}
                        {/*<td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>*/}
                        {/*<td className="py-4 px-6">{ele?.toUserId}</td>*/}
                        {/*<td className="py-4 px-6">{ele?.status ? 'Active' : 'Inactive'}</td>*/}
                        {/*<td className="py-4 px-6">*/}
                        {/*</td>*/}
                        {/*<td className="py-4 px-6">*/}
                        {/*    <button*/}
                        {/*        className='w-[50px] h-[30px] border-none bg-[red] rounded-[5px] text-[white] cursor-pointer'*/}
                        {/*        onClick={() => handleRequest(ele?._id, 'rejected')}>Reject*/}
                        {/*    </button>*/}
                        {/*</td>*/}
                    </tr>
                ))}

                </tbody>
            </table>
        </>
    )
};

export default Table;