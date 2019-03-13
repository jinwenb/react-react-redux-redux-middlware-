import {Component} from "react";
import propTypes from 'prop-types'
 class Provider extends Component{
    constructor(){
        super();
    }
    static childContextTypes = {
        store:propTypes.object
    };
    getChildContext(){
        return {store:this.props.store};
    }
    render(){
        return this.props.children
    }

}
export default Provider