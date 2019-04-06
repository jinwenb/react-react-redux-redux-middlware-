export default  (action, dispatch) => {
  let newAction = {};
    Object.keys(action).forEach(key=>{
        newAction[key] = ()=> {
            dispatch(action[key].apply(null,arguments))
        }
    });
    return newAction;
}