import React from "react";
import axios from 'axios';

// var scores = [
//                 ['Craig', 150]
//             ];
class Scores extends React.Component {

  state = {
    scores: []
  }

componentDidMount = () => {
  this.getScores();
};

  getScores = () => {
    axios.get('/api')
    .then((response) => {
      const data = response.data
      this.setState({ scores: data})
      console.log('Data has been received!')
    })
    .catch(() => {
      console.log('There was an error receiving the data.')
    })
    console.log(this.state.scores)
 };

 printScores = (scores) => {

    if (!scores.length) return null;


   return scores.map((score, index) => {
      return  <div key={index}>
                <h3>{score.name}  {score.time}</h3>
              </div>
    })
 };


  render() {



    return (
      <div>
          <h3>
              {this.printScores(this.state.scores)}
          </h3>
      </div>
    );
  }
}

class ScoreLabel extends React.Component {
    
    render() {
        var labelStyle = {
            justifyContent: "center",
        };

        // var scoreStyle = {
        //     float: "left";
        // };

        
    
        return (
            <div style={labelStyle}>
                <h2>High Scores</h2>
            </div>
        );
    }
}

class HighScore extends React.Component {
  
    render() {
      var cardStyle = {
        height: 600,
        width: 300,
        backgroundColor: "grey",
        display: "inline-block",
        boxShadow: "0px 0px 5px #666",
        borderRadius: 5
      };
  
      return (
        
        <div style={cardStyle} >
            <ScoreLabel />
            <Scores />
        </div>
      );
  
    }
  }
  
  export default HighScore