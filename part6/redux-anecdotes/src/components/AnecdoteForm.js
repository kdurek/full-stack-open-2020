import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = ({ createAnecdote }) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    createAnecdote(content);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};
const mapStateToProps = ({ anecdote }) => {
  return {
    anecdote,
  };
};

const ConnectedAnecdoteForm = connect(mapStateToProps, {
  createAnecdote,
})(AnecdoteForm);

export default ConnectedAnecdoteForm;
