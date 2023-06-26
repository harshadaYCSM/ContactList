import React from 'react';
import './index.css'

class UserItem extends React.Component {
    constructor(props) {
        super(props)
    }

 // flex-col flex-wrap justify-evenly
 // flex mb-4 flex-wrap divide-x divide-indigo-500 divide-y divide-indigo-500
    render() {
        return (
            <div className="user-item">
                <tr className="user-item-row" 
                key={this.props.id} id={this.props.id}> 
                    <td className="serialNumber">{this.props.id}</td>
                    <td className="name" 
                    onClick={() => {this.props.selectUser(this.props.user["Display Name"],this.props.id) } }>
                        {(this.props.editMode && (this.props.editUserId === this.props.id)) ?
                        <input type="text" id="fname" name="fname"></input> : this.props.user["Display Name"]} 
                    </td>
                    <td className="delete"> 
                        <img src="./ContactList/delete.png" className="btn-del"
                        onClick={() => { if (window.confirm('Are you sure to delete this user?')) 
                        this.props.deleteUser(this.props.user["Display Name"],this.props.id) } } alt='delete'>
                        </img>
                    </td>
                    <td className="edit"> 
                        {(this.props.editMode && (this.props.editUserId === this.props.id)) ?
                        <img src="https://cdn4.iconfinder.com/data/icons/defaulticon/icons/png/256x256/check.png" 
                        className="btn-ed" alt='check'
                        onClick={() => {this.props.updateUser(this.props.user["Display Name"],this.props.id,document.getElementById("fname").value) } }>
                        </img> : 
                        <img src="./ContactList/edit.png" className="btn-ed" alt='edit'
                        onClick={() => {this.props.editUser(this.props.user["Display Name"],this.props.id) } }>
                        </img>}
                    </td>
                </tr>
            </div>
        );
    }
}

export default UserItem
    