import { AxiosResponse } from "axios";
import api from "../api";
import { createAction } from "../reducers/remote_accounts";

export const addAccount = createAction("addAccount");
export const removeAccount = createAction("removeAccount");

export function fetchRemoteAccounts() {
  return (dispatch, getState) => {
    return api(getState)
      .get(`/api/v1/remote_accounts`)
      .then((response) => {
        response.data.forEach((account) => dispatch(addAccount(account)));
        return response as AxiosResponse<
          {
            id: number;
            account_id: number;
            token: string;
            origin: string;
            remote_account_id: string;
            remote_account_login: string;
          }[]
        >;
      });
  };
}
