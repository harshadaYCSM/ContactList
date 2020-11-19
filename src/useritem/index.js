import React from 'react';
import './index.css'

class UserItem extends React.Component {
    constructor(props) {
        super(props)
    }

 
    render() {
        return (
                <tr key={this.props.user.id} id={this.props.user.id}> {this.props.user.id}
                    <td onClick={() => {this.props.selectUser(this.props.user["Display Name"]) } }>{this.props.user["Display Name"]} </td>
                    <td> <img src="delete.png"
                        className="btn-del"
                        onClick={() => { if (window.confirm('Are you sure to delete this user?')) this.props.deleteUser(this.props.user["Display Name"]) } }></img></td>
                    <td>
                    {/* <button 
                        className="btn-select"
                        onClick={() => {this.props.selectUser(this.props.user.id) } }>Select User</button> */}
                    </td>
                </tr>
        );
    }
}

export default UserItem
    