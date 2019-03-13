/*
* 合并函数  过于简单不写注释
*
* */


function compose(...middleWare){
    if(middleWare.length<=1) return middleWare[0];
    let last = middleWare.pop();
    return function (...arg) {
        return  middleWare.reduceRight((a,b)=>{
          return b(a);
        },last.apply(null,arg))
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

