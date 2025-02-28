// @ts-nocheck
import React, { useState } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import ImmutablePureComponent from "react-immutable-pure-component";
import { defineMessages, injectIntl, FormattedMessage } from "react-intl";
import IconButton from "mastodon/components/icon_button";
import Icon from "mastodon/components/icon";
import AutosuggestInput from "mastodon/components/autosuggest_input";
import classNames from "classnames";

const messages = defineMessages({
  option_placeholder: {
    id: "compose_form.poll.option_placeholder",
    defaultMessage: "Choice {number}",
  },
  add_option: {
    id: "compose_form.poll.add_option",
    defaultMessage: "Add a choice",
  },
  remove_option: {
    id: "compose_form.poll.remove_option",
    defaultMessage: "Remove this choice",
  },
  poll_duration: {
    id: "compose_form.poll.duration",
    defaultMessage: "Poll duration",
  },
  switchToMultiple: {
    id: "compose_form.poll.switch_to_multiple",
    defaultMessage: "Change poll to allow multiple choices",
  },
  switchToSingle: {
    id: "compose_form.poll.switch_to_single",
    defaultMessage: "Change poll to allow for a single choice",
  },
  minutes: {
    id: "intervals.full.minutes",
    defaultMessage: "{number, plural, one {# minute} other {# minutes}}",
  },
  hours: {
    id: "intervals.full.hours",
    defaultMessage: "{number, plural, one {# hour} other {# hours}}",
  },
  days: {
    id: "intervals.full.days",
    defaultMessage: "{number, plural, one {# day} other {# days}}",
  },
});

@injectIntl
class Option extends React.PureComponent<{
  checked: boolean;
  onChange: () => void;
}> {
  static propTypes = {
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isPollMultiple: PropTypes.bool,
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onToggleMultiple: PropTypes.func.isRequired,
    suggestions: ImmutablePropTypes.list,
    onClearSuggestions: PropTypes.func.isRequired,
    onFetchSuggestions: PropTypes.func.isRequired,
    onSuggestionSelected: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  handleOptionTitleChange = (e) => {
    this.props.onChange(this.props.index, e.target.value);
  };

  handleOptionRemove = () => {
    this.props.onRemove(this.props.index);
  };

  handleToggleMultiple = (e) => {
    this.props.onToggleMultiple();
    e.preventDefault();
    e.stopPropagation();
  };

  handleCheckboxKeypress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      this.handleToggleMultiple(e);
    }
  };

  onSuggestionsClearRequested = () => {
    this.props.onClearSuggestions();
  };

  onSuggestionsFetchRequested = (token) => {
    this.props.onFetchSuggestions(token);
  };

  onSuggestionSelected = (tokenStart, token, value) => {
    this.props.onSuggestionSelected(tokenStart, token, value, [
      "poll",
      "options",
      this.props.index,
    ]);
  };

  render() {
    const { isPollMultiple, title, index, autoFocus, intl } = this.props;

    return (
      <li>
        <label className="poll__option editable">
          <input
            style={{ display: "unset" }}
            type="checkbox"
            checked={this.props.checked}
            // className={classNames("poll__input", { checkbox: isPollMultiple })}
            onClick={this.props.onChange}
            // onKeyPress={this.handleCheckboxKeypress}
            title={intl.formatMessage(
              isPollMultiple
                ? messages.switchToSingle
                : messages.switchToMultiple
            )}
            aria-label={intl.formatMessage(
              isPollMultiple
                ? messages.switchToSingle
                : messages.switchToMultiple
            )}
          />

          {title}
        </label>

        <div className="poll__cancel">
          <IconButton
            disabled={index <= 1}
            title={intl.formatMessage(messages.remove_option)}
            icon="times"
            onClick={this.handleOptionRemove}
          />
        </div>
      </li>
    );
  }
}

export type ItemOption = {
  name: string;
  avatar: string;
  domain: string;
  id: number;
  checked: boolean;
};
const dummy = () => {};

@injectIntl
class RemoteAccountsForm extends ImmutablePureComponent<{
  options: ItemOption[];
  toggle: (id: number) => void;
}> {
  render() {
    const { options } = this.props;

    return (
      <div className="compose-form__poll-wrapper">
        <ul>
          {options
            .map((i) => ({ ...i, onChange: () => this.props.toggle(i.id) }))
            .map((item, i) => (
              <Option
                title={item.name}
                checked={item.checked}
                key={item.id}
                index={i}
                onChange={item.onChange}
                onRemove={dummy}
                isPollMultiple={true}
                autoFocus={false}
              />
            ))}
        </ul>
      </div>
    );
  }
}

export default RemoteAccountsForm;
