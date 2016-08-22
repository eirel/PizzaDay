import React from 'react'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import { Meteor } from 'meteor/meteor'
import {composeWithTracker} from 'react-komposer'
import CircularProgress from 'material-ui/CircularProgress'
import Invites from '../../../api/invites/invites'

const style = {
    padding: 0,
    marginRight: '15px'
}

const Notifications = ({count}) => (
    <Badge
        badgeContent={count}
        secondary={true}
        badgeStyle={{
            top: 0,
            right: "-5px",
            visibility: count ? 'visible' : 'hidden'
        }}
        style={style}
    >
        <IconButton
            tooltip="invitations"
            href="/profile/"
        >
            <NotificationsIcon />
        </IconButton>
    </Badge>
)



const composer = (props, onData) => {
    if (Meteor.subscribe('invites', Meteor.userId()).ready()) {
        const invites = Invites.find({'recipient': Meteor.userId()}).fetch()
        const count = invites.length
        onData(null, {count})
    }
}

export default composeWithTracker(composer, CircularProgress)(Notifications)