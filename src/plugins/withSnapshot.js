import cloneDeep from 'clone-deep'

const pluginWithSnapshot = store => {
    let prevState = cloneDeep(store.state)
    store.subscribe((mutation, state) => {
        let nextState = cloneDeep(state)
    
        // 比较 prevState 和 nextState...
    
        // 保存状态，用于下一次 mutation
        prevState = nextState
    })
}

export default pluginWithSnapshot