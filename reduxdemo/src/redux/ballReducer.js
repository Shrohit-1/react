const initialState={
    balls:100
}

const ballReducer=(state=initialState,action)=>{
    console.log(action);
    switch(action.type){
        case 'BUY_BALL':
            return {...state,balls : state.balls-action.payload};
        case 'SELL_BALL':
            return {...state,balls : state.balls+Number(action.payload)};
        default:
            return state;
    }
}

export default ballReducer;