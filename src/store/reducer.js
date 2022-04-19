import {DATA_ADD, DATA_REMOVE} from "./actions";

const dataReducer = (state, action) => {
    switch(action.type){
        case DATA_ADD:
            return{
                ...state,
                data: state.data.concat(action.payload)
            };
        case DATA_REMOVE:
            return{
                ...state,
                data: state.data.filter(data => data.id !== action.payload)
            };
            case "DATAS_UPDATE":
            return{
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}

export {dataReducer}