import React from 'react';
import './index.css'
import LoaderPercent from '.././loader'

class UserDetails extends React.Component {
    constructor(props) {
      super(props)
      console.log("i am in constructor")
      this.state = {
        loading : true
      }
    }
    componentDidUpdate() {
      console.log("i am in componentDidUpdatethis.state.loading :" + this.state.loading)
      if (this.state.loading === true && this.props.isShow) {
        this.setState({loading: false})
      }
    }

    componentWillUpdate() {
      this.state.loading = true
      console.log("i am in componentWillUpdatethis.state.loading :" + this.state.loading)
    }

    componentDidMount() {
      console.log("i am in componentDidMount this.state.loading :" + this.state.loading)
    }

    render() {
      console.log("i am in render")
      return (
        <div className="user-details">
          {this.props.isShow ? ((this.state.loading ? (<ul>Loading............</ul>) :
          (<div className="bg-gradient-to-r from-indigo-500 ...">
            <ul> Selected User Details :
            <li>Name: {this.props.selectedUser["Display Name"]}</li>
            <li>Email Id: {this.props.selectedUser["E-mail Address"]}</li>
            <li>Contact: {this.props.selectedUser["Home Phone"]}</li>
            <li>City: {this.props.selectedUser["Home City"]}</li>
            <li>Compny Name: {this.props.selectedUserOrganization}</li>
          </ul>
            </div>) 
          )) : <ul>Selct user</ul>
        }
        </div> 
      )
  }
}

export default UserDetails



