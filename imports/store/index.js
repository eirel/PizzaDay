import React, { Component } from 'react'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {reducers} from '../reducers'
import { Tracker } from 'meteor/tracker'
import Groups from '../api/groups/groups'

const configureStore = (state) => {
    const middleware = [thunk]

    return createStore(
        combineReducers({
            ...reducers
        }),
        state,
        compose(
            applyMiddleware(...middleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )
}

export const store = configureStore({})

Tracker.autorun(() => {
    console.log('do')
    // store.dispatch({
    //     type: 'GET_GROUPS',
    //     groups: Groups.find().fetch()
    // })
})