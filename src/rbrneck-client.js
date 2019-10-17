const jwtDecode = require('jwt-decode') //när man skall decoda tokens senare...

//omanvädbar

const uri = "http://localhost:3000"

exports.login = function(username, password, callback) {
  const request = new XMLHttpRequest()
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
        callback(["invalidClient"])
        break

      case 404:
        callback(["notFound"])
        break

      case 500:
        callback(["serverError"])
        break

      default:
        callback(["serverError"])
    }
  })
}

exports.createAccount = function(account, callback) { //Create an account based on object from .vue
  const request = new XMLHttpRequest()
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
  const request = new XMLHttpRequest()
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
  const request = new XMLHttpRequest()
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
  const request = new XMLHttpRequest()
  request.open("PUT", uri+"/accounts/"+id)
  request.setRequestHeader("Content-Type", "application/json")
  request.setRequestHeader("Authorization", "Bearer "+accessToken) //passa in accesstoken som kommer efter inloggning
  request.send(JSON.stringify(updatedAccount))

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {

      case 201:
        callback([])
        break

      case 401:
        callback(["Not authenticated"])
        break

      case 404:
        callback(["Account not found"])
        break

      case 422:
        callback(["unprocessableEntry"])
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
  const request = new XMLHttpRequest()
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
  const request = new XMLHttpRequest()
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
  const request = new XMLHttpRequest()
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
        callback(["notFound"])
        break

      case 500:
        callback(["serverError"])
        break

      default:
        callback(["serverError"])
    }
  })
}

exports.getItemsByAccountId = function(id, callback) {
  const request = new XMLHttpRequest()
  request.open("GET", uri+"/accounts/"+id+'/items')
  request.send()

  request.addEventListener("load", () => {

    const status = request.status

    switch(status) {
      case 200:
        const bodyAsString = request.responseText
        const items = JSON.parse(bodyAsString)
        callback([], items)
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
  const request = new XMLHttpRequest()
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

      case 400:
        callback(["badRequest"])
        break

      case 401:
        callback(["notAuthorized"])
        break

      case 500:
        callback(["serverError"])
        break

      default:
        callback(["serverError"])

    }
  })
}

exports.updateItemById = function(id, updatedItem, accessToken, callback) {
  const request = new XMLHttpRequest()
  request.open("PUT", uri+"/items/"+id)
  request.setRequestHeader("Content-Type", "application/json")
  request.setRequestHeader("Authorization", "Bearer "+accessToken) //passa in accesstoken som kommer efter inloggning
  request.send(JSON.stringify(updatedItem))

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {

      case 201:
        callback([])
        break

      case 400:
        callback(["badRequest"])
        break

      case 401:
        callback(["notAuthorized"])
        break

      case 404:
        callback(["notFound"])
        break

      case 422:
        callback(["unprocessableEntry"])
        break

      case 500:
        callback(["serverError"])
        break

      default:
        callback(["serverError"])

    }
  })
}

exports.finishWatching = function(id, accessToken, callback) {
  const request = new XMLHttpRequest()
  request.open("PATCH", uri+"/items/"+id)

  request.setRequestHeader("Authorization", "Bearer "+accessToken) //passa in accesstoken som kommer efter inloggning
  request.send()

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {

      case 204:
        callback([])
        break

      case 401:
        callback(["notAuthorized"])

      case 404:
        callback(["notFound"])
        break

      case 500:
        callback(["serverError"])
        break

      default:
        callback(["serverError"])

    }
  })
}

exports.deleteItemById = function(id, accessToken, callback) {
  const request = new XMLHttpRequest()
  request.open("DELETE", uri+"/items/"+id)
  request.setRequestHeader("Authorization", "Bearer "+accessToken) //passa in accesstoken som kommer efter inloggning
  request.send()

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {

      case 204:
        callback([])
        break

      case 404:
        callback(["notFound"])
        break

      case 500:
        callback(["serverError"])
        break

      default:
        callback(["serverError"])

    }
  })
}

exports.createComment = function(comment, id, accessToken, callback) {
  const request = new XMLHttpRequest()
  request.open("POST", uri+"/items/"+id+"/comments")
  request.setRequestHeader("Content-Type", "application/json")
  request.setRequestHeader("Authorization", "Bearer "+accessToken) //passa in accesstoken som kommer efter inloggning
  request.send(JSON.stringify(comment))

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {
      case 201:
        callback([])
        break

      case 400:
        callback(['badRequest'])
        break

      case 401:
        callback(['notAuthorized'])
        break

      case 404:
       callback(["notFound"])
       break

      case 500:
        callback(["serverError"])
        break

      default:
        callback(["serverError"])
    }
  })
}

exports.getCommentsByItemId = function(itemId, callback) {
  const request = new XMLHttpRequest()
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
        callback(["notFound"])
        break

      case 500:
        callback(["serverError"])
        break

      default:
        callback(["serverError"])
    }
  })
}

exports.deleteCommentById = function(commentId, accessToken, callback) {
  const request = new XMLHttpRequest()
  request.open("DELETE", uri+"/comments/"+commentId)
  request.setRequestHeader("Authorization", "Bearer "+accessToken) //passa in accesstoken som kommer efter inloggning
  request.send()

  request.addEventListener("load", () => {
    const status = request.status

    switch(status) {
      case 204:
        callback([])
        break

      case 401:
        callback(["notAuthorized"])
        break

      case 404:
        callback(["notFound"])
        break

      case 500:
        callback(["serverError"])
        break

      default:
        callback(["serverError"])
    }
  })
}
