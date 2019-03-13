import React, {Component} from 'react';
import {connect} from '../react-redux/index.js'
import {ADD} from '../actions/action-types'

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <p>
                    {this.props.num}
                </p>
                <button type="button"
                        onClick={() => {
                            this.props.add(5)
                        }}
                >
                    点击

                </button>
                <button type="button"
                        onClick={() => {
                            this.props.add2(5)
                        }}
                >
                    点击

                </button>
                <button type="button"
                        onClick={() => {
                            this.props.add3(5)
                        }}
                >
                    点击

                </button>
            </div>
        )
    }
}

let dispatch = {
    add: (payload) => (dispatch) => {
        setTimeout(function () {
            dispatch({type: ADD, payload})
        }, 1000)
    },
    add2: (payload) => new Promise(function (resolve, reject) {
        resolve({type: ADD, payload})
    }),
    add3: function () {
        return {
            type: ADD,
            payload: new Promise(function (resolve, reject) {
               setTimeout(function () {
                   if(Math.random()>0.6){
                       resolve(700)
                   }else {
                       reject(-111)
                   }
               },2000)
            })
        }
    }


}
// let dispatch = (dispatch) => ({
//     add: (count) => {
//         dispatch({type: ADD, count})
//     }
// });
export default connect(state => state.counter, dispatch)(Counter)