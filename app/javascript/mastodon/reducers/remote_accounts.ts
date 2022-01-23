import { pipe } from "fp-ts/lib/function";
import { List } from "immutable";
import {
  Action,
  filter,
  getActionFunctor,
  notEq,
  pick,
  prop,
  reducer,
} from "./_helpers";

export type MultipleAccountsAction =
  | Action<"addAccount", Account>
  | Action<"removeAccount", Account["token"]>;

export type Account = {
  id: number;
  account_id: number;
  token: string;
  origin: string;
  remote_account_id: string;
  remote_account_login: string;
};

export type Accounts = List<Account>;

export const getDisplayName = pick("displayName");
export const getToken = pick("token");
export const getOriginMastodonServer = pick("originMastodonServer");
export const getAccounts = pick("accounts");

const initialState = {
  accounts: List<Account>([]),
};

export default reducer<typeof initialState, MultipleAccountsAction>(
  initialState,
  {
    addAccount(newAccount, { accounts, ...s }) {
      return { ...s, accounts: accounts.push(newAccount) };
    },
    removeAccount(token, s) {
      const accounts = pipe(
        s,
        pick("accounts"),
        filter(prop("token").chain(notEq(token)))
      );

      return { ...s, accounts };
    },
  }
);

export const createAction = getActionFunctor<MultipleAccountsAction>();
