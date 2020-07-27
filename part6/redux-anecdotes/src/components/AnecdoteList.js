import React from "react";
import { connect, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = ({ showNotification, voteFor }) => {
  const anecdotes = useSelector((state) => state.anecdote);
  const filter = useSelector((state) => state.filter);

  const Anecdote = ({ anecdote }) => {
    const vote = (anecdote) => {
      voteFor(anecdote);

      showNotification(`You voted ${anecdote.content}`, 5);
    };

    return (
      <div>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    );
  };

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .filter((anecdote) => anecdote.content.toLowerCase().includes(filter))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <Anecdote anecdote={anecdote} />
          </div>
        ))}
    </>
  );
};

const mapStateToProps = ({ anecdote }) => {
  return {
    anecdote,
  };
};

const ConnectedAnecdoteList = connect(mapStateToProps, {
  voteFor,
  showNotification,
})(AnecdoteList);

export default ConnectedAnecdoteList;
