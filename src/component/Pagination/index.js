import React from 'react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setSelectedUsers } from '../../actions/user';

const limit = 5;
class Pagination extends React.Component {
  render() {
    const { offset, users } = this.props;
    const final = users.length / limit;

    let items;
    if (offset < 3) {
      items = [...new Set([1, 2, 3, '...', final])];
    } else if (offset > final - 2) {
      items = [...new Set([1, '...', final - 2, final - 1, final])];
    } else {
      items = [
        ...new Set([1, '...', offset - 1, offset, offset + 1, '... ', final])
      ];
    }

    return (
      <Menu pagination>
        {items.map(item => (
          <Menu.Item
            key={item}
            onClick={() => {
              if (typeof item === 'number') {
                this.props.setSelectedUsers(item);
              }
            }}
          >
            {item}
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}

export default connect(
  state => ({
    offset: state.users.offset,
    users: state.users.list
  }),
  {
    setSelectedUsers
  }
)(Pagination);
