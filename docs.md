# Backend api documentation
Backend is basically stored in api.js file. Here's the documentation.

# Auth
## Singup (POST)
URL: `/signup`

body
```
{
    username: String    // min: 6, max: 20
    email: String     // valid email
    password: String    // min: 6, max: your brain capacity
}
```
onFail:
1. status code: 403, response: {invalid: REASON}

onSuccess:
1. status code: 200, signs in automatically.

## Singin (POST)
URL: `/signin`

body
```
{
    email: String     // valid email
    password: String    // min: 6, max: your brain capacity
}
```
onFail:
1. status code: 404 if not found such user.
2. status code: 403, response: {invalid: REASON}

onSuccess:
1. status code: 200, signs in automatically.

## Signout (GET)
URL: `/signout`

onFail:
1. status code: 401 if unauthorized.

onSuccess:
1. status code: 200, signs out automatically.

# Profile

## Exists (GET)
URL: `/<USERNAME>/exits`

onSuccess:
1. status code: 200, resposnse json: {exists: true|false}.

## Get user data (GET)
URL: `/`

onFail:
1. status code: 401 if unauthorized.

onSuccess:
1. status code: 200, resposnse json: {username, email, date_of_creation, total_message}.

## Delete everything (DELETE)
URL: `/`

onFail:
1. status code: 401 if unauthorized.

onSuccess:
1. status code: 200, deletes everything related to the username.

## Get Messages (GET)

URL: `/message/<PAGE>`

onFail:
1. status code: 401 if unauthorized.

onSuccess:
1. status code: 200, resposnse json: [message...]. (message object is basically {body, username, date, _id})

[NB: Each page contains 3 messages]

## Toggle activation (GET)
URL: `/message/<PAGE>`

onFail:
1. status code: 401 if unauthorized.

onSuccess:
1. status code: 200, toggles activation of account.

[NB: If account is deactivated then you will not recieve any message.]

# Send message (POST)
URL: `/<USERNAME>/message`

body:
```
{
    body: String     // min: 1, max: 200
}
```

onFail:
1. status code: 404 if not found such USERNAME.
2. status code: 403, response: {invalid: REASON}

onSuccess:
1. status code: 200, sends message to USERNAME.

[NB: For protection against spamming, messaging request limit is fixed which is 10 messages for every 15 minutes.]