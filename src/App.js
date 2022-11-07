import React, { useEffect, useState } from "react";
import './App.css';
import SingleCard from "./components/SingleCard";
import Card from "./components/Card";
import CardBack from "./components/CardBack";
import CountDownTimerDisplay from "./components/CountDownTimerDisplay";
import TurnDisplay from "./components/TurnDisplay";
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';



// function builds array of color cards and randomizes their indexes
function fillArray()
{
  let colorCode;
  let swatches = [];

  for (var i = 0; i < 10; ++i)
  {
   colorCode = randColor();
   swatches.push(<div card = {i + 1} ><Card color = {colorCode} /></div>);
   swatches.push(<div card = {i + 1} ><Card color = {colorCode} /></div>);
  }  

  for (let i = swatches.length - 1; i > 0; i--)
  {
    const j = Math.floor(Math.random() * (i + 1));
    [swatches[i], swatches[j]] = [swatches[j], swatches[i]];
  }

  function randColor()
  {
    var colorCode = "#";
    var hex = "0123456789ABCDEF";

    for (var i = 0; i < 6; i++) 
    {
      colorCode += hex[Math.floor(Math.random() * 16)];
    }

    return colorCode;

  }

  return swatches;
}



 export default function App() {

  // declaration of variables with setState functions
  const [cardFront, setCardFronts] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false) 
  const [count, setCount] = useState(0)

  // function call on start or when New Game button is pushed
  // fills cardFront array...adds id and matched boolean to each card front
  // resets card choices to null and integers to 0
  const newCards = () => {
    const newCards = fillArray()
      .map((cardFront) => ({...cardFront, id: Math.random(), matched: false}))

    setCardFronts(newCards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
    setCount(0)
    

  }

  // checks if a choice has been made when card is clicked and sets choiceOne or choiceTwo
 const handleChoice = (cardFront) => {
    choiceOne ? setChoiceTwo(cardFront): setChoiceOne(cardFront)
 }

// once two card choices have been made this function checks if the choice match
// if they match it iterates through the previous state of cardFront, finds cardFront
// that match choice and sets a new cardFront with its matched property to true
// finally it calls the reset function
 useEffect(() => {
    if (choiceOne && choiceTwo)
    {
      setDisabled(true)
        if (choiceOne.props.card === choiceTwo.props.card){
          setCount(prevCount => prevCount + 1)
          setTimeout(() =>
          setCardFronts(prevCardFront => {
            return prevCardFront.map(cardFront => {
              if (cardFront.props.card === choiceOne.props.card)
              {
              
                return {...cardFront, matched: true}
              }
              else
              {
          
                return cardFront
              }
            })
          }), 1300)
          setTimeout(() => resetTurn(), 1300)
        }
        else{
          setTimeout(() => resetTurn(), 1300)
        }
        console.log(choiceOne, choiceTwo)
    }
 }, [choiceOne, choiceTwo])

// sets choices back to null, add 1 to the turn count and re-enables onclick to choose card
 const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setDisabled(false)
  setTurns(prevTurns => prevTurns + 1)
 }

// calls the newCards function when the page initially loads
// without this there would be no cards visible on initial load
 useEffect(() =>{
    newCards()
 }, [])

    return (
      <div className="App">
        <h1 className="App-header">Memory Game</h1>
        <CountDownTimerDisplay timer = {<Timer active={false} duration={null}><Timecode /></Timer>}/>
        
        <TurnDisplay count={turns} />


          
            <div className="cards">
            {cardFront.map(cardFront => (
              <SingleCard 
                key = {cardFront.id}  
                cardFront = {cardFront}
                cardBack = {<CardBack />}
                handleChoice ={handleChoice}
                flipped={cardFront === choiceOne || cardFront === choiceTwo} 
                solved={cardFront.matched}
                disabled={disabled}/>
            ))}
          </div>
          <button 
          onClick = {() => {
            newCards();
          }}> New Game </button>
      </div>
    );
  }