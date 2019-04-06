/*
* 合并函数  过于简单不写注释
*
* */


function compose(...middleWare){
    if(middleWare.length<=1) return middleWare[0];
    let last = middleWare.pop();
    return function (...arg) {
        // 第一次进来的时候middleWare是(next)=>(action)
        return  middleWare.reduceRight((a,b)=>{
          return b(a);
        },last.apply(null,arg))
        //第一次last.apply(null,arg) 执行 等于就是  next() 得到的结果就是action 把action传给了上个函数
        //也就是说上个函数(next) next===action  调用next等于调用了action这个函数
        //最后的返回结果就是数组里第一个函数的返回结果 那个(dispatch)=>(next)=>(action)
        //  第一个函数的dispatch调用也就是调用了第一个函数的action 函数  会进入四递归 除非有判断条件
    }
}





/**
 *
 * 自己定义的函数 也有效
 *
 *

 function compose(...arg) {
    if (arg.length <= 1) return arg[0];
    return (...args) => {
        let result = arg.pop()(...args),middle;
        while (middle = arg.pop()) {
           result = middle(result);
        }
        return result;
    }
}
 *
 *
 * */




export default compose

