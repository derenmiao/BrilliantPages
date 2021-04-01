import { apiAwaitGet } from '@/Request/http.ts'


export async function apiZh2Jp(src:string){
    const { translateResult } = await apiAwaitGet(src)
    let result:any = translateResult[0]
    console.log("这是翻译的结果呀 = ", translateResult)
    return result[0]
}