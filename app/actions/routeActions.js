import * as actionTypes from './actionTypes';
import idb from 'idb';

var openDataBase = function() {
  return idb.open('recentRoutes', 1, function(upgradeDb) {

    var store = upgradeDb.createObjectStore('routes', {
      keyPath: 'id',
      autoIncrement: true
    });
    store.createIndex('by-id', 'id');
  });
}

export function getRoute(routeData) {
  return function(dispatch) {
    dispatch(loadingTrue());
    var directionsService = new google.maps.DirectionsService();
    var routeParams = {
      origin: routeData.from,
      destination: routeData.to,
      travelMode: 'TRANSIT',
      transitOptions: {},
      provideRouteAlternatives: true
    }

    if (routeData.arrivalTime) {
      routeParams.transitOptions.arrivalTime = new Date(routeData.arrivalTime)
    } else if (routeData.departureTime) {
      routeParams.transitOptions.departureTime = new Date(routeData.departureTime)
    }

    return directionsService.route(routeParams, function(result, status) {
      setRecentRoute(result.routes);
      dispatch(loadingFalse());
      dispatch(getRouteSuccess(result.routes));
    })
  }
}

export function setRecentRoute(routes) {

    openDataBase().then(function(db) {
      if (!db) return;
      var tx = db.transaction('routes', 'readwrite'),
          store = tx.objectStore('routes');

      routes.forEach(function(route) {
        cleanRouteData(route.legs[0]).then(function(cleanRoute) {
          store.put(cleanRoute);
        })
      });

      store.index('by-id').openCursor(null, "prev").then(function(cursor) {
        if (!cursor) return;
        return cursor.advance(30);
      }).then(function deleteRest(cursor) {
        if (!cursor) return;
        cursor.delete();
        return cursor.continue().then(deleteRest);
      });

    });

}

var cleanRouteData = function(route) {
  var cleanRoute = {};
  return new Promise(function(resolve, reject) {
    cleanRoute.end_address = route.end_address;
    cleanRoute.start_address = route.start_address;
    cleanRoute.distance = route.distance;
    cleanRoute.duration = route.duration;
    cleanRoute.arrival_time = route.arrival_time;
    cleanRoute.departure_time = route.departure_time;
    cleanRoute.steps = [];
    route.steps.forEach(function(step) {

      var routeStep = {
        distance: step.distance,
        duration: step.duration,
        instructions: step.instructions
      }

      if (step.transit) {
        routeStep.transit = {
          departure_stop: {
            name: step.transit.departure_stop.name
          },
          arrival_stop: {
            name: step.transit.arrival_stop.name
          },
          line: {
            name: step.transit.line.name
          }
        }
      }

      cleanRoute.steps.push(routeStep);

    });

    resolve(cleanRoute);

  });
}

export function getRecentRoutes() {
  return function(dispatch) {
    openDataBase().then(function(db) {
      var index = db.transaction('routes')
        .objectStore('routes').index('by-id');

      return index.getAll().then(function(recentRoutes) {
        dispatch(getRecentRoutesSuccess(recentRoutes.reverse()));
      })


    });
  }
}
export function getRecentRoutesSuccess(recentRoutes) {
  return {type: actionTypes.RECENT_ROUTES_SUCCESS, recentRoutes: recentRoutes};
}
export function loadingFalse() {
  return {type: actionTypes.LOADING, loading: false};
}

export function loadingTrue() {
  return {type: actionTypes.LOADING, loading: true};
}

export function getRouteSuccess(directions) {
  return {type: actionTypes.GET_ROUTE_SUCCES, directions: directions};
}
