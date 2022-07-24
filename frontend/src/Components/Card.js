import React, {useState} from "react"
import { RWebShare } from "react-web-share"
import "../styles/card.css"

const Card = (props) =>{
  const [isFav, setIsFav] = useState(props && props.isFavourite)
  const handleFavouriteClick = ()=>{
    setIsFav(prev => !prev)
  }
  return(
    <div className="quiz-card-container">
      <div className="quiz-card-header">
        <div className="quiz-header-img">
          <div className="quiz-card-thumbnail" style={{background:`#E7F6F2`}}>
            {props && props.title[0].toUpperCase()}
          </div>
          
        </div>
        <div className="quiz-header-content">
          <div className="quiz-header-title">
            {props && props.title}
          </div>
          <div className="quiz-header-secondary-text">
            {props && props.secondaryText}
          </div>
        </div>
      </div>
      {/* <div className="quiz-card-media">
        <div className="quiz-card-media-img" style={{backgroundImage:`url(${props && props.img})`}}>
          {props && props.title}
        </div>
        
      </div> */}
      <div className="quiz-card-supporting-text">
        {props && props.supportingText}
      </div>
      {/* <div className="quiz-card-icons">
        <span className="quiz-card-icon">
          <i className="material-icons quiz-favourite-icon" style={{color: isFav ? "red" : ""}} onClick={handleFavouriteClick}>favorite</i>
        </span>
        
        <span className="quiz-card-icon">
          <RWebShare
        data={{
          text: "Web Share - GfG",
          url: "http://localhost:3000",
          title: "GfG",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <i className="material-icons quiz-share-icon">share</i>
      </RWebShare>
        </span>
      </div> */}
      
    </div>
  )
}

export default Card