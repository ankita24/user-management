import React from 'react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setSelectedUsers } from '../../actions/user';

const limit = 5;
class Pagination extends React.Component {
  handleChange = offset => {
    this.props.setSelectedUsers(offset).then(() => {
      this.props.handleChange();
    });
  };
  render() {
    const { offset, users } = this.props;
    const final = users.length / limit;

    let items;
    if (offset < 3) {
      items = ['Prev', 1, 2, 3, '...', final, 'Next'];
    } else if (offset > final - 2) {
      items = ['Prev', 1, '...', final - 2, final - 1, final, 'Next'];
    } else {
      items = [
        'Prev',
        1,
        '...',
        offset - 1,
        offset,
        offset + 1,
        '... ',
        final,
        'Next'
      ];
    }

    return (
      <Menu pagination>
        {items.map(item => (
          <Menu.Item
            key={item}
            active={offset === item}
            onClick={() => {
              if (typeof item === 'number') {
                this.handleChange(item);
              } else if (item === 'Prev' && offset > 1) {
                this.handleChange(offset - 1);
              } else if (item === 'Next' && offset < final) {
                this.handleChange(offset + 1);
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
