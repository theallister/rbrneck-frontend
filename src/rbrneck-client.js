const jwtDecode = require('jwt-decode') //när man skall decoda tokens senare...


exports.createAccount = function(account, callback) {

  //const account = account

  const request = new XMLHttpRequest()
  request.open("POST", "http://localhost:3000/accounts") //type:POST på vald url
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
