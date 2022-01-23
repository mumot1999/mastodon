import api from "../api";
import { store } from "../containers/mastodon";

export function addAccount(apiKey: string, origin: string) {
  api(() => store).post("api/v2/remoteAccounts");
}
