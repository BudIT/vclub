import { connect } from 'react-redux';
import Root from './ClubLayout';


export default connect(
  state => ({ ...state })
)(Root);
