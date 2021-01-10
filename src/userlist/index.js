import React from 'react';
import './index.css';
import LoaderPercent from '.././loader'
import UserItem from '.././useritem'
import UserDetails from '../userdetails';


class UserList extends React.Component{
    constructor() {
      super();
      this.userDetails = null;
      this.state = {
          userList : null,
          isData: false,
          displayDetails : false,
          filtered: null,
          isFilter: false,
          editUser : false,
          editUserId : null
          }
      this.searchList = this.searchList.bind(this);
      this.serialNumber = 0
    }
  
    searchList(e) {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.state.userList;
      newList = currentList.filter(item => {
      const itemName = item["Display Name"].toLowerCase();
      const searchKey = e.target.value.toLowerCase();
      return itemName.includes(searchKey);
      });
    } else {
      newList = this.state.userList;
    }
    this.setState({
    filtered: newList,
    isFilter: true
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

    deleteUser(name,i) {
      /* const fetchURL = 'https://jsonplaceholder.typicode.com/users/'+ i;
      const newData = fetch(fetchURL, {
          method: 'DELETE',
         }) */
         this.newList = this.state.userList.filter(function(ele){ return ele["Display Name"] !== name; });
         this.setState({userList: this.newList})
    }

    updateUser(user,id) {
      console.log("updated")
      this.setState({editUser: false, editUserId : null})
    }
    editUser(user,id) {
      console.log("edit user" + user + id)
      this.setState({editUser: true, editUserId : id})
    }
    selectUser(name,i) {
      if (this.selectedUser) {
        document.getElementById(this.selectedUser.id ).style.background = "none"
      }
      this.selectedUser = this.state.userList.find((ele) => ele["Display Name"] === name)
      this.selectedUser.id = i
      document.getElementById(i).style.background = "#91a9ec"
      document.getElementsByClassName('user-details')[0].style.backgroundImage = "url('loader.gif')";
      document.getElementsByClassName('user-details')[0].style.color= "rgb(189, 183, 228)"

      // document.getElementsByClassName('user-details')[0].innerHTML = "Loading..."
      setTimeout(() => {
        document.getElementsByClassName('user-details')[0].style.background = "rgb(189, 183, 228)"
        document.getElementsByClassName('user-details')[0].style.color= "black"
    }, 300)
      // document.getElementsByClassName('user-details')[0].style.animationDuration = "4s"
      this.setState({displayDetails:true})
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
      return(
        <div>
          <input type="text" className="search-box" onChange={this.searchList} placeholder="Search..." />
          <div className="user-list">
            {this.state.isData ? (this.state.isFilter ? 
            this.state.filtered.map((user,index) => 
            <UserItem user={user} id={index} selectUser={this.selectUser.bind(this)} 
            deleteUser={this.deleteUser.bind(this)} editUser={this.editUser.bind(this)} 
            editMode={this.state.editUser} editUserId={this.state.editUserId} 
            updateUser={this.updateUser.bind(this)} />)  : 
            this.state.userList.map((user,index) => 
            <UserItem user={user} id={index} selectUser={this.selectUser.bind(this)}
            deleteUser={this.deleteUser.bind(this)} editUser={this.editUser.bind(this)}
            editMode={this.state.editUser} editUserId={this.state.editUserId} 
            updateUser={this.updateUser.bind(this)} />)) : 
            (<LoaderPercent />)}
            
            <button onClick={this.addUser.bind(this)}> Add User </button>
        </div>
          <UserDetails selectedUser={this.selectedUser} isShow={this.state.displayDetails} />
      </div>
      )
    }
  }

  export default UserList