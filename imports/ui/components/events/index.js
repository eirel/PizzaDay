import React from 'react'
import {Meteor} from 'meteor/meteor'
import Subheader from 'material-ui/Subheader'
import {composeWithTracker} from 'react-komposer'
import CircularProgress from 'material-ui/CircularProgress'
import Events from '../../../api/events/events'
import AddEvent from './add'
import EventWidget from './widget'

const EventsComponent = ({id, members, event, isOwner, isMember, isParticipant}) => {
    return (
        <div className="tearsheet middle">
            <Subheader className="tearsheet__subheader">Events</Subheader>
            {
                isOwner && !event ?
                    <AddEvent id={id} /> :
                    <EventWidget 
                        id={id} 
                        members={members} 
                        isParticipant={isParticipant}
                        isOwner={isOwner}
                        isMember={isMember}
                        {...event}
                    />
            }
        </div>
    )
}

const composer = ({id}, onData) => {
    if (Meteor.subscribe('event', id).ready()) {
        const event = Events.findOne({group: id})

        onData(null, {event})
    }
}

export default composeWithTracker(composer, CircularProgress)(EventsComponent)