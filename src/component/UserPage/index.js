import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Input, Table } from 'semantic-ui-react';
import { fetchUser, setSelectedUsers } from '../../actions/user';
import { sortBy } from '../../util';
import Counter from '../Counter';
import Pagination from '../Pagination';
import './user.css';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: '',
      column: null,
      direction: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSort = this.onSort.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    this.props
      .fetchUser()
      .then(() => {
        return this.props.setSelectedUsers();
      })
      .then(() => {
        this.setState({
          data: this.props.selectedUsers
        });
      });
  }

  handleClick(user) {
    this.props.history.push(`user/${user.id}`, user);
  }
  handleChange(e) {
    this.setState({
      search: e.target.value,
      data: this.props.selectedUsers.filter(
        user => user.first_name.toLowerCase().indexOf(e.target.value) > -1
      )
    });
  }
  onSort(e, clickedColumn) {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: data.concat().sort(sortBy[clickedColumn]),
        direction: 'ascending'
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });
  }

  handlePageChange() {
    this.setState({
      data: this.props.selectedUsers,
      search: '',
      column: null,
      direction: null
    });
  }
  render() {
    const { column, direction } = this.state;
    return (
      <Container fluid>
        <Input
          name="search"
          icon="search"
          placeholder="Search..."
          value={this.state.search}
          onChange={this.handleChange}
        />
        <Counter />
        <Table celled sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'first_name' ? direction : null}
                onClick={e => this.onSort(e, 'first_name')}
              >
                First Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'last_name' ? direction : null}
                onClick={e => this.onSort(e, 'last_name')}
              >
                Last Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'company_name' ? direction : null}
                onClick={e => this.onSort(e, 'company_name')}
              >
                Company Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'city' ? direction : null}
                onClick={e => this.onSort(e, 'city')}
              >
                City
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'state' ? direction : null}
                onClick={e => this.onSort(e, 'state')}
              >
                State
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'zip' ? direction : null}
                onClick={e => this.onSort(e, 'zip')}
              >
                ZIP
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'email' ? direction : null}
                onClick={e => this.onSort(e, 'email')}
              >
                Email
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'web' ? direction : null}
                onClick={e => this.onSort(e, 'web')}
              >
                Web
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'age' ? direction : null}
                onClick={e => this.onSort(e, 'age')}
              >
                Age
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.data.map(user => {
              return (
                <Table.Row key={user.id} onClick={() => this.handleClick(user)}>
                  <Table.Cell>{user.first_name}</Table.Cell>
                  <Table.Cell>{user.last_name}</Table.Cell>
                  <Table.Cell>{user.company_name}</Table.Cell>
                  <Table.Cell>{user.city}</Table.Cell>
                  <Table.Cell>{user.state}</Table.Cell>
                  <Table.Cell>{user.zip}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.web}</Table.Cell>
                  <Table.Cell>{user.age}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        {this.props.selectedUsers.length ? (
          <Pagination handleChange={this.handlePageChange} />
        ) : null}
      </Container>
    );
  }
}

export default connect(
  state => ({
    selectedUsers: state.users.selectedList,
    list: state.users.list
  }),
  {
    fetchUser,
    setSelectedUsers
  }
)(UserPage);
