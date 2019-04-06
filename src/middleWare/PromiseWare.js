

let PromiseWare = ({dispatch, getState}) => (next) => (action) => {
    //当 dispatch的时候会进入第一个中间件例如thunk结果是函数
    //然后是对象不是函数就next
    //到了这里action.then的话那就往dispatch（也就是）
    //thunk的函数里传入结果
    //然后在next(action)  也就到了这里然后next到最后的中间件
    //调用了真的store.dispatch方法
    if (action&&action.then && typeof action.then === 'function') {
        action.then(next)
    } else if (action&&action.payload && action.payload.then && typeof action.payload.then === 'function') {
        action.payload.then(payload => dispatch({...action, payload}), payload => dispatch({...action, payload}))
    }
    else {
        //是普通对象的话交给下个中间件处理把类型传进去，知道到了最后一个中间件
        //在里面掉用next(action)
        //如果只有这一个中间件的话next就是dispatch
        //如果多个的话调到最后还会出去交给最后一个中间件走
        next(action)
    }
};

export default PromiseWare