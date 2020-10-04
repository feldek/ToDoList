import { user } from "../Api/UserApi";

const SET_USER = "SET_USER";
const CLEAR_DATA = "CLEAR_DATA";

let localStorage = JSON.parse(window.localStorage.getItem("persist:root"));
let initialState = localStorage
  ? localStorage.dataUser
  : {
      email: "",
      password: "",
      authorization: false,
      error: false,
    };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        email: action.email,
        password: action.password,
        authorization: action.authorization,
        error: action.error,
      };
    }
    case CLEAR_DATA: {
      let newState = [...action.state];
      return newState;
    }
    default:
      return state;
  }
};

export const clearData = (state) => {
  return {
    type: CLEAR_DATA,
    state,
  };
};
export const setUser = (email, password, authorization = false, error) => {
  return { type: SET_USER, email, password, authorization, error };
};

export const signIn = ({ email, password }) => (dispatch) => {
  return user.reqAutorization("users/signIn", { email, password }).then(
    (result) => {
      if (!result.error && result.authorization) {
        dispatch(setUser(email, password, true, result.error));
      } else {
        dispatch(setUser(email, password, false, result.error));
      }
    },
    (error) => {
      console.log(error);
    }
  );
};
export const signUp = ({ email, password }) => (dispatch) => {
  return user.reqAutorization("users/signUp", { email, password }).then(
    (result) => {
      if (!result.error && result.authorization) {
        dispatch(setUser(email, password, true, result.error));
      } else {
        dispatch(setUser(email, password, false, result.error));
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

export const recoveryPassword = ({ email }) => (dispatch) => {
  return user.reqRecoveryPassword({ email });
};
export const changePassword = ({ email, oldPassword, newPassword }) => (dispatch) => {
  return user.reqChangePassword({ email, oldPassword, newPassword });
};

export default UserReducer;
