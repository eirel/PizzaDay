import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { FlowRouter } from 'meteor/kadira:flow-router'
import EventStepper from './stepper'
import Participants from './participants'

const style = {
    entry: {
        marginBottom: 5
    },
    button: {
        margin: 12
    }
}

const addParticipant = (id) =>
    Meteor.call('addParticipant', {
        id: id,
        userId: Meteor.userId()
    })

const removeParticipant = (id) =>
    Meteor.call('removeParticipant', {
        id: id,
        userId: Meteor.userId()
    })

const removeEvent = (id) =>
    Meteor.call('removeEventByGroup', id, () => {
        Meteor.call('removeParticipants', id)
        Meteor.call('removeOrderItems', {id})
    })

const EventWidget = ({id, name, date, members, status, isOwner, isMember, isParticipant}) => {
    if (status) {
        return (
            <div className="event__widget">
                <div style={style.entry}>
                    <b>Upcoming event:</b>
                    <span> {name}</span>
                </div>
                <div style={style.entry}>
                    <b>Date:</b>
                    <span> {date.toDateString('dd-MMM-yyyy')}</span>
                </div>
                <div style={style.entry}>
                    <b>Status:</b>
                    <span> {status}</span>

                    <EventStepper id={id} status={status} isOwner={isOwner} />
                </div>

                <div style={style.entry}>
                    <b>Participants:</b>
                    <Participants members={members} />
                </div>
                {
                    isMember &&
                    <div className="flex--end">
                        {
                            isOwner &&
                            <RaisedButton
                                label="Drop Event!"
                                secondary={true}
                                onTouchTap={() => removeEvent(id)}
                                style={style.button}
                                className={'btn--delete'}
                            />
                        }
                        {
                            isParticipant ?
                                <RaisedButton
                                    label="Leave event!"
                                    secondary={true}
                                    onTouchTap={() => removeParticipant(id)}
                                    style={style.button}
                                /> :
                                <RaisedButton
                                    label="Take part!"
                                    primary={true}
                                    onTouchTap={() => addParticipant(id)}
                                    style={style.button}
                                />
                        }

                    </div>
                }
            </div>
        )
    }
    return (
        <h4 className="tac">
            <i>No events yet!</i>
        </h4>
    )
}

export default EventWidget