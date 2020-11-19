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
          isFilter: false
          }
      this.searchList = this.searchList.bind(this);
    }
  
    searchList(e) {
      // Variable to hold the original version of the list
  let currentList = [];
      // Variable to hold the filtered list before putting into state
  let newList = [];

      // If the search bar isn't empty
  if (e.target.value !== "") {
          // Assign the original list to currentList
    currentList = this.state.userList;

          // Use .filter() to determine which items should be displayed
          // based on the search terms
    newList = currentList.filter(item => {
              // change current item to lowercase
      const lc = item["Display Name"].toLowerCase();
              // change search term to lowercase
      const filter = e.target.value.toLowerCase();
              // check to see if the current list item includes the search term
              // If it does, it will be added to newList. Using lowercase eliminates
              // issues with capitalization in search terms and search content
      return lc.includes(filter);
    });
  } else {
          // If the search bar is empty, set newList to original task list
    newList = this.state.userList;
  }
      // Set the filtered state based on what our rules added to newList
  this.setState({
    filtered: newList,
    isFilter: true
  });
}
    getUsers() {
      fetch('./contacts_file.json')
        .then(response => response.json())
        .then(json => {
          console.log(json)
          this.setState({userList: json, isData:true})
        })
    }

    deleteUser(i) {
      /* const fetchURL = 'https://jsonplaceholder.typicode.com/users/'+ i;
      const newData = fetch(fetchURL, {
          method: 'DELETE',
         }) */
         this.newList = this.state.userList.filter(function(ele){ return ele["Display Name"] !== i; });
         this.setState({userList: this.newList})
    }

    selectUser(i) {
      /* if (this.selectedUser) {
        document.getElementById(this.selectedUser.id ).style.background = "none"
      } */
      this.selectedUser = this.state.userList.find((ele) => ele["Display Name"] === i)
      //document.getElementById(i).style.background = "#91a9ec"
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
        <div className="user-list">
        <input type="text" className="input" onChange={this.searchList} placeholder="Search..." />
        {this.state.isData ? (this.state.isFilter ? this.state.filtered.map((user) => <UserItem user={user} selectUser={this.selectUser.bind(this)} deleteUser={this.deleteUser.bind(this)}/>)  : this.state.userList.map((user) => <UserItem user={user} selectUser={this.selectUser.bind(this)} deleteUser={this.deleteUser.bind(this)}/>)) : 
        (<LoaderPercent />)}
        <button onClick={this.addUser.bind(this)}> Add User </button>
        </div>
        <div className="user-details">
        {this.state.displayDetails ? <UserDetails selectedUser={this.selectedUser}/> : <div>Select any user to see details</div>}
        </div>
        </div>
        
      )
    }
  }

  export default UserList