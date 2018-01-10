# Human-Readable-URL-shortener

> Instantly create custom shortened urls from anywhere 


URL Shortener is a NodeJS based RESTful API that allows you to provide a long, cumbersome link to be returned as a convenient six digit URL. The shortened URL will redirect to the page provided by the original link. 


## Public API


### GET Shortened URL
**Base URL:** a-ag.glitch.me 

**Endpoints:**

To generate url with random code:  ` GET /new/{url}`

To generate url with your own code: `GET /new/{url}/?code={your_code}`
> PRO-TIP : prefix all your url codes with a unique id 

**Response:** 


`200: application/json` with the keys `original_url` and `short-url`

`400 : Original url is invalid`

`401 : Custom code provided is taken`


**Curl Verbose:**

Without custom code
```sh
$ curl -i https://a-ag.glitch.me/new/https://www.youtube.com/watch?v=Vfpa6toNM6E
> HTTP/1.1 200 Connection Established
> Proxy-Agent: IWSS
> Date: Wed, 10 Jan 2018 08:49:13 GMT

> HTTP/1.1 200 OK
> Date: Wed, 10 Jan 2018 08:49:19 GMT
> Content-Type: application/json; charset=utf-8
> Content-Length: 98
> Connection: keep-alive
> x-powered-by: Express
> etag: W/"62-sO0Kz80yC4F8SlJkwDnmwG+C2UE"

> {"original_url":"https://www.youtube.com/watch?v=Vfpa6toNM6E","short_url":"a-ag.glitch.me/99bfe0"}
```
With custom code
```sh
$ curl -i https://a-ag.glitch.me/new/https://www.youtube.com/watch?v=Vfpa6toNM6E?code=fav_song/?code=my_fav_song
> HTTP/1.1 200 Connection Established
> Proxy-Agent: IWSS
> Date: Wed, 10 Jan 2018 10:41:24 GMT

> HTTP/1.1 200 OK
> Date: Wed, 10 Jan 2018 10:41:23 GMT
> Content-Type: application/json; charset=utf-8
> Content-Length: 118
> Connection: keep-alive
> x-powered-by: Express
> etag: W/"76-1TkqKMvY3lsM1sU6caDFTJATsfM"

> {"original_url":"https://www.youtube.com/watch?v=Vfpa6toNM6E?code=fav_song/","short_url":"a-ag.glitch.me/my_fav_song"}

```
## Development

To run this locally:

```sh
$ clone the repository
$ npm install
$ cp .env.template .env
# populate .env with the appropriate values
$ node index.js
```

You need to have MongoDB, Node.js and npm installed.

## Contribution

Features to add:
- Generate human readable codes when custom code is not provided
- CLI tool to make a curl request

I would love to have your help on this! Do check out the issues dashboard of this repository, and submit a PR on any one of those issues, and I will be happy to merge! If there are no issues on the dashboard, please do feel free to create new ones!

Code licensed under MIT.

Copyright Anshuman Agrawal 2018.
