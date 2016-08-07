import React from 'react'
import { Meteor } from 'meteor/meteor'
import {mount} from 'react-mounter'
import { FlowRouter } from 'meteor/kadira:flow-router'

import Layout from '../../ui/layouts'
import Home from '../../ui/pages/home'
import GroupsPage from '../../ui/pages/groups'
import { SingleGroup } from '../../ui/components/groups/single'
import EventsPage from '../../ui/pages/events'

Accounts.onLogin(function(){
    if (Session.get('authorized') === false) {
        Session.set('authorized', true)
        FlowRouter.redirect('/groups')
    }
})

Hooks.onLoggedOut = () => {
    Session.set('menu', false)
    Session.set('authorized', false)
    FlowRouter.redirect('/')
}

const redirectOnSignedOut = (context, redirect, stop) => {
    if (!Meteor.userId()) {
        Bert.alert( '<p>Not authorized</p>', 'danger', 'growl-bottom-right' )
        redirect('home')
    }
}

FlowRouter.route('/', {
    name: 'home',
    action() {
        mount(Layout, {
            content: (<Home />)
        })
    }
})

FlowRouter.route('/groups', {
    name: 'groups',
    triggersEnter: [redirectOnSignedOut],
    action() {
        mount(Layout, {
            content: (<GroupsPage />)
        })
    }
})

FlowRouter.route('/events', {
    name: 'events',
    triggersEnter: [redirectOnSignedOut],
    action() {
        mount(Layout, {
            content: (<EventsPage />)
        })
    }
})

FlowRouter.route('/groups/:id', {
    name: 'group',
    triggersEnter: [redirectOnSignedOut],
    action(params) {
        mount(Layout, {
            content: (<SingleGroup id={params.id} />)
        })
    }
})
