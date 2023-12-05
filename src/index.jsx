import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { useState } from 'react';
import { AllTask } from "./pages/Task1";

function Hi() {
  return (
    <div className='histyle'>
      <h2>Hello</h2>
    </div>
    
  )
}

function Button() {
  const [count, setCount] = useState(0);
  
  function handleClick() {
    setCount(count + 1);
  }

  function resetClick() {
    setCount(0);
  }

  return (
    <div>
      <ButtonCount count={count} onClick={handleClick}/>
      <ButtonReset onClick={resetClick}/>
    </div>
  )
  
}
function ButtonCount({count, onClick}) {

  return (
    <div>
      <button onClick={onClick}> Clicked {count} times</button>
    </div>
  )
}
function ButtonReset({onClick}) {

  return (
    <div>
      <button onClick={onClick}>Reset</button>
    </div>
  )
}

class Button2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      count: 0,
    };
    this.decreaseClick = this.decreaseClick.bind(this);
  }
  increaseClick = () => {
    this.setState({count: this.state.count + 1});
  };

  decreaseClick() {
    this.setState(() => ({
      count: this.state.count -1,
     }));
  }

  render() {
    return (
      <div>
        <div>
          Click {this.state.count} times
        </div>
        <div>
          <button 
            onClick={this.increaseClick}
          >
             +
          </button>
          <button
            onClick={this.decreaseClick}
          >
            -
          </button>
          <button 
            onClick={() => {
              this.setState({count: this.state.count = 0});
            }}
          >
            Reset
          </button>
        </div>
      </div>
    )
  }
}

function formatDate(date) {
  return date.toLocaleDateString();
}
function Avatar(props) {
  return (
    <img 
      src={props.user.avatarUrl}
      alt={props.user.name} 
    />
  );
}
function UserInfo(props) {
  return (
    <div className="UserInfo">
        <Avatar user={props.user}/>
        <div className="UserInfo-name">
          {props.user.name}
        </div>
    </div>
  );
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author}/>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
};











// class Square extends React.Component {
//   render() {
//     return (
//       <button 
//         className="square" 
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {

    return (
      <div>
        
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    }
  }
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares:squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
    // console.log(squares);
  }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner:' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
      <h1>Привіт, світе!</h1>
      <h2>Зараз {this.state.date.toLocaleTimeString()}.</h2>
    </div>
    );
  }
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick}/>;
    } else {
      button = <LoginButton onClick={this.handleLoginClick}/>;
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn}/>
        {button}
      </div>
    )
  }
}

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting/>;
  }
  return <GuestGreeting/>;
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}
function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

// не зробила, бо поки не знаю як

 class NextPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleNextPage = this.handleNextPage.bind(this);
  }

  handleNextPage() {

  }
  render() {
    return (
      <div>
        <button onClick={this.handleNextPage}> 
          Next page
        </button>
      </div>
    )
  }
 }



 class Clock2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    console.log(this)
    this.id = setInterval(() => {
      console.log(10);
      this.setState({date: new Date()})
    }, 1000)
  }

  componentWillUnmount() {
    console.log("unmounted")
    clearInterval(this.id);
  }
  
  
  render() {
    return (
      <div id="clock">{this.state.date.toLocaleTimeString()}</div>
    );
  }
 }

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
  );
  return (
    <ul>{listItems}</ul>
  )
  
 }
 const numbers = [1, 2, 3]

function Inputs(params) {
  return (
    <form action="">
      <div>
        Text<input type="text" />
      </div>
      <div>
        Password<input type="password" />
      </div>
      <div>
        Radio<input type="radio" />
      </div>
      <div>
        Checkbox<input type="checkbox" />
      </div>
      <div>
        Hidden<input type="hidden" />
      </div>
      <div>
        <input type="reset" />
      </div>
      <input type="submit" value="Sbmt" />

    </form>
  )
}
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Будь ласка, напишіть твір про ваш улюблений елемент DOM.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Твір, що було надіслано: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Твір: 
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Надіслати" />
      </form>
    );
  }
}

function BoilingVerdict(props) {
  if (props.fahrenheit >= 212) {
    return <p>Water will boiling</p>
  }
  return <p>Water won't boiling</p>
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 /9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32; 
}
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if(Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

const scaleNames = {
  c: 'Цельсій',
  f: 'Фаренгейт'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend> Write temperature {scaleNames[scale]}: </legend>
        <input 
          value={temperature}
          onChange={this.handleChange}/>
      </fieldset>
    );
  }
  
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'f'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }
  
  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c'?  tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput 
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}/>
        <TemperatureInput 
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}/>
        <BoilingVerdict 
          fahrenheit={parseFloat(fahrenheit)}/>
      </div>
    );
  }
}

function MyApp() {
  const [showClock, setState] = useState(true);

  return (
    <React.StrictMode>
      <Hi />
      <Button/>
      <Button2 />
      <Comment
        date={comment.date}
        text={comment.text}
        author={comment.author}/>
      <Game/>
      <Clock/>
      <LoginControl/>
      <NextPage/>
      <button onClick={() => setState(!showClock)}>TOggle clock</button>
      {showClock  && <Clock2/>} 
      
      <NumberList numbers={numbers}/>
      <Inputs/>
      <EssayForm/>
      <Calculator/>
    </React.StrictMode>
  )
}

function RootApp() {
  return (
    <React.StrictMode>
      <AllTask/>
      {/* <Task />
      <FiltrableProductTable /> */}
      {/* <Checklist/> */}
    </React.StrictMode>
  )

}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
