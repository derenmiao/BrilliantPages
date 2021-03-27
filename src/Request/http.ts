import axios from './index'

export async function apiAwaitPost(src:string, pramas:any) {
    const token:string = ""
    pramas = {...pramas, token }
    const { data } = await axios.post(src, pramas)
    return data
}

export function apiNoAwaitPost(src:string, pramas:any) {
    const token:string = ""
    pramas = {...pramas, token }
    return axios.post(src, pramas)
}

export function apiGet(src:string, query:any){
    console.log("query = ", query)
}