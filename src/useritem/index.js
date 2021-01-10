import React from 'react';
import './index.css'

class UserItem extends React.Component {
    constructor(props) {
        super(props)
    }

 
    render() {
        return (
            <div className="flex-col flex-wrap justify-evenly">
                <tr className="flex mb-4 flex-wrap divide-x divide-indigo-500 divide-y divide-indigo-500" 
                key={this.props.id} id={this.props.id}> 
                    <td className="w-7">{this.props.id}</td>
                    <td className="w-40" 
                    onClick={() => {this.props.selectUser(this.props.user["Display Name"],this.props.id) } }>
                        {(this.props.editMode && (this.props.editUserId === this.props.id)) ?
                        <input type="text" id="fname" name="fname"></input> : this.props.user["Display Name"]} 
                    </td>
                    <td className="w-10"> <img src="./ContactList/delete.png" className="btn-del"
                        onClick={() => { if (window.confirm('Are you sure to delete this user?')) this.props.deleteUser(this.props.user["Display Name"],this.props.id) } }>
                        </img></td>
                    <td className="w-10"> {(this.props.editMode && (this.props.editUserId === this.props.id)) ?
                    <img src="https://cdn4.iconfinder.com/data/icons/defaulticon/icons/png/256x256/check.png" className="btn-ed"
                    onClick={() => {this.props.updateUser(this.props.user["Display Name"],this.props.id) } }></img> : 
                    <img src="./ContactList/edit.png" className="btn-ed"
                    onClick={() => {this.props.editUser(this.props.user["Display Name"],this.props.id) } }>
                    </img>}</td>
                </tr>
            </div>
        );
    }
}

export default UserItem
    