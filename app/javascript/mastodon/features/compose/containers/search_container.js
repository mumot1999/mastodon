import { connect } from 'react-redux';
import {
  changeSearch,
  clearSearch,
  submitSearch,
  showSearch,
} from '../../../actions/search';

import { fetchComposeSuggestions } from '../../../actions/compose';
import Search from '../components/search';

const mapStateToProps = state => ({
  value: state.getIn(['search', 'value']),
  submitted: state.getIn(['search', 'submitted']),
});

const mapDispatchToProps = dispatch => ({

  onChange (value) {
    dispatch(changeSearch(value));
    dispatch(fetchComposeSuggestions(value, 'search'));
  },

  onClear () {
    dispatch(clearSearch());
  },

  onSubmit () {
    dispatch(submitSearch());
  },

  onShow () {
    dispatch(showSearch());
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
