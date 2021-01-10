import React from 'react';
import UserList from '.././userlist/index'
import './index.css';
   
class UserContainer extends React.Component{

render() {
    return (
        <div className="container mx-auto flex flex-wrap items-center">
            <h2 className="bg-violet-400 p-2 mt-0 fixed w-full z-10 top-0">Contacts</h2>
            <UserList />
        </div>
    )
}
}

export default UserContainer