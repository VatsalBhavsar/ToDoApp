import React from 'react';
import ReactDOM from 'react-dom';

function UserGreeting(props) {
  return(
    <h1>Welcome, Vatsal Bhavsar</h1>
  )
}

function GuestGreeting(props) {
  return(
    <h1>Welcome, Guest</h1>
  )
}

function Greeting(props){
  const isLoggedIn = props.isLoggedIn
  if(isLoggedIn){
    return <UserGreeting />
  }
  return <GuestGreeting />
}

function NumbersList(props){
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
  )

  return(
    <ul>{listItems}</ul>
  )
}

function NumberOptions(props){
  const optionItems = numbers.map((number) =>
    <option key={number.toString()}>{number}</option>
  )

  return(
    <select value={props.value} onChange={props.changeFunc}>{optionItems}</select>
  )
}

const numbers = [1,2,3,4,5,6,7,8,9]

class NameForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value : '',
      selectValue : 'Two',
      numSelectValue : 4
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleNumSelectChange = this.handleNumSelectChange.bind(this)
  }

  handleChange(event){
    this.setState({
      value: event.target.value
    });
  }
  
  handleSubmit(event){
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  handleSelectChange(event){
    this.setState({
      selectValue : event.target.value
    })
  }

  handleNumSelectChange(event){
    this.setState({
      numSelectValue : event.target.value
    })
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange}></input>
        </label>
        <input type="submit" value="Submit"></input>
        <label>{this.state.value}</label>
        <br/>
        <select value={this.state.selectValue} onChange={this.handleSelectChange}>
          <option value="One">One</option>
          <option value="Two">Two</option>
          <option value="Three">Three</option>
          <option value="Four">Four</option>
          <option value="Five">Five</option>
          <option value="Six">Six</option>
        </select>
        <NumberOptions value={this.state.numSelectValue} changeFunc={this.handleNumSelectChange}/>
        <label>Selected Values are : {this.state.selectValue} And {this.state.numSelectValue}</label>
      </form>
    )
  }
}

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <label>{this.state.isGoing? 'true' : 'false'}</label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}

function BoilingVerdict(props){
  if(props.celsius >= 100){
    return <p>The water would boil</p>;
  }
  return <p>The water won't boil</p>
}

class Calculator extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      temperature : '1',
      scale : 'c'
    }
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
  }

  handleCelsiusChange(temperature){
    this.setState({
      temperature : temperature,
      scale : 'c'
    })
  }

  handleFahrenheitChange(temperature){
    this.setState({
      temperature : temperature,
      scale : 'f'
    })
  }

  render(){
    const scale = this.state.scale
    const temperature = this.state.temperature
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature
    return(
      <div>
        <TemperatureInput 
          scale='c' 
          temperature = {celsius}
          onTempchange = {this.handleCelsiusChange}
        />
        <TemperatureInput 
          scale='f' 
          temperature = {fahrenheit}
          onTempchange = {this.handleFahrenheitChange}  
        />
        <BoilingVerdict celsius={parseFloat(celsius)}/>
      </div>
    )
  }  
}

const scaleNames = {
  c : 'celsius',
  f : 'Fahrenheit'
}

function toCelsius(fahrenheit){
  return (fahrenheit - 32) * 5 / 9
}

function toFahrenheit(celsius){
  return (celsius * 9 / 5) + 32
}

function tryConvert(temperature, convert){
  const input = parseFloat(temperature)
  if(Number.isNaN(input)){
    return ''
  }
  const output = convert(input)
  const rounded = Math.round(output * 1000) / 1000
  return rounded.toString()
}

class TemperatureInput extends React.Component{
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    this.props.onTempchange(e.target.value)
  }

  render(){
    const temperature = this.props.temperature
    const scale = this.props.scale
    return(
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input
          value = {temperature}
          onChange = {this.handleChange}
        />
      </fieldset>
    )
  }
}

function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      isLoggedIn : false
    };
  }
  
  componentDidMount(){
    this.timerId = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount(){
    clearInterval(this.timerId)
  }

  tick(){
    this.setState({
      date: new Date()
    })
  }

  sessionState = () => {
    this.setState({
      isLoggedIn : !this.state.isLoggedIn
    })
  }
  
  render() {
    return (
      <div>
        <button onClick={this.sessionState}>{this.state.isLoggedIn ? 'Logout' : 'Login'}</button>
        <Greeting isLoggedIn={this.state.isLoggedIn}/>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
        <hr/>
        <NumbersList numbers={numbers}/>
        <hr/>
        <NameForm />
        <hr/>
        <Reservation />
        <hr/>
        <Calculator />
        <hr />
        <SignUpDialog />
      </div>
    );
  }
}

  ReactDOM.render(
    <Clock />,
    document.getElementById('root')
  )
