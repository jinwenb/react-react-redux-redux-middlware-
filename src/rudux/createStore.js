const createStore = (reducer, preloadedState, enhancer) => {
    if (enhancer && typeof enhancer == 'function') {
        return enhancer(createStore)(reducer, preloadedState);
    }
    let state = preloadedState;
    let listener = [];
    let dispatch = (action = {}) => {
        //第一次进来的时候reduce 执行那时候action是空，所以返回了函数的默认值
        state = reducer(state, action);
        listener.forEach(l => {
            l && l()
        })
    };
    let subscribe = (callbacks) => {
        //每次进来的时候都放进去监听函数
        listener.push(callbacks);
        return () => {
            listener = listener.filter(l => l != callbacks)
        }
    };
    dispatch();
    //返回新的的状态
    let getState = () => JSON.parse(JSON.stringify(state));
    return {
        dispatch,
        getState,
        subscribe
    }
};
export {
    createStore
}
