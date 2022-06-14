import React from 'react'
import {connect} from 'react-redux'
function Bat(props) {
  return (
      <>
        <div>BAts : {props.bats}</div>
        <button onClick={props.buyBat}> buy Bat </button>
      </>
  )
}

const mapStateToProps = (state) =>{
    return {
        bats: state.bat.bats
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        buyBat : ()=>dispatch({type:'BUY_BAT'})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Bat)