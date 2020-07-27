import anecdoteService from "../services/anecdotes";
import { showNotification } from "../reducers/notificationReducer";

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data;

    case "VOTE":
      const id = action.data.id;
      return state.map((a) => (a.id === id ? action.data : a));
    case "CREATE_ANECDOTE":
      const anecdoteToAdd = action.data;
      return state.concat(anecdoteToAdd);

    default:
      return state;
  }
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const voteFor = (anecdote) => {
  return async (dispatch, getState) => {
    const anecdoteToChange = getState().anecdote.find(
      (a) => a.id === anecdote.id,
    );
    const votedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };
    const updatedAnecdote = await anecdoteService.update(
      anecdote.id,
      votedAnecdote,
    );
    dispatch({ type: "VOTE", data: updatedAnecdote });
    dispatch(showNotification(`You voted '${anecdote.content}'`, 5));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch({
      type: "CREATE_ANECDOTE",
      data: newAnecdote,
    });
    dispatch(showNotification(`You added '${content}'`, 5));
  };
};

export default reducer;
