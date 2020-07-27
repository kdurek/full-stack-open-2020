import React from "react";
import { connect, useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = ({ showNotification }) => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    showNotification(`You added ${content}`, 5);
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
  showNotification,
})(AnecdoteForm);

export default ConnectedAnecdoteForm;
