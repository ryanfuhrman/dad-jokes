import React, { Component } from 'react'
import "./Joke.css"

export default class Joke extends Component {
  getColor = () => {
    if(this.props.score >= 15) {
      return "#4CAF50";
    } else if (this.props.score >= 12) {
      return "#8BC34A";
    } else if (this.props.score >= 9) {
      return "#CDDC39";
    } else if (this.props.score >= 6) {
      return "#FFEB3B";
    } else if (this.props.score >= 3) {
      return "#FFC107";
    } else if (this.props.score >= 0) {
      return "#FF9800"
    } else {
      return "#f44336"
    }
  }

  getEmoji = () => {
    if (this.props.score >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.score >= 12) {
      return "em em-laughing";
    } else if (this.props.score >= 9) {
      return "em em-smiley";
    } else if (this.props.score >= 6) {
      return "em em-slightly_smiling_face";
    } else if (this.props.score >= 3) {
      return "em em-neutral_face";
    } else if (this.props.score >= 0) {
      return "em em-confused"
    } else {
      return "em em-angry"
    }
  }
  
  upvote = () => {
    this.props.updateScore(this.props.id, this.props.score + 1);
  }

  downvote = () => {
    this.props.updateScore(this.props.id, this.props.score - 1);
  }

  render() {
    const {joke} = this.props;
    return (
      <li className="Joke">
        <div className="Joke-score-div">
          <i onClick={this.upvote} className="Joke-buttons fas fa-arrow-up" />
          <span className="Joke-score" style={{borderColor: this.getColor()}}>{this.props.score}</span>
          <i onClick={this.downvote} className="Joke-buttons fas fa-arrow-down" />
        </div>
        <div className="Joke-text">{joke}</div>
        <div className="Joke-emoji" role="img" aria-label="rolling on floor laughing">
          <i className={this.getEmoji()}></i>
          </div>
      </li>
    )
  }
}
