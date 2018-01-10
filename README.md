# Human-Readable-URL-shortener

> Instantly create custom shortened urls from anywhere 



## Public API


### GET endpoint
**Base URL:** a-ag.glitch.me
**Endpoint:** GET /get/{rollNumber}

**Response:** 

`application/json` with the keys `original_url` and `shortened-url`

401 if you don't send a valid url


**Curl Verbose:**

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
