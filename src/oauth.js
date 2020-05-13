import React from "react"
import App from "./App"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
firebase.initializeApp({
    apiKey:"AIzaSyBRbxEpDTEEJY9wIjvPzPI4vCj559qNsjU",
    authDomain:"reactoauth-5bc92.firebaseapp.com"
})

class Oauth extends React.Component{
    state = { isSignedIn: false }
    uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }
  
    componentDidMount = () => {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user })
        console.log("user", user)
      })
    }
  
    render() {
      return (
        <div className="App">
          {this.state.isSignedIn ? <App/>
            : (
                <div>
                <h1 style={{textAlign:"center"}}>Welcome to To-Do List</h1>
                <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
                </div>

          )}
        </div>
      )
    }
  
}

export default Oauth