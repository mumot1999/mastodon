import { List } from "immutable";
import reducer from "../multiple_accounts";
it("adds account to list", () => {
  expect(
    reducer(
      { accounts: List([]) },
      {
        payload: {
          displayName: "account1",
          originMastodonServer: "url",
          token: "apikey",
        },
        type: "addAccount",
      }
    )
  ).toMatchObject({
    accounts: List([
      {
        displayName: "account1",
        originMastodonServer: "url",
        token: "apikey",
      },
    ]),
  });
});

it("removes account", () => {
  expect(
    reducer(
      {
        accounts: List([
          {
            displayName: "account1",
            originMastodonServer: "url",
            token: "apikey",
          },
        ]),
      },
      {
        payload: "url",
        type: "removeAccount",
      }
    )
  ).toMatchObject({
    accounts: List([]),
  });
});
