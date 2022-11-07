import React, { useEffect, useState } from "react";
import './App.css';
import SingleCard from "./components/SingleCard";
import image from "./images/logo192.png";


function fillArray()
{
  let colorCode;
  let swatches = [];
  for (var i = 0; i < 10; ++i)
  {
   colorCode = randColor();
   swatches.push(<div card = {i} ><Card color = {colorCode} /></div>);
   swatches.push(<div card = {i} ><Card color = {colorCode} /></div>);
  //  swatches.push(<Card card = {i} color = {colorCode} />);
  //  swatches.push(<Card card = {i} color = {colorCode} />);

  }  

  for (let i = swatches.length - 1; i > 0; i--)
  {
    const j = Math.floor(Math.random() * (i + 1));
    [swatches[i], swatches[j]] = [swatches[j], swatches[i]];
  }

  return swatches;
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

class Square extends React.Component {
  render() {
    var squareStyle = {
      height: 150,
      borderRadius: 5,
      backgroundColor: this.props.color
    };
    return(
      <div style={squareStyle}></div>
    );
  }
}

class Label extends React.Component {
  render() {
    var labelStyle = {
      textAlign: "center",
      fontFamily: "sans-serif",
      fontWeight: "bold",
    };
    return (
      <p style={labelStyle}>{this.props.color}</p>
    );
  }
}
 
class Card extends React.Component {

  render() {
    var cardStyle = {
      height: 200,
      width: 150,
      backgroundColor: "#FFF",
      display: "inline-block",
      boxShadow: "0px 0px 5px #666",
      borderRadius: 5
    };

    return (
      
      <div style={cardStyle} >
        <Square color={this.props.color}/>
        <Label color={this.props.color}/>
      </div>
    );

  }
}


class CardBack extends React.Component {
  render() {
    var cardStyle = {
      height: 197,
      width: 146,
      backgroundColor: "#000",
      display: "inline-block",
      boxShadow: "0px 0px 5px #666",
      border: "2px solid grey",
      borderRadius: 5
    };
    return (
      <div style={cardStyle}>
        <img className="img" src={image} alt="react logo"></img>
      </div>
    );

  }
}

class CountDownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strikes: 0,
    };

  }
  
  
  timerTick = () =>{
    this.setState({
      strikes: this.state.strikes + 1,
    });
  }

  componentDidMount() {
    setInterval(this.timerTick, 1000);
  }
 
  render() {
    var counterStyle = {
      color: "#61dafb",
      fontSize: 30,
      margin: 0
    };
 
    var count = this.state.strikes.toLocaleString();

  return (
        <h1 style={counterStyle}>{count}</h1>
      );
  }
}

class CountDownTimerDisplay extends React.Component {
  render() {
    var commonStyle = {
      margin: 0,
      padding: 0
    };
 
    var divStyle = {
      width: 250,
      textAlign: "center",
      padding: 20,
      margin: "auto",
      marginLeft: 111,
      marginRight: 50,
      fontFamily: "sans-serif",
      color: "#999999",
      borderRadius: 10,
      float: "left"
      
    };
 
    var textStyles = {
      emphasis: {
        fontSize: 38,
        ...commonStyle
      },
      smallEmphasis: {
        ...commonStyle
      },
      small: {
        fontSize: 17,
        opacity: 0.5,
        ...commonStyle
      }
    };
 
    return (
      <div style={divStyle}>
        <h2 style={textStyles.smallEmphasis}>Time</h2>
        
        <CountDownTimer />
      </div>
    );
  }
}
    

  function MatchDisplay({count}) {
    var commonStyle = {
      margin: 0,
      padding: 0
    }

    var divStyle = {
      width: 250,
      textAlign: "center",
      padding: 20,
      margin: "auto",
      fontFamily: "sans-serif",
      color: "#999999",
      borderRadius: 10, 
      float: "left"
    };

    var textStyles = {
      emphasis: {
      fontSize: 38,
      ...commonStyle
      },
      smallEmphasis: {
      ...commonStyle
      },
      small: {
      fontSize: 17,
      opacity: 0.5,
      ...commonStyle
      }
    };

    var counterStyle = {
      color: "#61dafb",
      fontSize: 30,
      margin: 0,
      fontWeight: "bold"
    };
   
      return (
        <div style={divStyle}>
          <h2 style={textStyles.smallEmphasis}>Turns</h2>
            <div style={counterStyle}>{count}</div>
          </div>
      );
    }

 export default function App() {

  const [cardFronts, setCardFronts] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  
  const cards = fillArray()
  
  const newCards = () => {
    const newCards = [...cards]
      .map((cardFronts) => ({...cardFronts, id: Math.random(), matched: false}))

    setCardFronts(newCards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)

  }



 const handleChoice = (cardFronts) => {
    choiceOne ? setChoiceTwo(cardFronts): setChoiceOne(cardFronts)
 }

 useEffect(() => {
    if (choiceOne && choiceTwo)
    {
      setDisabled(true)
        if (choiceOne.props.card === choiceTwo.props.card){
          setCardFronts(prevCardFronts => {
            return prevCardFronts.map(cardFronts => {
              if (cardFronts.props.card === choiceOne.props.card)
              {
                return {...cardFronts, matched: true}
              }
              else
              {
                return cardFronts
              }
            })
          })
          resetTurn()
        }
        else{
          setTimeout(() => resetTurn(), 1300)
          console.log(choiceOne, choiceTwo)
        }
    }
 }, [choiceOne, choiceTwo])


 const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
 }

 useEffect(() =>{
    newCards()
 }, [])

                    return (
    <div className="App">
      <h1 className="App-header">Color Memory Game</h1>
      <CountDownTimerDisplay />
      <MatchDisplay
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


 
