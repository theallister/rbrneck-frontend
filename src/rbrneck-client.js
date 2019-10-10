const jwtDecode = require('jwt-decode') //när man skall decoda tokens senare...

//omanvädbar
const request = new XMLHttpRequest()
const uri = "http://localhost:3000"


exports.createAccount = function(account, callback) { //Create an account based on object from .vue

  request.open("POST", uri+"/accounts") //type:POST på vald url
  request.setRequestHeader("Content-Type", "application/json") //Header inställd för JSON objekt
  request.send(JSON.stringify(account)) //Konvertera objektet till string (why tho?)

  request.addEventListener("load", () => { //"Load" innebär att requesten är färdig.

    const status = request.status

    switch(status) {

      case 201: //om det funkade
        const location = request.getResponseHeader("Location") //Vi vill ha ID:t och inte hela pathen
        const id = parseInt(location.substr("/accounts/".length)) //Genom att göra detta (ta bort stringen före numret)
        callback([], id) //sedan skickar vi id:t och en tom errors array
        break

      case 400:
        const errors = JSON.parse(request.responseText) //vad vi får tillbaka när statusen är 400(?)
        callback(errors)
        break

      case 500:
        callback(["Unknown server error"])
        break

      default:
        callback(["Unknown server error"])
    }

  })
}

exports.getAllAccounts = function(callback){ //fetch all accounts

  request.open("GET", uri+"/accounts")
  request.send()

  request.addEventListener("load", () => {

    const status = request.status

    switch(status) {

      case 200:
        const bodyAsString = request.responseText
        const accounts = JSON.parse(bodyAsString)
        callback([], accounts)
        break

      case 500:
        callback(["Server error"])
        break

      default:
        callback(["Server error"])

    }
  })
}

exports.getAccountById = function(id, callback) { //fetch one specific account from id

  request.open("GET", uri+"/accounts/"+id)
  request.send()

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {

      case 200:
        const bodyAsString = request.responseText
        const account = JSON.parse(bodyAsString)
        callback([], account)
        break
      case 500:
        callback(["Server error"])
        break
      default:
        callback(["Server error"])
    }
  })
}

exports.updateAccountById = function(id, updatedAccount, callback) {

  request.open("PATCH", uri+"/accounts/"+id)
  request.setRequestHeader("Content-Type", "application/json")
  request.send(JSON.stringify(updatedAccount))

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {

      case 200:
        callback([])

      case 500:
        callback(["Server error"])
        
      default:
        callback(["Server error"])
    }
  })
}
