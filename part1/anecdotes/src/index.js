import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const randomAnecdote = () => Math.floor(Math.random() * anecdotes.length)

const App = props => {
  const defaultVotes = new Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(defaultVotes)
  const handleVoteClick = () => {
    let newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]}
        <br/>has {votes[selected]} votes
        <br/><button onClick={handleVoteClick}>vote</button>
        <button onClick={() => {setSelected(randomAnecdote())}}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        {props.anecdotes[votes.indexOf(Math.max.apply(Math, votes))]}
        <br />has {Math.max.apply(Math, votes)} votes
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);