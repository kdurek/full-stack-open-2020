const initialState = "";

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION": {
      clearTimeout(state.delay);
      return action.data.message;
    }
    case "HIDE_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

export const showNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_NOTIFICATION",
      data: {
        message,
        delay: setTimeout(() => {
          dispatch(hideNotification(""));
        }, delay * 1000),
      },
    });
  };
};

export const hideNotification = () => {
  return {
    type: "HIDE_NOTIFICATION",
  };
};

export default notificationReducer;
