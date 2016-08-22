import React from 'react'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import {composeWithTracker} from 'react-komposer'
import CircularProgress from 'material-ui/CircularProgress'

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '5px 0'
    },
}

const Participants = ({participants}) => (
    <div style={styles.wrapper}>
        {
            participants &&
            participants.map((participant, index) =>
                <Chip
                    key={index}
                    style={styles.chip}
                >
                    <Avatar src={participant.photo} />
                    {participant.username}
                </Chip>
            )
        }
    </div>
)


const composer = ({members}, onData) => {
    const participants = members.filter(member => member.isParticipant)

    onData(null, {participants})
}

export default composeWithTracker(composer, CircularProgress)(Participants)
