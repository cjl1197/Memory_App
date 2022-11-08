import React from "react";

// class CountDownTimer extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         strikes: 0,
//       };
  
//     }
    
    
//     timerTick = () =>{
//       this.setState({
//         strikes: this.state.strikes + 1,
//       });
//     }
    
//     componentDidMount() {
//       setInterval(this.timerTick, 1000);
//   }
    
  
   
//     render() {
//       var counterStyle = {
//         color: "#61dafb",
//         fontSize: 30,
//         margin: 0
//       };
   
//       var count = this.state.strikes.toLocaleString();
  
//     return (
//           <h1 style={counterStyle}>{count}</h1>
//         );
//     }
//   }
  
//   class CountDownTimerDisplay extends React.Component {
//     render() {
    function CountDownTimerDisplay({timer}) {
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

    var counterStyle = {
        color: "#61dafb",
        fontSize: 30,
        margin: 0,
        fontWeight: "bold",
    };
   
      return (
        <div style={divStyle}>
          <h2 style={textStyles.smallEmphasis}>Time</h2>
          
          <div style={counterStyle}>{timer}</div>
        </div>
      );
    }


  export default CountDownTimerDisplay