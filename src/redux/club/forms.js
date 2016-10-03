import { combineForms } from 'react-redux-form';


const initialLoginState = {
  name: '',
  master: false,
  remember: true,
};

export default combineForms({
  login: initialLoginState,
});
