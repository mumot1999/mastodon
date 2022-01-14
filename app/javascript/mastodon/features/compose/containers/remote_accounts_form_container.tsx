import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { lookupAccount } from "../../../actions/accounts";
import { fetchRemoteAccounts } from "../../../actions/remote_accounts";
import { Account, Accounts } from "../../../reducers/remote_accounts";
import RemoteAccountsForm, {
  ItemOption,
} from "../components/remote_accounts_form";

function getAccountIdToOption(domain) {
  return function accountIdToOption(currentAccount, checked = false) {
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
  const accountIdToOption = getAccountIdToOption(domain);

  useEffect(
    function getOptions() {
      setOptions([
        accountIdToOption(accounts.get(me), true),
        ...(
          remote_accounts?.toJS?.().map((x: Account) =>
            accountIdToOption(
              accounts.find(
                (y) => y.get("acct") === `${x.remote_account_login}@${x.origin}`
              ),
              false
            )
          ) ?? []
        ).filter((x) => x),
      ] as ItemOption[]);
    },
    [me, remote_accounts, accounts]
  );

  const toggle = useCallback(function toggleOption(id: number) {
    setOptions(function toggle(items) {
      return items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
    });
  }, []);

  return <RemoteAccountsForm options={options} toggle={toggle} />;
}
