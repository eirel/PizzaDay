import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
    marginLeft: 12,
    marginTop: 12
}

const ActionButton = ({owner, onDelete}) => {
    if (owner === Meteor.userId()) {
        return (
            <RaisedButton
                label="Delete"
                secondary={true}
                style={style}
                className="btn--join"
                onTouchTap={() => {
                    onDelete()
                }}
            />
        )
    } else {
        return (
            <RaisedButton
                label="Join"
                secondary={true}
                style={style}
                className="btn--join"
            />
        )
    }
}

const Widget = ({_id, name, logo, owner, members = [], onDelete, active}) => (
    <Paper zDepth={1}  className="group__widget" >
        <div className="logo" style={{backgroundImage: `url(${logo})`}}></div>
        <div className="content">
            <h2>{name}</h2>
            <h4 className="members">Members: {members.length}</h4>

            <div className="flex--end">
                <RaisedButton href={`/groups/${_id}`} label="View" style={style} />
                <ActionButton
                    owner={owner}
                    onDelete={() => {
                    console.log(active)
                        onDelete()
                    }
                    }
                />
            </div>
        </div>
    </Paper>
)


export { Widget }