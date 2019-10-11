const jwtDecode = require('jwt-decode') //när man skall decoda tokens senare...

//omanvädbar
const request = new XMLHttpRequest()
const uri = "http://localhost:3000"

exports.login = function(username, password, callback) {

  request.open("POST", uri+"/tokens")
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  request.send("grant_type=password&username="+encodeURIComponent(username)+"&password="+encodeURIComponent(password))

  request.addEventListener("load", () => {

    const status = request.status

    switch(status) {

      case 200:
        var bodyAsString = request.responseText
        var body = JSON.parse(bodyAsString)

        const idToken = body.id_token
        accessToken = body.access_token

        const userInfo = jwtDecode(idToken)
        const id = userInfo.accountId
        const username = userInfo.accountUsername

        callback([], id, username, idToken, accessToken)
        break

      case 400:
        var bodyAsString = request.responseText
        var body = JSON.parse(bodyAsString)
        callback([body.error])
        break

      case 500:
        callback(["Unknown server error"])
        break

      default:
        callback(["Unknown server error"])
    }
  })
}

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
      case 404:
        callback(["Account not found"])
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

  request.open("PUT", uri+"/accounts/"+id)
  request.setRequestHeader("Content-Type", "application/json")
  request.send(JSON.stringify(updatedAccount))

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {

      case 200:
        callback([])

      case 404:
        callback(["Account not found"])
        break

      case 422:
        callback(["Unprocessable entry"])
        break

      case 500:
        callback(["Server error"])

      default:
        callback(["Server error"])
    }
  })
}

exports.deleteAccountById = function(id, callback) {

  request.open("DELETE", uri+"/accounts/"+id)
  request.send()

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {

      case 200:
        const bodyAsString = response.responseText
        const items = JSON.parse(bodyAsString)
        callback([], items)

      case 404:
        callback(["Account not found"])
        break

      case 500:
        callback(["Server error"])
        break

      default:
        callback(["Server error"])
    }
  })
}
exports.getAllItems = function(callback) {

  request.open("GET", uri+"/items")
  request.send()

  request.addEventListener("load", () => {

    const status = request.status

    switch(status) {

      case 200:
        callback([], items)

      case 500:
        callback(["Server error"])
        break

      default:

    }

  })

}


exports.createItem = function(item, callback) {

  request.open("POST", uri+"/items")
  request.setRequestHeader("Content-Type", "application/json") //Header inställd för JSON objekt
  request.send(JSON.stringify(item))

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {
      case 200:
      const location = request.getResponseHeader("Location") //Vi vill ha ID:t och inte hela pathen
      const id = parseInt(location.substr("/items/".length)) //Genom att göra detta (ta bort stringen före numret)
      callback([], id) //sedan skickar vi id:t och en tom errors array
      break

      case 500:
      callback(["Server error"])
      break

      default:
      callback(["Server error"])

    }
  })
}
