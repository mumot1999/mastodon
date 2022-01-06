import { pipe } from "fp-ts/lib/function";
import { List } from "immutable";
import { Action, filter, notEq, pick, prop, reducer } from "./_helpers";

export type MultipleAccountsAction =
  | Action<"addAccount", Account>
  | Action<"removeAccount", Account["token"]>;

export type Account = {
  displayName: string;
  token: string;
  originMastodonServer: string;
};

export const getDisplayName = pick("displayName");
export const getToken = pick("token");
export const getOriginMastodonServer = pick("originMastodonServer");
export const getAccounts = pick("accounts");

const initialState = {
  accounts: List<Account>([]),
};


export default reducer<typeof initialState, MultipleAccountsAction>(initialState, {
  addAccount(newAccount, { accounts, ...s }) {
    return { ...s, accounts: accounts.push(newAccount) };
  },
  removeAccount(accountId, s) {
    const accounts = pipe(
      s,
      pick("accounts"),
      filter(prop("originMastodonServer").chain(notEq(accountId)))
    );

    return { ...s, accounts };
  },
});

