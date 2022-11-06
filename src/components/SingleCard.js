import React from 'react'
import './SingleCard.css'

function SingleCard({cardFronts, cardBack, handleChoice, flipped, solved}) {

    
    
        const handleClick = () => {
            handleChoice(cardFronts)
        }
      

   
  return (
    <div className = "card">
      <div className={solved ? "solved" : ""}>
              <div className={flipped ? "flipped" : ""}>
                <div className='front'>{cardFronts}</div>
                <div className='back'
                    onClick={handleClick}>{cardBack}
                </div>
                </div>
                </div>
            </div> 
  )
}


export default SingleCard
