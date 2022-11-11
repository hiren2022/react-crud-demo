
let url = 'https://react-crud-demo-rfuvfdie3-hiren2022.vercel.app/api'

export const htpPost = async (type,data) => {
    return await fetch(`${url}${type}`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
}

export const htpGet = async (type,data) => {
    return await fetch(`${url}${type}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    }).then(resp => resp.json())
}

export const htpDelete = async (type,data) => {
    return await fetch(`${url}${type}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
    }).then(resp => resp.json())
}