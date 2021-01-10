import React from 'react';
import './index.css'

class EditUserItem extends React.Component {
    constructor(props) {
        super(props)
    }

 
    render() {
        return (
                    <tr key={this.props.id} id={this.props.id}> 
                    <td className="col-id">{this.props.id}</td>
                    <td className="col-name" onClick={() => {this.props.selectUser(this.props.user["Display Name"],this.props.id) } }>{this.props.user["Display Name"]} </td>
                    <td className="col-delete"> <img src="./ContactList/delete.png" className="btn-del"
                        onClick={() => { if (window.confirm('Are you sure to delete this user?')) this.props.deleteUser(this.props.user["Display Name"],this.props.id) } }>
                        </img></td>
                    <td className="col-edit"> <img src="./ContactList/edit.png" className="btn-ed"
                    onClick={() => {this.props.editUser(this.props.user["Display Name"],this.props.id) } }>
                    </img></td>
                </tr>
        );
    }
}

export default EditUserItem
    