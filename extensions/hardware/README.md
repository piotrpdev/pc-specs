# Hardware Extension

This is used to collect hardware info from the system.

## Testing

Start a websocket server using [websocat](https://github.com/vi/websocat):

```
rlwrap websocat -s 9001
```

Run the npm `dev` script:

```
npm run dev
```

Send whatever you want using websocat e.g.:

```
{"event": "getHardwareInfo"}
```