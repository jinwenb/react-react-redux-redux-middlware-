let thunk = ({dispatch, getState}) => (next) => (action) => {
    if (typeof action === 'function') {
        //把dispatch传进去 在里面传入的type值会调用
        //这个函数  在次进来的时候就是调用了next方法
        //传进去next和dispatch都可以
        action(dispatch, getState)
    } else {
        //这里的next就是下面的中间件，如果下面没有中间件
        //那next就是dispatch方法本身了
        next(action)
    }
};
export default thunk;