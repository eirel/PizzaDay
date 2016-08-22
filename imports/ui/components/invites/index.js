import React from 'react'
import { Meteor } from 'meteor/meteor'
import {composeWithTracker} from 'react-komposer'
import CircularProgress from 'material-ui/CircularProgress'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Invites from '../../../api/invites/invites'
import InviteWidget from './widget'

const InvitesGrid = ({ invites }) => {
    return (
        <div className="invites__grid">
            <h1>Invitations</h1>
            <Row>
                {
                    invites &&
                    invites.map(invite =>
                        <Col sm="12" md="6" lg="4" key={invite._id}>
                            <InviteWidget inviteId={invite._id} {...invite} />
                        </Col>
                    )
                }
            </Row>
        </div>
    )
}


const composer = (props, onData) => {
    if (Meteor.subscribe('invites', Meteor.userId()).ready()) {
        const invites = Invites.find({'recipient': Meteor.userId()}).fetch()
        onData(null, {invites})
    }
}

export default composeWithTracker(composer, CircularProgress)(InvitesGrid)