import {
  FETCHDATAERROR,
  FETCHDATAREQUEST,
  FETCHDATASUCCESS,
} from "./actionTypes";
import axios from "axios";

export const loadingAction = () => {
  return { type: FETCHDATAREQUEST };
};

export const errorAction = () => {
  return { type: FETCHDATAERROR };
};

export const successAction = (data) => {
  return { type: FETCHDATASUCCESS, payload: data };
};

export const fetchData = (url, token) => async (dispatch) => {
  try {
    dispatch(loadingAction());

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(successAction(response.data));
  } catch (error) {
    console.error(error.message);
    dispatch(errorAction());
  }
};
