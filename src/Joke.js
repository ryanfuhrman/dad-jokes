import React, { Component } from 'react'
import "./Joke.css"

export default class Joke extends Component {
  upvote = () => {
    this.props.updateScore(this.props.id, this.props.score + 1);
  }

  downvote = () => {
    this.props.updateScore(this.props.id, this.props.score - 1);
  }

  // handleVoteUpdate = () => {
  //   this.props.updateScore(this.props.id, this.state.score);
  // }

  render() {
    const {joke} = this.props;
    return (
      <div className="Joke">
        <div className="Joke-score-div">
          <button onClick={this.upvote} className="fas fa-arrow-up" />
          <span>{this.props.score}</span>
          <button onClick={this.downvote} className="fas fa-arrow-down" />
        </div>
        <div className="Joke-string-div">
        <p className="Joke-string">{joke}</p>
        </div>
      </div>
    )
  }
}
