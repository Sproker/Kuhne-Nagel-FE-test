export const DATA_ADD = "DATA_ADD"
export const DATA_REMOVE = "DATA_REMOVE"


export const addData = data => ({
    type: "DATA_ADD",
    payload: data
})

export const removeData = id =>({
    type: "DATA_REMOVE",
    payload: id
})

export const updateDatas = array =>({
    type: "DATAS_UPDATE",
    payload: array
})
