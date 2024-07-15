import React from 'react';
import PropTypes from 'prop-types';
import {useFetchUsersQuery} from '../slices/usersApi';
const Users = ({user, token}) => {
  const {data} = useFetchUsersQuery();
  console.log(data);
  return <div>Users</div>;
};
export default Users;

Users.propTypes = {
  user: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }),
  token: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isDark: PropTypes.bool.isRequired,
};