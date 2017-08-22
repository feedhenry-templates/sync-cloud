# FeedHenry Data Sync Tutorial Cloud App
[![Dependency Status](https://img.shields.io/david/feedhenry-templates/sync-cloud.svg?style=flat-square)](https://david-dm.org/feedhenry-templates/sync-cloud)

Template app for the Sync server. This contains the boilerplate code required to
start Sync. The Sync server can be interacted with via any of the client SDKs.

# Build
```
npm install
```

# Run locally

## Setup MongoDB

In order to run the Sync server locally you'll need to have MongoDB running
on your local machine. By default Sync will try to access MongoDB using the URL
`mongodb://localhost:27017/FH_LOCAL`. If you'd like to use a different port or
database you need to change the `FH_MONGODB_CONN_URL` environment variable in
the `Gruntfile.js`.

## Start the server

```
npm run serve
```

The Sync server will be availble at `http://localhost:8001`.

If you wish to run the server on a different port you should set the `FH_PORT`
environment variable to the port you want the server to run on.