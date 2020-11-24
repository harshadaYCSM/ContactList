import React from 'react';
import UserList from '.././userlist/index'
import './index.css';
   
class UserContainer extends React.Component{

render() {
    return (
        <div className="user-container">
            <h2>Contacts</h2>
            <UserList />
        </div>
    )
}
}

export default UserContainer