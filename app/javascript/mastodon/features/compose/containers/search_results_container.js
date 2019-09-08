import { connect } from 'react-redux';
import SearchResults from '../components/search_results';
import { fetchTrends } from '../../../actions/trends';
import { fetchSuggestions, dismissSuggestion } from '../../../actions/suggestions';

const mapStateToProps = state => ({
  results: state.getIn(['search', 'results']),
  suggestions: state.getIn(['suggestions', 'items']),
  trends: state.getIn(['trends', 'items']),
  searchTerm: state.getIn(['search', 'searchTerm']),
});

const mapDispatchToProps = dispatch => ({
  fetchTrends: () => dispatch(fetchTrends()),
  fetchSuggestions: () => dispatch(fetchSuggestions()),
  dismissSuggestion: account => dispatch(dismissSuggestion(account.get('id'))),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
