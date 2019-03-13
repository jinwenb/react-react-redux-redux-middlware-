import {compose} from "./index";
//第一版实现一个中间件
/*第一个参数是中间件
function applyMiddleware(middleWare) {
    //第二个参数是createStore函数
    return function (createStore) {
        //第三个函数是reducer
        return function (reducer) {
            let store = createStore(reducer);
            let dispatch;
            let middleWares = {
                getState: store.getState,
                dispatch: action => dispatch(action)
            };
            //第一次调用进去的传进了一个对象  第一个值是getState原本的
            //createStore执行后的原来的方法
            middleWare = middleWare(middleWares);//这时候的值就是那个next函数
            dispatch = middleWare(store.dispatch);
            //把next函数调用，也就是往中间件的next函数里传进去了原始的dispatch方法
            //这是时候中间件函数里的第一层函数里的dispatch实际就是包装后的 dispatch
            //也就是你传入一个action实际上他是调用了
            //dispatch  实际上就是 middleWare（）的返回结果
            //实际上啦也就是调用了next  方法的返回值   也就是中间件函数
            //的返回值那个函数  那个函数里调用了next(action)  next又正好是store.dispatch
            //真正的dispatch方法  调用middleWare（middleWares）里面的dispatch
            //也就是传入一个值 然后调用了 middleWare（）的返回结果 把值传进去了
            return {
                ...store, dispatch
            }
        }
    }
};
*/
let applyMiddleware = (...middleWares) => (createStore) => (reducer) => {
    let store = createStore(reducer);
    let dispatch;
    let middleWaresApi = {
        getState: store.getState,
        dispatch: action => dispatch(action)
    };
    middleWares = middleWares.map(middleWare => middleWare(middleWaresApi));
    /*
    第一次下来得到的结果就是函数的每个中间件返回值 也就是各自的next
    第一次compose进去的时候会把dispatch传递给最后的中间件
    也就是说第一次进去的时候调用了middleWares的最后一个函数
    也就是那个next方法那个next方法的参数就是store.dispatch
    然后调用了倒数第2个中间件的函数的next   也就是把第一个
    函数的返回结果传递给了 倒数第二个函数
    倒数第二个函数方法执行也就是next参数就是前一个函数的返回结果那个函数
    最后返回的就是第一个函数的返回结果
    这个时候返回的dispatch实际上等于第一个中间件的next掉用了
    也就是第一个函数的返回结果
    而在那个方法掉用next实际上就是调用了 下一个中间函数的最后返回结果
    next函数里返回的那个函数  那个函数接受一个action在里面调用了
    next那个next参数就是最开始传进去的dispatch
    */
    dispatch = compose(...middleWares)(store.dispatch);
    return {
        ...store, dispatch
    }
};
export default applyMiddleware
