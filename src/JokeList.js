import React, { Component } from 'react'
import axios from 'axios';
import Joke from './Joke'

export default class JokeList extends Component {
  static defaultProps = {newJokesCount: 10}
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    }
  }

  componentWillMount() {
    localStorage.getItem('jokes') && this.setState({
      jokes: JSON.parse(localStorage.getItem('jokes'))
    })
  }

  componentDidMount() {
    if (!localStorage.getItem('jokes')) {
      this.getJokes();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('jokes', JSON.stringify(nextState.jokes))
  }

  getJokes = async () => {
    for (let i = 0; i < this.props.newJokesCount; i++) {
      const response = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: "application/json" } });
      const newJoke = { joke: response.data.joke, id: response.data.id, score: 0 }

      // check if joke is already in list
      if (this.state.jokes.some(joke => joke.id === newJoke.id)) {
        i--;
      } else (
        this.setState(st => ({
          jokes: [...st.jokes, newJoke]
        })));
    }
  }

  updateScore = (id, score) => {
    const currentJokes = [...this.state.jokes];
    currentJokes.map(joke => joke.id === id ? joke.score = score : joke.score );

    this.setState({
      jokes: currentJokes
    });

    this.updateOrder();
  } 

  updateOrder = () => {
    this.setState(st => ({
      jokes: [...st.jokes].sort((a, b) => {
        return b.score - a.score;
      })
    }))
  }

  
  render() {
    return (
      <div>
        {this.state.jokes.length < 10 ? "Loading..." : this.state.jokes.map(({joke, id, score}) => (
          <Joke joke={joke} key={id} id={id} score={score} updateScore={this.updateScore} />
        ))}
        <button onClick={this.getJokes}>Get More Jokes</button>
      </div>
    )
  }
}
