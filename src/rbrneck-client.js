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
        callback(["Invalid client"])
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

      case 422:
        errors = JSON.parse(request.responseText)
        callback([errors])
        break

      case 400:
        errors = JSON.parse(request.responseText) //vad vi får tillbaka när statusen är 400(?)
        callback([errors])
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

exports.updateAccountById = function(id, updatedAccount, accessToken, callback) {

  request.open("PUT", uri+"/accounts/"+id)
  request.setRequestHeader("Content-Type", "application/json")
  request.setRequestHeader("Authorization", "Bearer "+accessToken) //passa in accesstoken som kommer efter inloggning
  request.send(JSON.stringify(updatedAccount))

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {

      case 200:
        callback([])
        break

      case 401:
        callback(["Not authenticated"])
        break

      case 404:
        callback(["Account not found"])
        break

      case 422:
        callback(["Unprocessable entry"])
        break

      case 500:
        callback(["Server error"])
        break

      default:
        callback(["Server error"])
    }
  })
}

exports.deleteAccountById = function(id, accessToken, callback) {

  request.open("DELETE", uri+"/accounts/"+id)
  request.setRequestHeader("Authorization", "Bearer "+accessToken) //passa in accesstoken som kommer efter inloggning
  request.send()

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {

      case 204:
        callback([])
        break

      case 401:
        const errors = JSON.parse(request.responseText)
        callback([errors])
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
exports.getAllItems = function(callback) {

  request.open("GET", uri+"/items")
  request.send()

  request.addEventListener("load", () => {

    const status = request.status

    switch(status) {

      case 200:
        const bodyAsString = request.responseText
        const items = JSON.parse(bodyAsString)
        callback([], items)
        break

      case 500:
        callback(["Server error"])
        break

      default:
        callback(["Server error"])
    }
  })
}

exports.getItemById = function(id, callback) {

  request.open("GET", uri+"/items/"+id)
  request.send()

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {
      case 200:
        const bodyAsString = request.responseText
        const item = JSON.parse(bodyAsString)
        callback([], item)
        break

      case 404:
        callback(["Not found"])
        break

      case 500:
        callback(["Server error"])
        break

      default:
        callback(["Server error"])
    }
  })
}


exports.createItem = function(item, accessToken, callback) {

  request.open("POST", uri+"/items")
  request.setRequestHeader("Content-Type", "application/json") //Header inställd för JSON objekt
  request.setRequestHeader("Authorization", "Bearer "+accessToken) //passa in accesstoken som kommer efter inloggning
  request.send(JSON.stringify(item))

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {
      case 201:
      const location = request.getResponseHeader("Location") //Vi vill ha ID:t och inte hela pathen
      const id = parseInt(location.substr("/items/".length)) //Genom att göra detta (ta bort stringen före numret)
      callback([], id) //sedan skickar vi id:t och en tom errors array
      break

      case 422:
        callback(["Unprocessable entity"])
        break

      case 401:
        callback(["Not Authorized"])
        break

      case 400:
        callback(["Bad request"])
        break

      case 500:
      callback(["Server error"])
      break

      default:
      callback(["Server error"])

    }
  })
}

exports.updateItemById = function(id, updatedItem, accessToken, callback) {

  request.open("PUT", uri+"/items/"+id)
  request.setRequestHeader("Content-Type", "application/json")
  request.setRequestHeader("Authorization", "Bearer "+accessToken) //passa in accesstoken som kommer efter inloggning
  request.send(JSON.stringify(updatedItem))

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {

      case 200:
        callback([])
      case 404:
        callback(["Not found"])
        break

      case 422:
        callback(["Unprocessable entry"])
        break

      case 500:
        callback(["Server error"])
        break

      default:
        callback(["Server error"])

    }
  })
}

exports.finishWatching = function(id, accessToken, callback) {

  request.open("PATCH", uri+"/items/"+id)
  request.setRequestHeader("Content-Type", "application/json")
  request.setRequestHeader("Authorization", "Bearer "+accessToken) //passa in accesstoken som kommer efter inloggning
  request.send()

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {

      case 200:
        callback(["Success"])
        break

      case 404:
        callback(["Not found"])
        break

      case 422:
        callback(["Unprocessable entry"])
        break

      case 500:
        callback(["Server error"])
        break

      default:
        callback(["Server error"])

    }
  })
}

exports.deleteItemById = function(id, accessToken, callback) {

  request.open("DELETE", uri+"/items/"+id)
  request.setRequestHeader("Authorization", "Bearer "+accessToken) //passa in accesstoken som kommer efter inloggning
  request.send()

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {

      case 200:
        callback([])
        break

      case 404:
        callback(["Not found"])
        break

      case 500:
        callback(["Server error"])
        break

      default:
        callback(["Server error"])

    }
  })
}

exports.createComment = function(comment, id, accessToken, callback) {

  request.open("POST", uri+"/items/"+id+"/comments")
  request.setRequestHeader("Content-Type", "application/json")
  request.setRequestHeader("Authorization", "Bearer "+accessToken) //passa in accesstoken som kommer efter inloggning
  request.send(JSON.stringify(comment))

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {
      case 200:
        callback([])
        break

      case 404:
       callback(["No id found"])
       break

      case 422:
        callback(["Unprocessable entry"])
        break

      case 500:
        callback(["Server error"])
        break

      default:
        callback(["No id found"])
    }
  })
}

exports.getCommentsByItemId = function(itemId, callback) {

  request.open("GET", uri+"/items/"+itemId+"/comments")
  request.send()

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {
      case 200:
        const bodyAsString = request.responseText
        const comments = JSON.parse(bodyAsString)
        callback([], comments)
        break

      case 404:
        callback(["Item id not found"])
        break

      case 500:
        callback(["Server error"])
        break

      default:
        callback(["Server error"])
    }
  })
}

exports.deleteCommentById = function(itemId, commentId, accessToken, callback) {
  request.open("DELETE", uri+"/items/"+itemId+"/comments/"+commentId)
  request.setRequestHeader("Authorization", "Bearer "+accessToken) //passa in accesstoken som kommer efter inloggning
  request.send()

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {
      case 200:
        callback([])
        break

      case 404:
        callback(["Not found"])
        break

      case 500:
        callback(["Server errror"])
        break

      default:
        callback(["Server errror"])
    }
  })
}
