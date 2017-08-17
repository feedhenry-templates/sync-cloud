const sync = require('fh-mbaas-api').sync;
const env = require('env-var');

function globalRequestInterceptor (dataset_id, params, cb) {
  // This function will intercept all sync requests.
  // It is useful for checking client identities and
  // for validating authentication

  console.log('lib/sync.js - Intercepting request for dataset', dataset_id, 'with params', params);

  // Return a non null response to cause the sync request to fail.
  // This (string) response will be returned to the client, so
  // don't leak any security information.
  return cb(null);
}

exports.init = function () {

  return new Promise((resolve, reject) => {
    // Read in environment variables required to initialise sync
    const MONGO_URL = env('FH_MONGODB_CONN_URL').asString();
    const REDIS_HOST = env('FH_REDIS_HOST').required().asString();
    const REDIS_PORT = env('FH_REDIS_PORT').required().asPositiveInt();
    
    function connectCallback (err) {
      if (err) {
        console.error('failed to initialise sync', err);
        reject(err);
      } else {
        console.log('sync - connected to mongo and redis succesfully');
        
        // Register our interceptor
        sync.globalInterceptRequest(globalRequestInterceptor);

        // Initialise our dataset for client devices to sync
        sync.init('myShoppingList', {
          syncFrequency: 15
        }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    }

    console.log('sync - connect to redis and mongo');
    if (MONGO_URL) {
      sync.connect(MONGO_URL, {}, `redis://${REDIS_HOST}:${REDIS_PORT}`, connectCallback);
    } else {
      // On initial deploy the `MONGO_URL` variable will not be available in feedhenry dyno
      // environments. We still need to resolve the promise because otherwise the cloud app
      // won't start (and the user won't be able to upgrade the database)
      console.log("Sync has not been initialized. You need to upgrade the database first.");
      resolve();
    }
  });

};
