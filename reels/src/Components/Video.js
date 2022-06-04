import React from 'react'
import "./Video.css"
import { findDOMNode } from 'react-dom';
function Video(props) {

  const handleClick= (e)=>{
    e.preventDefault();
    e.target.muted = !e.target.muted;
  }
  const handleScroll= (e)=>{
    let next= findDOMNode(e.target).parentNode.nextSibling;
    if(next){
      next.scrollIntoView();
      e.target.muted=true;
    }
  }
  return (
    <video src={props.src} className="video-styling" muted={true} onEnded={handleScroll} onClick={handleClick} ></video>
  )
}

export default Video