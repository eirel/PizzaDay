import React from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

const closeModalDialog = () =>
    Session.set('modalDialogOpened', false)

const deleteGroup = (id) => {}

export const GroupsDialog = ({name}) => (
    <Dialog
        actions={[
            <RaisedButton
                label="Nah"
                style={{marginRight: "10px"}}
                onTouchTap={closeModalDialog}
            />,
            <RaisedButton
                label="Yep"
                secondary={true}
                onTouchTap={deleteGroup}
            />
        ]}
        modal={false}
        contentStyle={{
            width: '100%',
            maxWidth: '450px'
        }}
        open={Session.get('modalDialogOpened') || false}
        onRequestClose={closeModalDialog}
    >
        <h2 style={{textAlign: 'center'}}>{`You are about to delete ${name} group. Are U sure ?`}</h2>
    </Dialog>
)