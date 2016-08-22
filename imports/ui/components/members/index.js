import React from 'react'
import {composeWithTracker} from 'react-komposer'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import {getRandomKitten} from '../groups/create'
import {pinkA200, transparent} from 'material-ui/styles/colors'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import AddMember from './add'
import CircularProgress from 'material-ui/CircularProgress'

const Members = ({id, members, owner, isOwner}) => {
    return (
        <div className="tearsheet middle">
            <Subheader className="tearsheet__subheader">Members</Subheader>

            { isOwner && <AddMember id={id} members={members}/> }

            <List>
                {
                    members &&
                    members.map(member => {
                        const {id, username, photo} = member
                        return (
                            <ListItem
                                key={id}
                                primaryText={username}
                                rightIcon={id === owner ? <ActionGrade color={pinkA200} /> : <div></div>}
                                leftAvatar={
                                    <Avatar src={photo} />
                                }
                            />
                        )
                    })
                }

            </List>
        </div>
    )
}

export default Members