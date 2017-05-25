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
on your local machine. By default Sync will try to access MongoDB on port
`11211`. 

If you are running MongoDB on a different port you should set the
`FH_MONGODB_CONN_URL` environment variable to the MongoDB connection URL.

## Start the server

```
grunt serve
```

The Sync server will be availble at `localhost:8001`.

If you wish to run the server on a different port you should set the `FH_PORT`
environment variable to the port you want the server to run on.