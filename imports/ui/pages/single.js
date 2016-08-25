import React from 'react'
import { Meteor } from 'meteor/meteor'
import {composeWithTracker} from 'react-komposer'
import CircularProgress from 'material-ui/CircularProgress'
import Groups from '../../api/groups/groups'
import RaisedButton from 'material-ui/RaisedButton'
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import Paper from 'material-ui/Paper'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Menu from '../components/menu'
import Members from '../components/members'
import Events from '../components/events'
import Orders from '../components/orders'
import { ActionButton } from '../components/members/crud'
import { FlowRouter } from 'meteor/kadira:flow-router'

const SingleGroup = ({_id, name, logo, owner, members, menu, orders, event, isOwner, isMember, isParticipant }) => {
    return (
        <section className="app__section" id="single">
            <Row>
                <Col sm="12">
                    <div className="tac" style={{marginBottom: '40px'}}>
                        <Paper
                            zDepth={1}
                            circle={true}
                            className="group__logo"
                            style={{backgroundImage: `url(${logo})` }}
                        />

                        <div className="flex--center">
                            <div>
                                <h2 style={{marginBottom: 15}}>Welcome to {name}!</h2>
                                <div className="tac">
                                    <RaisedButton
                                        href="/groups"
                                        label="Back"
                                        icon={<HardwareKeyboardArrowLeft />}
                                        style={{marginRight: 20}}
                                    />
                                    <ActionButton
                                        id={_id}
                                        isOwner={isOwner}
                                        isMember={isMember}
                                        members={members.length}
                                        style={{marginRight: '20px'}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md="12" lg="4">
                    <Menu
                        id={_id}
                        menu={menu}
                        isOwner={isOwner}
                        isMember={isMember}
                    />
                </Col>
                <Col md="12" lg="5">
                    <Events
                        id={_id}
                        event={event}
                        members={members}
                        isOwner={isOwner}
                        isMember={isMember}
                        isParticipant={isParticipant}
                    />
                </Col>
                <Col md="12" lg="3">
                    <Members
                        id={_id}
                        members={members}
                        owner={owner}
                        isOwner={isOwner}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <Orders
                        id={_id}
                        menu={menu}
                        members={members}
                        orders={orders}
                        isParticipant={isParticipant}
                        isGroupOwner={isOwner}
                    />
                </Col>
            </Row>
        </section>
    )
}

const composer = ({ id }, onData) => {
    if (Meteor.subscribe('group', id).ready()) {
        const group = Groups.findOne(id)

        if (group) {
            const isOwner = Meteor.userId() === group.owner
            const isMember = group.members.some(any => any.id === Meteor.userId())

            const member = group.members.find(member => member.id === Meteor.userId())
            const isParticipant = member ? member.isParticipant : false

            onData(null, {...group, isOwner, isMember, isParticipant})
        } else {
            Bert.alert( "<p>Seems like your group doesn't exist anymore(</p>", 'danger', 'growl-bottom-right' )
            FlowRouter.go('/groups')
        }
    }
}

export default composeWithTracker(composer, CircularProgress)(SingleGroup)