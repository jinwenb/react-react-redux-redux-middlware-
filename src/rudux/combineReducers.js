//合并2个reducers
//这个state就是createStore里面传进来的空格对象第一次
/*
* reducers 是一个对象
*/
/*
循环对象的属性，每个属性都是i一个函数让他们默认执行
第一次的时候createStore里出传进来的action是空所以走了默认值
当调用dispatch方法的时候那么会再次调用这个函数
在 dispatch内部里调用的 那么那个时候传进来的action真的是新的值
让当前的的newState的key重新赋值
第二次传进来的state则是返回的newState state[key]就是newState的值
第一次newState[key]的值就是reducers调用的每个结果
所以state的key对应的就是原始reducers那个key 的额值
*/
export default   (reducers) => (state = {}, action) => {
    let newState = {};
    Object.keys(reducers).forEach(key => newState[key] = reducers[key](state[key], action));
    return newState;
};
