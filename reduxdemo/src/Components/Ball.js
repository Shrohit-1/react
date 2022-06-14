import React, { useState } from 'react'
import { connect } from 'react-redux'

function Ball(props) {
    const [qty,setQty] = useState(1);
  return (
      <>
        <div>Balls:{props.balls}</div>
        <input type="number" value={qty} onChange={(e)=>{setQty(e.target.value)}} />
        <button onClick={()=>props.buyBall(qty)}>BUY</button>
        <button onClick={()=>props.sellBall(qty)}>sell</button>
      </>
  )
}

const mapStateToProps = (state)=>{
    return {
        balls:state.ball.balls
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        buyBall: (qty)=> dispatch({type:"BUY_BALL",payload:qty}),
        sellBall: (qty)=> dispatch({type:"SELL_BALL",payload:qty})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Ball)