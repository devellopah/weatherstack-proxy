# weatherstack-proxy
Proxy server with rate limiter for weatherstack api requests

## Backend part
1. grab you api key by creating [weatherstack](https://weatherstack.com/) account
2. fork the repo
3. `git clone` forked repo
4. create an `.env` file in project root directory
5. paste into your `.env` file
```API_KEY=here_your_weatherstack_api_key```(see step 1)
6. run `npm run serve`
7. you server is now running on `http://localhost:3000`

## Frontend part
1. grab you api key by creating [ipinfo](https://ipinfo.io/) account
2. grab `loc` value (somewhere inside your app)
by making request to ```http://ipinfo.io/loc?token=here_your_ipinfo_token```
8. provide `loc` value as value to `coords` query parameter to make a valid request to your server
```http://localhost:3000/api/forecast?coords=you_grabed_it_previously```
