import React from "react";
import { connect } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";

const AnecdoteList = ({ anecdotesToShow, voteFor }) => {
  // const anecdotes = useSelector((state) => state.anecdote);
  // const filter = useSelector((state) => state.filter);

  const Anecdote = ({ anecdote }) => {
    const vote = (anecdote) => {
      voteFor(anecdote);
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
      {anecdotesToShow.map((anecdote) => (
        <div key={anecdote.id}>
          <Anecdote anecdote={anecdote} />
        </div>
      ))}
    </>
  );
};

// const mapStateToProps = ({ anecdote }) => {
//   return {
//     anecdote,
//   };
// };

const mapStateToProps = (state) => {
  const { anecdote, filter } = state;
  const anecdotesByVotesDesc = [...anecdote].sort((a, b) => b.votes - a.votes);
  const anecdotesToShow = anecdotesByVotesDesc.filter((a) => {
    if (filter === "") return true;
    return a.content.toLowerCase().includes(filter.toLowerCase());
  });

  return { anecdotesToShow };
};

const ConnectedAnecdoteList = connect(mapStateToProps, {
  voteFor,
})(AnecdoteList);

export default ConnectedAnecdoteList;
