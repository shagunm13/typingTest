import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      start: false,
      time: 60,
      message: '',
      space: 0,
      correct: 0,
      wrong: 0,
      userWord: '',
      text: '',
      testData: '',
      enableTime: false,
      arrayToDisplay: [],
    }

    this.ArrayofData = ["In 1931, a young science-fiction writer whom Tesla befriended, Kenneth Swezey, organized a celebration for the inventor's 75th birthday. Tesla received congratulatory letters from more than 70 pioneers in science and engineering, including Albert Einstein, and he was also featured on the cover of Time magazine. The cover caption All the world's his power house noted his contribution to electrical power generation. The party went so well that Tesla made it an annual event, an occasion where he would put out a large spread of food and drink—featuring dishes of his own creation.",
      "There is a lovely road that runs from Ixopo into the hills. These hills are grass-covered and rolling, and they are lovely beyond any singing of it. The road climbs seven miles into them to Carisbrooke; and from there, if there is no mist, you look down on one of the fairest valleys of Africa. About you there is grass and bracken and you may hear the forlorn crying of the titihoya, one of the birds of the veld. Below you is the valley of the Umzimkulu, on its journey from the Drakensberg to the sea; and beyond and behind the river, great hill after great hill; and beyond and behind them, the mountains of Ingeli.",
      "To avoid mistakes is the beginning, as it is the end, of mastery in chess. If you make no mistakes you can be certain of never losing a game, and very constantly you will win it. And how difficult this is! Even the strongest masters cannot avoid them. How many games have been lost only because of them? Tchigorin overlooked a mate in two in the final game of his second match against Steinitz for the world championship and thus lost the match!! Here is a position from the game Rosselli v. Alekhin, from the recent tournament in Folkestone, which was really a game of errors.",
      "A mobile phone (also known as a hand phone, cell phone, or cellular telephone) is a small portable radio telephone. The mobile phone can be used to communicate over long distances without wires. It works by communicating with a nearby base station which connects it to the main phone network. When moving, if the mobile phone gets too far away from the cell it is connected to, that cell sends a message to another cell to tell the new cell to take over the call. This is called a hand off and the call continues with the new cell the phone is connected to. The hand-off is done so well and carefully that the user will usually never even know that the call was transferred to another cell.",
      "Albert Einstein was born in Ulm, in the Kingdom of Württemberg in the German Empire. Einstein developed an appreciation for music at an early age. In his late journals he wrote: If I were not a physicist, I would probably be a musician. Music took on a pivotal and permanent role in Einstein's life from that period on. Although the idea of becoming a professional musician himself was not on his mind at any time."
    ]


  }

  componentDidMount() {

    let paraIndex = Math.floor(Math.random() * 5);
    let arrayAtLoad = this.ArrayofData[paraIndex].split(" ");

    //console.log(arrayAtLoad)
    let finalArray = [];

    arrayAtLoad.forEach(val => {
      let obj = { word: val, color: '' }
      finalArray.push(obj)
    })

    this.setState({ arrayToDisplay: finalArray, testData: this.ArrayofData[paraIndex] })



  }



  startTimer() {
    // starting timer

    this.interval = setInterval(() => {

      if (this.state.time > 0)
        this.setState({ time: this.state.time - 1 })

      else {
        this.setState({ message: "Time up !!", start: false })
      }

    }, 1000)



  }

  handleStart = () => {
    let paraIndex = Math.floor(Math.random() * 5);
    let arrayAtLoad = this.ArrayofData[paraIndex].split(" ");

    //console.log(arrayAtLoad)
    let finalArray = [];

    arrayAtLoad.forEach(val => {
      let obj = { word: val, color: '' }
      finalArray.push(obj)
    })


    this.setState({
      start: true,
      enableTime: false,
      time: 60,
      space: 0,
      correct: 0,
      wrong: 0,
      userWord: '',
      text: '',
      message: '',
      testData: this.ArrayofData[paraIndex],
      arrayToDisplay: finalArray
    })


    clearInterval(this.interval);
  }

  handleInput = (event) => {
    if (!this.state.enableTime)
      this.startTimer()

    this.setState({ text: event.target.value, enableTime: true })
  }

  handleSpace = (event) => {
    const { space, correct, wrong, userWord } = this.state;

    if (event.keyCode === 32) {

      let actualWord = this.state.testData.split(" ")
      if (space < actualWord.length) {
        if (actualWord[space] === userWord) {
          let newArray = this.state.arrayToDisplay
          newArray[space].color = 'green'
          this.setState({ correct: correct + 1, arrayToDisplay: newArray })
        }
        else {
          let newArray = this.state.arrayToDisplay
          newArray[space].color = 'red'
          this.setState({ wrong: wrong + 1, arrayToDisplay: newArray })
        }
        this.setState({ space: this.state.space + 1, userWord: '', text: '' })
      }
      else {
        this.setState({ start: false, message: "Test Completed" })
      }
    }
    else if (event.keyCode === 8) { // handling backspace
      this.setState({ userWord: userWord.substr(0, userWord.length - 1) })

    }
    else if ((47 < event.keyCode && event.keyCode < 106) || (187 < event.keyCode && event.keyCode < 222) || (event.keyCode === 186)) {

      this.setState({ userWord: this.state.userWord.concat(event.key) })
    }

  }



  render() {

    let { correct, wrong, message, arrayToDisplay, space } = this.state;

    return (
      <div className="App">
        {this.state.start ?
          <div>
            <h1>TYPING TEST</h1>
            <h3>Time Remaining : {this.state.time} seconds</h3>

            <div style={{ display: 'inline-block' }}>
              <input type="text"
                value={this.state.text}
                onChange={this.handleInput}
                onKeyDown={this.handleSpace}
                style={{ width: 400, height: 60, fontSize: 22 }}
              />

              <p style={{ border: '1px solid black', width: 600, text: 'center', padding: 30 }}>
                {arrayToDisplay.map((obj, index) => (<span style={{ color: `${obj.color}`, backgroundColor: `${space === index ? 'grey' : ''} `, fontSize: 20 }}
                  key={index}>
                  {obj.word} </span>))}
              </p>
            </div>
          </div>
          :
          <div style={{ marginTop: 100 }}>
            <h1>Want to test your Speed </h1>
            <h3>take a quick test</h3>
            <button onClick={this.handleStart} >START HERE</button>
            <div>{message &&
              <div style={{ border: '1px solid grey', width: 400, display: 'inline-block', marginTop: 50, paddingBottom: 30 }}>
                <h2>{message}</h2>  <br />
                Typing Speed: <strong>{correct}</strong> wpm<br />
                Typing error : <strong>{wrong}</strong> mistakes<br />
                Accuracy : <strong>{((correct / (correct + wrong)) * 100).toFixed(2)}</strong> %
               </div>
            }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
