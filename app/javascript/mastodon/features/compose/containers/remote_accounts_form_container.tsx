import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { lookupAccount } from "../../../actions/accounts";
import { addRemoteAccount } from "../../../actions/compose";
import { fetchRemoteAccounts } from "../../../actions/remote_accounts";
import { Account, Accounts } from "../../../reducers/remote_accounts";
import RemoteAccountsForm, {
  ItemOption,
} from "../components/remote_accounts_form";

function getAccountIdToOption() {
  return function accountIdToOption(
    currentAccount,
    domain: string,
    checked = false
  ) {
    if (currentAccount) {
      return {
        name: currentAccount.get("username"),
        avatar: currentAccount.get("avatar"),
        checked,
        domain,
        id: currentAccount.get("id"),
      } as ItemOption;
    }
  };
}

export default function RemoteAccountsFormContainer() {
  const store = useStore();
  const state = store.getState();
  const me = useSelector((s: any) => s.getIn(["meta", "me"]));
  const domain = state.getIn(["meta", "domain"]);
  const remote_accounts: Accounts = useSelector(
    (s: any) => s.get("remote_accounts").accounts ?? []
  );
  const accounts = useSelector((s: any) => s.get("accounts"));

  useEffect(function fetchRemoteAccounts_() {
    fetchRemoteAccounts()(store.dispatch, store.getState).then((res) =>
      res.data.forEach((i) =>
        lookupAccount(`${i.remote_account_login}@${i.origin}`)(
          store.dispatch,
          store.getState
        )
      )
    );
  }, []);

  const [options, setOptions] = useState<ItemOption[]>([]);
  const accountIdToOption = getAccountIdToOption();

  useEffect(
    function getOptions() {
      setOptions([
        // accountIdToOption(accounts.get(me), true),
        ...(
          remote_accounts?.toJS?.().map((x: Account) => {
            const account = accounts.find(
              (y) => y.get("acct") === `${x.remote_account_login}@${x.origin}`
            );
            if (account)
              return {
                name: account.get("username"),
                avatar: account.get("avatar"),
                checked: false,
                domain: x.origin,
                id: x.id,
              } as ItemOption;
          }) ?? []
        ).filter((x) => x),
      ] as ItemOption[]);
    },
    [me, remote_accounts, accounts]
  );

  const toggle = useCallback(function toggleOption(id: number) {
    setOptions(function toggle(items) {
      return items.map((item) => {
        if (item.id === id) {
          store.dispatch(addRemoteAccount(id, !item.checked));
          return { ...item, checked: !item.checked };
        }
        return item;
      });
    });
  }, []);

  if (options.length > 0) {
    return (
      <RemoteAccountsForm
        options={options.map((o) => ({ ...o, name: `${o.name}@${o.domain}` }))}
        toggle={toggle}
      />
    );
  }

  return null;
}
