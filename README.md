# Public transportation App
This is a progressive web app build with Redux and React.
It's uses the build tool webpack.
It uses techniques like service workers and indexedDB to run when the user is offline.

# Installing
Clone the repo, and run

```sh
npm install
```

# Running

```sh
webpack-dev-server
```
# Offline functionality
When the user is offline it will show the application as cached in the
browser cache. using the caches api and a service worker to serve the cached files.
Also the users last searched routes will appear, served from the idb from the browser.
