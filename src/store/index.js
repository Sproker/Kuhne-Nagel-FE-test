import {createContext, useReducer} from "react";
import {dataReducer} from "./reducer";
import combineReducers from "react-combine-reducers";

const initalPosts = {
    data: []
}

const [combinedReducer, initialState] = combineReducers({
    datas: [dataReducer, initalPosts],
})

export const Context = createContext(initialState)

function Store({children}){
    const [state, dispatch] = useReducer(combinedReducer, initialState)

    return (
        <Context.Provider value={[ state, dispatch ]}>
            {children}
        </Context.Provider>
    )
}

export default Store