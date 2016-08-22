import React from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import Groups from '../../../api/groups/groups'
import {composeWithTracker} from 'react-komposer'

const closeModalDialog = () => {
    Session.set('Modal.group.opened', false)
    Session.set('Modal.group.active', null)
}

const deleteGroup = (id) =>
    Meteor.call('removeGroup', id, () => closeModalDialog())

const style = {
    modal: {
        width: '100%',
        maxWidth: '450px'
    },
    button: {
        marginRight: "10px"
    }
}

const GroupsDialog = ({group}) => {
    return (
        <Dialog
            actions={[
                <RaisedButton
                    label="No!"
                    style={style.button}
                    onTouchTap={closeModalDialog}
                />,
                <RaisedButton
                    label="Yep"
                    secondary={true}
                    className="btn--delete"
                    onTouchTap={() => deleteGroup(group._id)}
                />
            ]}
            modal={false}
            contentStyle={style.modal}
            open={Session.get('Modal.group.opened') || false}
            onRequestClose={closeModalDialog}
        >
            <h2 style={{textAlign: 'center'}}>
                {`RU sure U want to delete ${group ? group.name : ''} group?`}
            </h2>
        </Dialog>
    )
}

function composer(props, onData) {
    const group = Groups.findOne(Session.get('Modal.group.active'))
    onData(null, {group})
}

export default composeWithTracker(composer)(GroupsDialog)