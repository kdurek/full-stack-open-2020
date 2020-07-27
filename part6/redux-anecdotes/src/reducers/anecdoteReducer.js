import anecdoteService from "../services/anecdotes";

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
      const id = action.anecdote.id;
      const anecdoteToVote = state.find((a) => a.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };

      return state.map((a) => (a.id === id ? votedAnecdote : a));
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
  return {
    type: "VOTE",
    anecdote,
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "CREATE_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export default reducer;
