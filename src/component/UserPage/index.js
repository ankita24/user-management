import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Input, Table } from 'semantic-ui-react';
import { fetchUser, setSelectedUsers } from '../../actions/user';
import Pagination from '../Pagination';
import './user.css';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onSortNumber = this.onSortNumber.bind(this);
  }
  componentDidMount() {
    this.props.fetchUser().then(() => {
      this.props.setSelectedUsers();
    });
  }
  handleClick(user) {
    this.props.history.push(`user/${user.id}`, user);
  }
  handleChange(e) {
    this.setState({
      search: e.target.value
    });
  }
  onSort(e, sortKey) {
    const data = this.props.selectedUsers;
    data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));

    this.setState({ data });
  }
  onSortNumber(e, sortKey) {
    const data = this.props.selectedUsers;
    data.sort((a, b) => a[sortKey] - b[sortKey]);
    this.setState({ data });
  }
  render() {
    return (
      <Container fluid>
        <Input
          name="search"
          icon="search"
          placeholder="Search..."
          value={this.state.search}
          onChange={this.handleChange}
        />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell onClick={e => this.onSort(e, 'first_name')}>
                First Name
              </Table.HeaderCell>
              <Table.HeaderCell onClick={e => this.onSort(e, 'last_name')}>
                Last Name
              </Table.HeaderCell>
              <Table.HeaderCell onClick={e => this.onSort(e, 'company_name')}>
                Company Name
              </Table.HeaderCell>
              <Table.HeaderCell onClick={e => this.onSort(e, 'city')}>
                City
              </Table.HeaderCell>
              <Table.HeaderCell onClick={e => this.onSort(e, 'state')}>
                State
              </Table.HeaderCell>
              <Table.HeaderCell onClick={e => this.onSortNumber(e, 'zip')}>
                ZIP
              </Table.HeaderCell>
              <Table.HeaderCell onClick={e => this.onSort(e, 'email')}>
                Email
              </Table.HeaderCell>
              <Table.HeaderCell onClick={e => this.onSort(e, 'web')}>
                Web
              </Table.HeaderCell>
              <Table.HeaderCell onClick={e => this.onSortNumber(e, 'age')}>
                Age
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.selectedUsers.map(user => {
              if (!this.state.search) {
                return (
                  <Table.Row
                    key={user.id}
                    onClick={() => this.handleClick(user)}
                  >
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
              } else if (
                user.first_name.toLowerCase() == this.state.search.toLowerCase()
              ) {
                return (
                  <Table.Row
                    key={user.id}
                    onClick={() => this.handleClick(user)}
                  >
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
              }
            })}
          </Table.Body>
        </Table>
        {this.props.selectedUsers.length ? <Pagination /> : null}
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
