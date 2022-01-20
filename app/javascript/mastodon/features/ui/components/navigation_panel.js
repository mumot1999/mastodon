import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { FormattedMessage, injectIntl, defineMessages } from "react-intl";
import Icon from "mastodon/components/icon";
import { profile_directory, showTrends } from "mastodon/initial_state";
import NotificationsCounterIcon from "./notifications_counter_icon";
import FollowRequestsNavLink from "./follow_requests_nav_link";
import ListPanel from "./list_panel";
import TrendsContainer from "mastodon/features/getting_started/containers/trends_container";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const messages = defineMessages({
  changeNavPanel: {
    id: "navigation_bar.changeNavPanel",
    defaultMessage: "Change navigation panel",
  },
});

const panelHtmls = {
  home: (
    <NavLink
      className="column-link column-link--transparent"
      to="/home"
      data-preview-title-id="column.home"
      data-preview-icon="home"
    >
      <Icon className="column-link__icon" id="home" fixedWidth />
      <FormattedMessage id="tabs_bar.home" defaultMessage="Home" />
    </NavLink>
  ),
  notifications: (
    <NavLink
      className="column-link column-link--transparent"
      to="/notifications"
      data-preview-title-id="column.notifications"
      data-preview-icon="bell"
    >
      <NotificationsCounterIcon className="column-link__icon" />
      <FormattedMessage
        id="tabs_bar.notifications"
        defaultMessage="Notifications"
      />
    </NavLink>
  ),
  follow: <FollowRequestsNavLink />,
  local: (
    <NavLink
      className="column-link column-link--transparent"
      to="/public/local"
      data-preview-title-id="column.community"
      data-preview-icon="users"
    >
      <Icon className="column-link__icon" id="users" fixedWidth />
      <FormattedMessage id="tabs_bar.local_timeline" defaultMessage="Local" />
    </NavLink>
  ),
  federated: (
    <NavLink
      className="column-link column-link--transparent"
      exact
      to="/public"
      data-preview-title-id="column.public"
      data-preview-icon="globe"
    >
      <Icon className="column-link__icon" id="globe" fixedWidth />
      <FormattedMessage
        id="tabs_bar.federated_timeline"
        defaultMessage="Federated"
      />
    </NavLink>
  ),
  directMessages: (
    <NavLink
      className="column-link column-link--transparent"
      to="/conversations"
    >
      <Icon className="column-link__icon" id="envelope" fixedWidth />
      <FormattedMessage
        id="navigation_bar.direct"
        defaultMessage="Direct messages"
      />
    </NavLink>
  ),
  favourites: (
    <NavLink className="column-link column-link--transparent" to="/favourites">
      <Icon className="column-link__icon" id="star" fixedWidth />
      <FormattedMessage
        id="navigation_bar.favourites"
        defaultMessage="Favourites"
      />
    </NavLink>
  ),
  bookmarks: (
    <NavLink className="column-link column-link--transparent" to="/bookmarks">
      <Icon className="column-link__icon" id="bookmark" fixedWidth />
      <FormattedMessage
        id="navigation_bar.bookmarks"
        defaultMessage="Bookmarks"
      />
    </NavLink>
  ),
  lists: (
    <NavLink className="column-link column-link--transparent" to="/lists">
      <Icon className="column-link__icon" id="list-ul" fixedWidth />
      <FormattedMessage id="navigation_bar.lists" defaultMessage="Lists" />
    </NavLink>
  ),
  profileDirectory: (
    <NavLink className="column-link column-link--transparent" to="/directory">
      <Icon className="column-link__icon" id="address-book-o" fixedWidth />
      <FormattedMessage
        id="getting_started.directory"
        defaultMessage="Profile directory"
      />
    </NavLink>
  ),
};

const panel = {
  home: {
    visible: false,
    position: 0,
  },
  notifications: {
    visible: true,
    position: 1,
  },
  follow: {
    visible: true,
    poition: 2,
  },
  local: {
    visible: true,
    position: 3,
  },
  federated: {
    visible: true,
    position: 4,
  },
  directMessages: {
    visible: true,
    position: 5,
  },
  favourites: {
    visible: true,
    position: 6,
  },
  bookmarks: {
    visible: true,
    position: 7,
  },
  lists: {
    visible: true,
    position: 8,
  },
  profileDirectory: {
    visible: true,
    position: 9,
  },
};

const changePanelHtmls = {
  home: (
    <h1 className="column-link column-link--transparent">
      <Icon className="column-link__icon" id="home" fixedWidth />
      <FormattedMessage id="tabs_bar.home" defaultMessage="Home" />
    </h1>
  ),
  notifications: (
    <h1 className="column-link column-link--transparent">
      <NotificationsCounterIcon className="column-link__icon" />
      <FormattedMessage
        id="tabs_bar.notifications"
        defaultMessage="Notifications"
      />
    </h1>
  ),
  follow: <FollowRequestsNavLink />,
  local: (
    <h1 className="column-link column-link--transparent">
      <Icon className="column-link__icon" id="users" fixedWidth />
      <FormattedMessage id="tabs_bar.local_timeline" defaultMessage="Local" />
    </h1>
  ),
  federated: (
    <h1 className="column-link column-link--transparent">
      <Icon className="column-link__icon" id="globe" fixedWidth />
      <FormattedMessage
        id="tabs_bar.federated_timeline"
        defaultMessage="Federated"
      />
    </h1>
  ),
  directMessages: (
    <h1 className="column-link column-link--transparent">
      <Icon className="column-link__icon" id="envelope" fixedWidth />
      <FormattedMessage
        id="navigation_bar.direct"
        defaultMessage="Direct messages"
      />
    </h1>
  ),
  favourites: (
    <h1 className="column-link column-link--transparent">
      <Icon className="column-link__icon" id="star" fixedWidth />
      <FormattedMessage
        id="navigation_bar.favourites"
        defaultMessage="Favourites"
      />
    </h1>
  ),
  bookmarks: (
    <h1 className="column-link column-link--transparent">
      <Icon className="column-link__icon" id="bookmark" fixedWidth />
      <FormattedMessage
        id="navigation_bar.bookmarks"
        defaultMessage="Bookmarks"
      />
    </h1>
  ),
  lists: (
    <h1 className="column-link column-link--transparent">
      <Icon className="column-link__icon" id="list-ul" fixedWidth />
      <FormattedMessage id="navigation_bar.lists" defaultMessage="Lists" />
    </h1>
  ),
  profileDirectory: (
    <h1 className="column-link column-link--transparent">
      <Icon className="column-link__icon" id="address-book-o" fixedWidth />
      <FormattedMessage
        id="getting_started.directory"
        defaultMessage="Profile directory"
      />
    </h1>
  ),
};

const NavigationPanel = (props) => {
  const { intl } = props;

  const changeNavPanel = intl.formatMessage(messages.changeNavPanel);

  const [changePanel, setChangePanel] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const handleClick = () => {
    setChangePanel(!changePanel);
    console.log(changePanel);
  };

  const changeHomeClick = () => {
    panel.home.visible = !panel.home.visible;
    setCheckbox(!checkbox);
  };

  const changeNotificationsClick = () => {
    panel.notifications.visible = !panel.notifications.visible;
    setCheckbox(!checkbox);
  };

  const changeLocalClick = () => {
    panel.local.visible = !panel.local.visible;
    setCheckbox(!checkbox);
  };

  const changeFederatedClick = () => {
    panel.federated.visible = !panel.federated.visible;
    setCheckbox(!checkbox);
  };

  // const changeFollowClick = () => {
  //   panel.follow.visible = !panel.follow.visible;
  // };

  const changeDirectMessagesClick = () => {
    panel.directMessages.visible = !panel.directMessages.visible;
    setCheckbox(!checkbox);
  };

  const changeFavouritesClick = () => {
    panel.favourites.visible = !panel.favourites.visible;
    setCheckbox(!checkbox);
  };

  const changeBookmarksClick = () => {
    panel.bookmarks.visible = !panel.bookmarks.visible;
    setCheckbox(!checkbox);
  };

  const changeListsClick = () => {
    panel.lists.visible = !panel.lists.visible;
    setCheckbox(!checkbox);
  };

  const changeProfileDirectoryClick = () => {
    panel.profileDirectory.visible = !panel.profileDirectory.visible;
    setCheckbox(!checkbox);
  };

  useEffect(() => {}, [changePanel, checkbox]);

  return (
    <div className="navigation-panel">
      <div>
        {!changePanel ? (
          <div>
            {panel.home.visible && panelHtmls.home}
            {panel.notifications.visible && panelHtmls.notifications}
            {panel.follow.visible && panelHtmls.follow}
            {panel.local.visible && panelHtmls.local}
            {panel.federated.visible && panelHtmls.federated}
            {panel.directMessages.visible && panelHtmls.directMessages}
            {panel.favourites.visible && panelHtmls.favourites}
            {panel.bookmarks.visible && panelHtmls.bookmarks}
            {panel.lists.visible && panelHtmls.lists}
            {panel.profileDirectory.visible &&
              profile_directory &&
              panelHtmls.profileDirectory}
          </div>
        ) : (
          <ul>
            <li>
              {changePanelHtmls.home}
              <label>
                <input
                  type="checkbox"
                  defaultChecked={panel.home.visible === true}
                  onChange={changeHomeClick}
                />
                {!panel.home.visible ? "Dodaj" : "Usuń"}
              </label>
            </li>
            <li>
              {changePanelHtmls.notifications}
              <label>
                <input
                  type="checkbox"
                  defaultChecked={panel.notifications.visible === true}
                  onChange={changeNotificationsClick}
                />
                {!panel.notifications.visible ? "Dodaj" : "Usuń"}
              </label>
            </li>
            {/* <li>
              {changePanelHtmls.follow}
              <label>
                <input
                  type="checkbox"
                  defaultChecked={panel.follow.visible === true}
                  onChange={changeFollowClick}
                />
                {!panel.follow.visible ? "Dodaj" : "Usuń"}
              </label>
            </li> */}
            <li>
              {changePanelHtmls.local}
              <label>
                <input
                  type="checkbox"
                  defaultChecked={panel.local.visible === true}
                  onChange={changeLocalClick}
                />
                {!panel.local.visible ? "Dodaj" : "Usuń"}
              </label>
            </li>
            <li>
              {changePanelHtmls.federated}
              <label>
                <input
                  type="checkbox"
                  defaultChecked={panel.federated.visible === true}
                  onChange={changeFederatedClick}
                />
                {!panel.federated.visible ? "Dodaj" : "Usuń"}
              </label>
            </li>
            <li>
              {changePanelHtmls.directMessages}
              <label>
                <input
                  type="checkbox"
                  defaultChecked={panel.directMessages.visible === true}
                  onChange={changeDirectMessagesClick}
                />
                {!panel.directMessages.visible ? "Dodaj" : "Usuń"}
              </label>
            </li>
            <li>
              {changePanelHtmls.favourites}
              <label>
                <input
                  type="checkbox"
                  defaultChecked={panel.favourites.visible === true}
                  onChange={changeFavouritesClick}
                />
                {!panel.favourites.visible ? "Dodaj" : "Usuń"}
              </label>
            </li>
            <li>
              {changePanelHtmls.bookmarks}
              <label>
                <input
                  type="checkbox"
                  defaultChecked={panel.bookmarks.visible === true}
                  onChange={changeBookmarksClick}
                />
                {!panel.bookmarks.visible ? "Dodaj" : "Usuń"}
              </label>
            </li>
            <li>
              {changePanelHtmls.lists}
              <label>
                <input
                  type="checkbox"
                  defaultChecked={panel.lists.visible === true}
                  onChange={changeListsClick}
                />
                {!panel.lists.visible ? "Dodaj" : "Usuń"}
              </label>
            </li>
            <li>
              {profile_directory && changePanelHtmls.profileDirectory}
              <label>
                <input
                  type="checkbox"
                  defaultChecked={panel.profileDirectory.visible === true}
                  onChange={changeProfileDirectoryClick}
                />
                {!panel.profileDirectory.visible ? "Dodaj" : "Usuń"}
              </label>
            </li>
          </ul>
        )}
      </div>

      <h1
        className="column-link column-link--transparent"
        title={changeNavPanel}
        onClick={handleClick}
      >
        <Icon className="column-link__icon" id="pencil" fixedWidth />
        {changeNavPanel}
      </h1>

      <ListPanel />

      <hr />

      <a
        className="column-link column-link--transparent"
        href="/settings/preferences"
      >
        <Icon className="column-link__icon" id="cog" fixedWidth />
        <FormattedMessage
          id="navigation_bar.preferences"
          defaultMessage="Preferences"
        />
      </a>
      <a className="column-link column-link--transparent" href="/relationships">
        <Icon className="column-link__icon" id="users" fixedWidth />
        <FormattedMessage
          id="navigation_bar.follows_and_followers"
          defaultMessage="Follows and followers"
        />
      </a>

      {showTrends && <div className="flex-spacer" />}
      {showTrends && <TrendsContainer />}
    </div>
  );
};

export default withRouter(injectIntl(NavigationPanel));
