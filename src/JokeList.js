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

  componentDidMount() {
    if (this.state.jokes.length === 0){
      this.getJokes();
    }
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
