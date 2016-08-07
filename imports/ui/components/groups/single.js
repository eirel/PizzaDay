import React from 'react'
import { Meteor } from 'meteor/meteor'
import {composeWithTracker} from 'react-komposer'
import Groups from '../../../api/groups/groups'
import CircularProgress from 'material-ui/CircularProgress'
import { Menu } from '../menu'

const Single = ({ group }) => {
    return (
        <section className="app__section" id="single">
            <h1>Welcome to {group.name}</h1>
            <Menu id={group._id} />
        </section>
    )
}

const composer = ({ id }, onData) => {
    if (Meteor.subscribe('group', id).ready()) {
        const group = Groups.findOne(id)
        onData(null, {group})
    }
}

const SingleGroup = composeWithTracker(composer, CircularProgress)(Single)

export { SingleGroup }