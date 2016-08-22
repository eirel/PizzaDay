import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { showModalDialog } from '../groups'
import ActionDelete from 'material-ui/svg-icons/action/delete'

const onJoin = (id) =>
    Meteor.call('addMember', {
        groupId: id,
        userId: Meteor.userId()
    })

const onLeave = (id) =>
    Meteor.call('removeMember', {
        id: id,
        userId: Meteor.userId()
    })

const Button = ({isMember, isOwner, onDelete, onLeave, style}) => {
    if (isOwner) {
        return (
            <RaisedButton
                label="Delete"
                labelPosition="before"
                secondary={true}
                style={style}
                icon={<ActionDelete style={{width: 20}} />}
                className="btn--delete"
                onTouchTap={onDelete}
            />
        )
    } else {
        if(isMember) {
            return (
                <RaisedButton
                    label="Leave"
                    secondary={true}
                    style={style}
                    className="btn--leave"
                    onTouchTap={onLeave}
                />
            )
        } else {
            return (
                <div></div>
            )
        }

    }
}

export const ActionButton = ({id, isOwner, isMember, style}) =>  (
    <Button
        onDelete={() => showModalDialog(id)}
        isOwner={isOwner}
        isMember={isMember}
        onLeave={() => onLeave(id)}
        onJoin={() => onJoin(id)}
        style={style}
    />
)
