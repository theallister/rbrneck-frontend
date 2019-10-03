const rootPath = 'http://localhost:3000'

export async function createAccount(accountToBeCreated) {
    
    const bodyAsString = JSON.stringify(accountToBeCreated)
    
    const response = await fetch("https://localhost:3000/accounts", {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: bodyAsString
    })
    
    const statusCode = response.status
    const locationHeader = response.headers.get("Location")
    const bodyAsJsObject = await response.json()
    
    return bodyAsObject
    
}

// Use this in an async function.
// (the async keyword cna only be used in async functions)
try{
    const bodyAsObject = await createAccount({
        username: "Alice",
        password: "abc123"
    })
    // ...
}catch(error){
    // Called when something goes wrong :(
}