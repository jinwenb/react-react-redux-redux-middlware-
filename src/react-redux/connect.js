import React,{Component} from 'react';
import propTypes from "prop-types";
import {bindActionCreators} from '../rudux/index'
//第一个函数是mapStateAndProps一个函数里面接接受了所有的state获取到的值
export default  (mapStateAndProps, mapDispatch) => (ChildComponent) => {
    mapStateAndProps = mapStateAndProps || (state => state);
    mapDispatch = mapDispatch||{};
    class Porty extends Component {
        static contextTypes = {
            store: propTypes.object
        };
        constructor() {
            super();
            this.state = {}
        }
        componentWillUnmount() {
            this.unSubscribe()
        }
        //使用subscribe订阅方法每次dispatch就会调用这个方法重新刷新页面
        componentWillMount() {
            this.unSubscribe = this.context.store.subscribe(() => {
                //this.props.store就是creteStore调用之后的结果先获取到里面所有的状态
                //传递给mapStateAndProps 至于返回什么就是外卖弄说的算
                //比如第一次传进去了{list:{items:[]},count:{number:1}}
                //mapStateAndProps函数返回了{list:{items:[]},count:{number:1}}.list
                this.setState(mapStateAndProps(this.context.store.getState()))
            })
        }

        render() {
            if (typeof mapDispatch === 'object') {
                mapDispatch = bindActionCreators(mapDispatch, this.context.store.dispatch)
            } else {
                mapDispatch = mapDispatch(this.context.store.dispatch)
            }

            return <ChildComponent
                {...mapStateAndProps(this.context.store.getState())}
                {...mapDispatch}
            />
        }
    }

    return Porty;
}
