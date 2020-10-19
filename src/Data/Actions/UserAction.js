import { useHistory } from "react-router-dom";
import { user } from "../../Api/UserApi";
import { onSettedUser } from "../UserReducer";

export const signIn = ({ email, password }) => async (dispatch) => {
  let result = await user.signIn("auth/signIn", { email, password });
  if (result.status) {
    dispatch(
      onSettedUser({
        authorization: result.payload.authorization,
        error: result.payload.error,
      })
    );
  } else {
    dispatch(onSettedUser({ authorization: false, error: result.payload.error }));
  }
};

export const signUp = ({ email, password }) => async (dispatch) => {
  let result = await user.signIn("auth/signUp", { email, password });
  if (result.status) {
    dispatch(
      onSettedUser({
        authorization: result.payload.authorization,
        error: result.payload.error,
      })
    );
  } else {
    dispatch(onSettedUser({ authorization: false, error: result.payload.error }));
  }
};

export const recoveryPassword = ({ email }) => async (dispatch) => {
  const result = await user.recoveryPassword("auth/recoveryPassword", { email });
  if (!result.payload.error) useHistory().push("/");
  return result;
};
export const changePassword = ({ oldPassword, newPassword }) => (dispatch) => {
  return user.changePassword("auth/changePassword", { oldPassword, newPassword });
};