import React from 'react';
import { connect } from 'react-redux';
import ImmutablePureComponent from 'react-immutable-pure-component';
import AutosuggestAccountContainer from '../../compose/containers/autosuggest_account_container';
import AutosuggestHashtag from '../../../components//autosuggest_hashtag';
import classNames from 'classnames';

const makeMapStateToProps = () => {
  const mapStateToProps = (state) => {
    //   console.log({state});
    return {
      searchValue: state.getIn(['search', 'value']),
      suggestions:
        state.getIn(['compose', 'initiator']) === 'search'
          ? state.getIn(['compose', 'suggestions'])
          : [],
    };
  };

  return mapStateToProps;
};

class SuggestionsContainer extends ImmutablePureComponent {

  componentDidUpdate(...args) {
    // eslint-disable-next-line no-console
    console.log({ args });
  }

  renderSuggestion = (suggestion, i) => {
    const { selectedSuggestion } = {};
    let inner, key;

    if (suggestion.type === 'hashtag') {
      inner = <AutosuggestHashtag tag={suggestion} />;
      key = suggestion.name;
    } else if (suggestion.type === 'account') {
      inner = <AutosuggestAccountContainer id={suggestion.id} />;
      key = suggestion.id;
    }

    return (
      <div
        role='button'
        tabIndex='0'
        key={key}
        data-index={i}
        className={classNames('autosuggest-textarea__suggestions__item', {
          selected: i === selectedSuggestion,
        })}
        style={{ padding: 10, cursor: 'pointer', borderRadius: 4 }}
        onMouseDown={this.onSuggestionClick}
      >
        {inner}
      </div>
    );
  };

  render() {
    // return <div>{this.props.searchValue}</div>;
    return (
      <div
        className='compose-form'
        style={{
          minHeight: 'unset',
          padding: 'unset',
          overflowY: 'unset',
          position: 'absolute',
          top: 65,
          width: '100%',
          zIndex: 99,
        }}
      >
        {/* <div
          className='compose-form__autosuggest-wrapper'
          key='autosuggest-wrapper'
          style={{background: 'unset'}}
        > */}
        <div
          className='autosuggest-textarea__suggestions-wrapper'
          key='suggestions-wrapper'
        >
          <div
            className='autosuggest-textarea__suggestions'
            style={{ display: 'unset', padding: 'unset' }}
          >
            {this.props.suggestions.map(this.renderSuggestion)}
          </div>
        </div>
        {/* </div> */}
      </div>
    );

    // return [

    // ];
  }

}

export default connect(makeMapStateToProps)(SuggestionsContainer);
