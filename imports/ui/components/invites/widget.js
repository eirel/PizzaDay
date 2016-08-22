import React from 'react'
import {Meteor} from 'meteor/meteor'
import {composeWithTracker} from 'react-komposer'
import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Groups from '../../../api/groups/groups'
import { FlowRouter } from 'meteor/kadira:flow-router'


const style = {
    marginLeft: 12,
    marginTop: 12
}

const onJoin = (inviteId, id) =>
    Meteor.call('addMember', {
        id: id,
        userId: Meteor.userId()
    }, (err, result) => {
        if (!err) {
            Meteor.call('removeInvitation', inviteId,
                () => FlowRouter.go(`/groups/${id}`)
            )
        }
    })

const onDecline = (id) =>
    Meteor.call('removeInvitation', id)

const InviteWidget = ({inviteId, _id, name, logo, owner, recipient}) => (
    <Paper zDepth={1} className="invite__widget">

        <div className="logo" style={{backgroundImage: `url(${logo})`}}></div>
        <div className="content">
            <h2>{owner.profile ? owner.profile.name : owner.username} invites You to {name}</h2>

            <div className="flex--end">
                <RaisedButton
                    label="View"
                    style={style}
                    href={`/groups/${_id}`}
                />
                <RaisedButton
                    label="Join"
                    secondary={true}
                    style={style}
                    className="btn--join"
                    onTouchTap={() => onJoin(inviteId, _id)}
                />
                <RaisedButton
                    label="Decline"
                    secondary={true}
                    style={style}
                    className="btn--delete"
                    onTouchTap={() => onDecline(inviteId)}
                />
            </div>
        </div>
    </Paper>
)


const composer = ({group}, onData) => {

    if (Meteor.subscribe('group', group).ready()) {
        const extend = Groups.findOne(group)

        if (Meteor.subscribe('user', extend.owner).ready()) {
            const owner = Meteor.users.findOne(extend.owner)

            onData(null, {...extend, owner})
        }
    }
}

export default composeWithTracker(composer, CircularProgress)(InviteWidget)