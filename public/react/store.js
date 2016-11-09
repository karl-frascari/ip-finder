'use strict';

import {createStore, combineReducers} from 'redux';
import * as actions from './actions';
import _ from 'lodash';

const mapMarkers = (mapMarkers = [], action) => {
    switch (action.type) {
        case actions.SET_MAP_MARKERS:            
            return mapMarkers = _.concat([], action.mapMarkers);
        default:
            return mapMarkers;
    }
};

const route = (route = null, action) => {
    switch (action.type) {
        case actions.SET_ROUTE:
            if(!action.route) {
                return null;
            }
            return Object.assign({}, action.route);
        default:
            return route;
    }
};

const combinedReducers = combineReducers({
    route,
    mapMarkers
});

const rootReducer = (state, action) => {
    switch (action.type) {
        default:
            return combinedReducers(state, action);
    }
};

const store = createStore(rootReducer);

export default store;