import { reactive } from "vue"

export const useDataList = (src:string, init:any) => {
    let initParams = reactive({
        page: 1,
        size: 10,
        newdTotal: false,
    })
}