import React from 'react';
import { connect } from 'react-redux';

const limit = 5;
function Counter({ offset, length }) {
  return length > 0 ? (
    <span style={{ paddingLeft: '1rem' }}>
      {(offset - 1) * limit + 1} - {offset * limit} of {length}
    </span>
  ) : null;
}

export default connect(state => ({
  offset: state.users.offset,
  length: state.users.list.length
}))(Counter);
