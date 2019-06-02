import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

export default class UserDetails extends Component {
  componentDidMount() {
    if (
      !(
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.id
      )
    ) {
      this.props.history.push('/');
    }
  }
  render() {
    return (
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={2}>
              {this.props.location.state.first_name +
                '   ' +
                this.props.location.state.last_name}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Company</Table.Cell>
            <Table.Cell>{this.props.location.state.company_name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>City</Table.Cell>
            <Table.Cell>{this.props.location.state.city}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>State</Table.Cell>
            <Table.Cell>{this.props.location.state.state}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>ZIP</Table.Cell>
            <Table.Cell>{this.props.location.state.zip}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Email</Table.Cell>
            <Table.Cell>{this.props.location.state.email}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Web</Table.Cell>
            <Table.Cell>{this.props.location.state.web}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Age</Table.Cell>
            <Table.Cell>{this.props.location.state.age}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}
