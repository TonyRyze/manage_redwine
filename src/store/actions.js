import * as types from './mutations'

export const increment = ({ commit }, preLoad) => {
    
    commit(type.INCREMENT, {
        count: preLoad.count++
    })

}

