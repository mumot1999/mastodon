import React from "react";
import { useStore } from "react-redux";
import RemoteAccountsDropdownSelect from "../components/remote_accounts_dropdown_select";

export default function RemoteAccountsDropdownSelectContainer() {
  const store = useStore();

  return <RemoteAccountsDropdownSelect accounts={[]} />;
}
