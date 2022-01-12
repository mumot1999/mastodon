import React, { useEffect, useMemo, useState } from "react";
import { CONVERSATIONS_DELETE_SUCCESS } from "../../../actions/conversations";
import DropdownMenuContainer from "../../../containers/dropdown_menu_container";

type RemoteAccount = {
  origin: string;
  token: string;
  name: string;
};

type Props = {
  accounts: RemoteAccount[];
};

function useCheckedList(itemsS: string[]) {
  type Item = {
    action: Function;
    text: string;
    checked: boolean;
    id: number;
  };
  const [items, setItems] = useState<Item[]>([]);

  function isObjectPropEq<K extends string, AA extends any>(a: AA, key: K) {
    return function tap<A extends Record<K, any>>(fn: (a: A) => A) {
      return function getB(b: A): A {
        if (a === b[key]) {
          return fn(b);
        }

        return b;
      };
    };
  }

  function toggleProp<K extends string>(key: K) {
    return function m<O extends Record<K, any>>(item: O) {
      return { ...item, [key]: !item[key] };
    };
  }

  function handleAction(ref: Item["id"]) {
    setItems((x) => x.map(isObjectPropEq(ref, "id")(toggleProp("checked"))));
  }

  function itemGenerator() {
    let id = 0;
    return function getItem(text: string): Item {
      id++;
      const item = {
        text,
        action() {
          handleAction(id);
        },
      };
      return {
        id,
        checked: false,
        ...item,
      };
    };
  }

  useEffect(
    function updateItems() {
      const getItem = itemGenerator();
      setItems(itemsS.map(getItem));
    },
    [itemsS]
  );
  
  return items
}

export default function RemoteAccountsDropdownSelect(props: Props) {

  const menu = useCheckedList(["arek", "marek"])

  return (
    <div className="compose__action-bar">
      <div className="compose__action-bar-dropdown">
        <DropdownMenuContainer
          items={menu}
          icon="chevron-down"
          size={16}
          direction="right"
          status={undefined}
          scrollKey={undefined}
        />
      </div>
    </div>
  );
}
