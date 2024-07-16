import User from '../components/users/User';
import Admin from '../components/users/Admin';
import PropTypes from 'prop-types';
const Home = props => {
  return (
    <div data-theme={props.isDark ? 'dark' : 'light'}>
      {props.isLoading ? (
        <div className="loading">loading...</div>
      ) : props.user.type === 'admin' ? (
        <Admin />
      ) : (
        <User user={props.user} />
      )}
    </div>
  );
};

export default Home;
Home.propTypes = {
  user: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }),
  token: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isDark: PropTypes.bool.isRequired,
};
