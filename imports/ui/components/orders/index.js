import React from 'react'
import Subheader from 'material-ui/Subheader'
import OrderTable from './table'
import AddOrder from './add'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import {composeWithTracker} from 'react-komposer'
import CircularProgress from 'material-ui/CircularProgress'
import Events from '../../../api/events/events'

export const getUsername = (user) =>
    user ? user.profile ? user.profile.name : user.username : undefined

const Orders = ({id, menu, orders, members, isEventOrdering, isParticipant}) => {
    return (
        <div className="order tearsheet wide">
            <Subheader className="tearsheet__subheader">Order list</Subheader>
            {
                isParticipant && isEventOrdering &&
                <Row>
                    <Col xz="12" sm="8">
                        <AddOrder id={id} items={menu}/>
                    </Col>
                </Row>
            }
            {
                isEventOrdering &&
                    <OrderTable
                        id={id}
                        orders={orders}
                        members={members}
                        isParticipant={isParticipant}
                    />
            }
            {
                isParticipant && !isEventOrdering &&
                <h4 className="tac">
                    <i>We've sent an email with your orders. Check it out!</i>
                </h4>
            }

        </div>
    )
}


const composer = ({id}, onData) => {
    if (Meteor.subscribe('event', id).ready()) {
        const event = Events.findOne({group: id})
        const isEventOrdering = event ? event.status === 'ordering' : false

        onData(null, {isEventOrdering})
    }
}

export default composeWithTracker(composer, CircularProgress)(Orders)