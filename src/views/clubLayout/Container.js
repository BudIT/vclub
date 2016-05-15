import { connect } from 'react-redux';
import Root from './ClubLayoutRoot';


export default connect(
  (state) => ({ ...state })
)(Root);
