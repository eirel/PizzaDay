import React from 'react'
import { Meteor } from 'meteor/meteor'
import {composeWithTracker} from 'react-komposer'
import CircularProgress from 'material-ui/CircularProgress'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import { Widget } from './widget'
import Groups from '../../../api/groups/groups'

const Grid = ({ groups }) => {
    return (
        <div className="groups__grid">
            <Row>
                {
                    groups &&
                    groups.map(group =>
                        <Col sm="12" md="6" lg="4" key={group._id}>
                            <Widget {...group} />
                        </Col>
                    )
                }
            </Row>
        </div>
    )
}


const composer = (props, onData) => {
    if (Meteor.subscribe('groups').ready()) {
        const groups = Groups.find({}).fetch()
        onData(null, {groups})
    }
}

export const GroupsGrid = composeWithTracker(composer, CircularProgress)(Grid)