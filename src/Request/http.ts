import axios from './index'

export async function apiAwaitPost(src:string, pramas:any={}, header:any={}) {
    const token:string = ""
    pramas = {...pramas, token }
    const { data } = await axios.post(src, pramas, header)
    return data
}

export function apiNotAwaitPost(src:string, pramas:any={}, header:any={}) {
    const token:string = ""
    pramas = {...pramas, token }
    return axios.post(src, pramas, header)
}

export async function apiAwaitGet(src:string, pramas:any={}){
    let { data } = await axios.get(src, pramas)
    return data
}

export function apiNotAwaitGet(src:string, pramas:any={}){
    return axios.get(src, pramas)
}