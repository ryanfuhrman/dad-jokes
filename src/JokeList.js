import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid";
import Joke from "./Joke";
import "./JokeList.css";

export default class JokeList extends Component {
  static defaultProps = { numOfJokes: 10 };
  constructor(props) {
    super(props);
    this.state = {
      jokes: localStorage.getItem("jokes")
        ? JSON.parse(localStorage.getItem("jokes"))
        : [],
      loading: false,
    };
    this.seenJokes = new Set(this.state.jokes.map(joke => joke.text));
  }

  componentDidMount() {
    if (!localStorage.getItem("jokes")) {
      this.getJokes();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.jokes !== this.state.jokes) {
      localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
    }
  }

  getJokes = async () => {
    try {
      let jokes = [];
      while (jokes.length < this.props.numOfJokes) {
        let res = await axios.get("https:icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });
        let newJoke = res.data.joke;
        if (!this.seenJokes.has(newJoke)) {
          jokes.push({ id: uuid(), text: newJoke, score: 0 });
        }
      }
      this.setState(
        st => ({
          loading: false,
          jokes: [...st.jokes, ...jokes],
        }),
        () =>
          window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  };

  updateScore = (id, score) => {
    const currentJokes = [...this.state.jokes];
    currentJokes.map(joke =>
      joke.id === id ? (joke.score = score) : joke.score
    );

    this.setState({
      jokes: currentJokes,
    });
  };

  handleClick = () => {
    this.setState({ loading: true }, this.getJokes);
  };

  render() {
    let jokes = this.state.jokes.sort((a, b) => b.score - a.score);
    return (
      <div className="JokeList">
        <div className="JokeList-dash">
          <h1 className="JokeList-title">
            <span className="dad">Dad</span>{" "}
            <span className="jokes">Jokes</span>
          </h1>
          <span
            role="img"
            aria-label="rolling on floor laughing"
            className="JokeList-emoji"
          >
            🤣
          </span>
          <button className="JokeList-btn" onClick={this.handleClick}>
            More Jokes
          </button>
        </div>
        <div className="JokeList-jokes-container">
          {this.state.loading ? (
            <span className="loading fas fa-spinner" />
          ) : (
            <ul className="JokeList-jokes">
              {jokes.map(({ text, id, score }) => (
                <Joke
                  joke={text}
                  key={id}
                  id={id}
                  score={score}
                  updateScore={this.updateScore}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
