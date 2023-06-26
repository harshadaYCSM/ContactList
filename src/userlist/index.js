import React from 'react';
import './index.css';
import LoaderPercent from '.././loader'
import UserItem from '.././useritem'
import UserDetails from '../userdetails';


class UserList extends React.Component{
    constructor() {
      super();
      this.userDetails = null;
      this.masterUserList = null;
      this.state = {
          userList : null,
          isData: false,
          displayDetails : false,
          filtered: null,
          isFilter: false,
          editUser : false,
          editUserId : null,
          filteredList : null
          }
      this.selectUser = this.selectUser.bind(this);
      this.deleteUser = this.deleteUser.bind(this);
      this.editUser = this.editUser.bind(this);
      this.updateUser = this.updateUser.bind(this);
    }
  
    searchList = (e) => {
      const searchKey = e.target.value.toLowerCase();
      const { userList } = this.state;

      const filteredList = searchKey
        && userList.filter((item) =>
            item["Display Name"].toLowerCase().includes(searchKey)
          );
      this.setState({
        isFilter: !!searchKey,
        filteredList:  filteredList,
      });
    }
    
    getUsers() {
      fetch('./ContactList/contacts_file.json')
        .then(response => response.json())
        .then(json => {
          console.log(json)
          this.setState({userList: json, isData:true})
        })
    }

    deleteUser(name, i) {
      const updatedUserList = this.state.userList.filter(
        (ele) => ele["Display Name"] !== name
      );
      this.setState({ userList: updatedUserList });
    }

    updateUser(user,id,updatedVal) {
      const updatedUserList = [...this.state.userList];
      const editedUserIndex = updatedUserList.findIndex((ele) => ele["Display Name"] === user);
      updatedUserList[editedUserIndex]["Display Name"] = updatedVal;
      this.setState({ userList: updatedUserList, editUser: false, editUserId: null });
    }

    editUser(user,id) {
      console.log("edit user" + user + id)
      this.setState({editUser: true, editUserId : id})
    }
    
    selectUser(name, i) {
      this.selectedUser = this.state.userList.find(
        (ele) => ele["Display Name"] === name
      );
      const content = document.querySelector('.content');

      // Reset the animation state
    content.classList.remove('show');

    // Add the 'hide' class to smoothly fade out the content
    content.classList.add('hide');

    
    setTimeout(() => {
      // Change the content here

      // Remove the 'hide' class and add the 'show' class to smoothly fade in the new content
      content.classList.remove('hide');
      content.classList.add('show');
      this.selectedUser.id = i;
      this.setState({ displayDetails: true });
    }, 200);

     
    }

    addUser() {
      console.log("add user" + document.querySelector(".user-list"))
      let personName = window.prompt("Please enter name")
      let newId = this.state.userList.length + 1
      console.log(this.state.userList.length)

        fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          body: JSON.stringify({
            "id": newId,
            "name": personName,
            "username": "Harshada",
            "email": "harsh@april.biz",
            "address": {
              "street": "Boisar tarapur",
              "suite": "Apt. Nh",
              "city": "Mumbai",
              "zipcode": "401504-3874",
              "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
              }
            },
            "phone": "55865-881125-255",
            "website": "hahhahye.org",
            "company": {
              "name": "Radheya-Foundation",
              "catchPhrase": "Multi-layered client-server neural-net",
              "bs": "harness real-time e-markets"
            }
          },),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((addedData) => {
            console.log(addedData)
            this.setState({userList : [...this.state.userList, addedData]})
            console.log(this.state.userList)
          })
        
    }
  componentDidMount() {
      this.getUsers()
  }

     render() {
      const {
        userList,
        isData,
        filteredList,
        isFilter,
        editUser,
        editUserId,
        displayDetails,
      } = this.state;

      let userListToBeRendered = isFilter ? filteredList : userList;
      return(
        <div className='user-list'>
          <input type="text" className="search-box" onChange={this.searchList} placeholder="Search..." />
          <div className="user-list">
            {isData ? 
            userListToBeRendered?.map((user,index) => 
            <UserItem user={user} id={index} selectUser={this.selectUser}
            deleteUser={this.deleteUser} editUser={this.editUser}
            editMode={editUser} editUserId={editUserId} 
            updateUser={this.updateUser} />) : 

            (<LoaderPercent />)}
            
            <button onClick={this.addUser}> Add User </button>
        </div>
          <UserDetails selectedUser={this.selectedUser} isShow={displayDetails} />
      </div>
      )
    }
  }

  export default UserList