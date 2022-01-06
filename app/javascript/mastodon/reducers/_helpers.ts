import { List } from "immutable";

export type Action<Name, Payload> = { type: Name; payload: Payload };
export function pick<K extends string>(k: K) {
  return function picker<T extends { [k in K]: any }>(obj: T) {
    return obj[k];
  };
}
export function reducer<State, Actions extends Action<string, any>>(
  initialState: State,
  actions: {
    [k in Actions as k["type"]]: (payload: k["payload"], state: State) => State;
  }
) {
  return function reduce(state = initialState, action: Actions) {
    const x = actions[action.type];
    return x(action.payload, state);
  };
}
export function MonadIO<T extends (...args: any) => any>(mainFN: T) {
  function chain<E, X>(fn: (el: X) => E) {
    return (el: Parameters<T>[0]) => fn(mainFN(el));
  }

  return { chain };
}
export function prop<T>(s: keyof T) {
  return MonadIO(function (o: T) {
    return o[s];
  });
}
export function notEq(s: any) {
  return function (n: any) {
    return s !== n;
  };
}

type ListItem<L> = L extends List<infer Element> ? Element : never;
export function filter<T extends (item: ListItem<L>) => boolean, L extends List<any>>(
  predicate: T
) {
  return function (list: L): L {
    return list.filter(predicate).toList() as L;
  };
}