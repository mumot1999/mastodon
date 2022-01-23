import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import Icon from 'mastodon/components/icon';
import { profile_directory, showTrends } from 'mastodon/initial_state';
import NotificationsCounterIcon from './notifications_counter_icon';
import FollowRequestsNavLink from './follow_requests_nav_link';
import ListPanel from './list_panel';
import TrendsContainer from 'mastodon/features/getting_started/containers/trends_container';
import { DragDropContext } from 'react-beautiful-dnd';
import IconButton from '../../../components/icon_button';
import { useState, useEffect } from 'react';

const messages = defineMessages({
  changeNavPanel: { id: "navigation_bar.changeNavPanel", defaultMessage: "Change navigation panel" },
});

const NavigationPanel = (props) => {

  const { intl } = props;

  const changeNavPanel = intl.formatMessage(messages.changeNavPanel);

  const [changePanel, setChangePanel] = useState(false);

  const handleClick = () => {
    console.log(changePanel);
    setChangePanel(!changePanel);
    console.log(changePanel);
  }

  return (
    <div className='navigation-panel'>
      <NavLink className='column-link column-link--transparent' to='/home' data-preview-title-id='column.home' data-preview-icon='home' ><Icon className='column-link__icon' id='home' fixedWidth /><FormattedMessage id='tabs_bar.home' defaultMessage='Home' /></NavLink>
      <NavLink className='column-link column-link--transparent' to='/notifications' data-preview-title-id='column.notifications' data-preview-icon='bell' ><NotificationsCounterIcon className='column-link__icon' /><FormattedMessage id='tabs_bar.notifications' defaultMessage='Notifications' /></NavLink>
      <FollowRequestsNavLink />
      <NavLink className='column-link column-link--transparent' to='/public/local' data-preview-title-id='column.community' data-preview-icon='users' ><Icon className='column-link__icon' id='users' fixedWidth /><FormattedMessage id='tabs_bar.local_timeline' defaultMessage='Local' /></NavLink>
      <NavLink className='column-link column-link--transparent' exact to='/public' data-preview-title-id='column.public' data-preview-icon='globe' ><Icon className='column-link__icon' id='globe' fixedWidth /><FormattedMessage id='tabs_bar.federated_timeline' defaultMessage='Federated' /></NavLink>
      <NavLink className='column-link column-link--transparent' to='/conversations'><Icon className='column-link__icon' id='envelope' fixedWidth /><FormattedMessage id='navigation_bar.direct' defaultMessage='Direct messages' /></NavLink>
      <NavLink className='column-link column-link--transparent' to='/favourites'><Icon className='column-link__icon' id='star' fixedWidth /><FormattedMessage id='navigation_bar.favourites' defaultMessage='Favourites' /></NavLink>
      <NavLink className='column-link column-link--transparent' to='/bookmarks'><Icon className='column-link__icon' id='bookmark' fixedWidth /><FormattedMessage id='navigation_bar.bookmarks' defaultMessage='Bookmarks' /></NavLink>
      <NavLink className='column-link column-link--transparent' to='/lists'><Icon className='column-link__icon' id='list-ul' fixedWidth /><FormattedMessage id='navigation_bar.lists' defaultMessage='Lists' /></NavLink>
      {profile_directory && <NavLink className='column-link column-link--transparent' to='/directory'><Icon className='column-link__icon' id='address-book-o' fixedWidth /><FormattedMessage id='getting_started.directory' defaultMessage='Profile directory' /></NavLink>}

      <ListPanel />

      <hr />

      <a className='column-link column-link--transparent' href='/settings/preferences'><Icon className='column-link__icon' id='cog' fixedWidth /><FormattedMessage id='navigation_bar.preferences' defaultMessage='Preferences' /></a>
      <a className='column-link column-link--transparent' href='/relationships'><Icon className='column-link__icon' id='users' fixedWidth /><FormattedMessage id='navigation_bar.follows_and_followers' defaultMessage='Follows and followers' /></a>

      <h className='column-link column-link--transparent' title={changeNavPanel} onClick={handleClick}><Icon className='column-link__icon' id='pencil' fixedWidth />{changeNavPanel}</h>

      {showTrends && <div className='flex-spacer' />}
      {showTrends && <TrendsContainer />}
    </div>
  );
};

export default withRouter(injectIntl(NavigationPanel));
