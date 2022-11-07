import React, { useEffect, useState } from "react";
import './App.css';
import SingleCard from "./components/SingleCard";
import Card from "./components/Card";
import CardBack from "./components/CardBack";
import CountDownTimerDisplay from "./components/CountDownTimerDisplay";
import TurnDisplay from "./components/TurnDisplay";
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';


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

              for (var i = 0; i < 6; i++) {
                colorCode += hex[Math.floor(Math.random() * 16)];
              }

            return colorCode;

        }

  return swatches;
}



 export default function App() {

  const [cardFronts, setCardFronts] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false) 
  const [count, setCount] = useState(0)

  const newCards = () => {
    const newCards = fillArray()
      .map((cardFronts) => ({...cardFronts, id: Math.random(), matched: false}))

    setCardFronts(newCards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
    setCount(0)
    

  }

 const handleChoice = (cardFronts) => {
    choiceOne ? setChoiceTwo(cardFronts): setChoiceOne(cardFronts)
 }


 useEffect(() => {
    if (choiceOne && choiceTwo)
    {
      setDisabled(true)
        if (choiceOne.props.card === choiceTwo.props.card){
          setCount(prevCount => prevCount + 1)
          setTimeout(() =>
          setCardFronts(prevCardFronts => {
            return prevCardFronts.map(cardFronts => {
              if (cardFronts.props.card === choiceOne.props.card)
              {
                resetTurn()
                return {...cardFronts, matched: true}
              }
              else
              {
                resetTurn()
                return cardFronts
              }
            })
          }), 1300)
         
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
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
  if (count === 10)
  {
    Timer.active= false;
  }
 }

 useEffect(() =>{
    newCards()
 }, [])

  return (
    <div className="App">
      <h1 className="App-header">Memory Game</h1>
      <CountDownTimerDisplay timer = {<Timer active={true} duration={null}><Timecode /></Timer>}/>
      
      <TurnDisplay
        count={turns} />
         
           <div className="cards">
          {cardFronts.map(cardFronts => (
            <SingleCard 
              key = {cardFronts.id}  
              cardFronts = {cardFronts}
              cardBack = {<CardBack />}
              handleChoice ={handleChoice}
              flipped={cardFronts === choiceOne || cardFronts === choiceTwo} 
              solved={cardFronts.matched}
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


 
