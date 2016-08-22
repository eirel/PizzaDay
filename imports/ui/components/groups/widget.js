import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { ActionButton } from '../members/crud'

const style = {
    marginLeft: 12,
    marginTop: 12
}

const Widget = ({_id, name, logo, owner, members = []}) => (
    <Paper zDepth={1}  className="group__widget" >
        <div className="logo" style={{backgroundImage: `url(${logo})`}}></div>
        <div className="content">
            <h2>{name}</h2>
            <h4 className="members">Members: {members.length}</h4>

            <div className="flex--end">
                <RaisedButton href={`/groups/${_id}`} label="View" style={style} />
            </div>
        </div>
    </Paper>
)

export { Widget }