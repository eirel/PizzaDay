import React from 'react'
import {Step, Stepper, StepLabel, StepButton} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {composeWithTracker} from 'react-komposer'
import CircularProgress from 'material-ui/CircularProgress'

const styles = {
    root: {
        width: '100%',
        maxWidth: 700,
        margin: 'auto',
    },
    content: {
        margin: '0 16px',
    },
    actions: {
        marginTop: 12,
    },
    backButton: {
        marginRight: 12,
    }
}

class EventStepper extends React.Component {

    state = {
        stepIndex: this.props.step,
        visited: this.props.visited
    }

    componentWillMount() {
        const {stepIndex, visited} = this.state
        this.setState({visited: visited.concat(stepIndex)})
    }

    componentWillUpdate(nextProps, nextState) {
        const {stepIndex, visited} = nextState

        if (visited.indexOf(stepIndex) === -1) {
            this.setState({
                visited: visited.concat(stepIndex)
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stepIndex: nextProps.step
        })
    }

    handleStep = (id, status) => {
        // this.setState({stepIndex: step})
        Meteor.call('updateEventStatus', {group: id, status})
    }

    render() {
        const {stepIndex, visited} = this.state
        const {id, isOwner, isOrdered} = this.props

        return (
            <div style={styles.root}>
                <Stepper linear={false}>
                    <Step completed={visited.indexOf(0) !== -1} active={stepIndex === 0}>
                        <StepButton>
                            Ordering...
                        </StepButton>
                    </Step>
                    <Step completed={visited.indexOf(1) !== -1} active={stepIndex === 1}>
                        <StepButton>
                            Ordered
                        </StepButton>
                    </Step>
                    <Step completed={visited.indexOf(2) !== -1} active={stepIndex === 2}>
                        <StepButton onClick={() => isOwner && isOrdered && this.handleStep(id, 'delivering')}>
                            Delivering...
                        </StepButton>
                    </Step>
                    <Step completed={visited.indexOf(3) !== -1} active={stepIndex === 3}>
                        <StepButton onClick={() => isOwner && isOrdered && this.handleStep(id, 'delivered')}>
                            Delivered
                        </StepButton>
                    </Step>
                </Stepper>
            </div>
        )
    }
}

const composer = ({status}, onData) => {
    const statuses = ['ordering', 'ordered', 'delivering', 'delivered']
    const step = (step => step > -1 ? step : 0)(statuses.indexOf(status))

    const visited = Object.keys(statuses).map(key => ~~key).slice(0, step + 1)
    const isOrdered = statuses.slice(0, step + 1).indexOf('ordered') > -1

    onData(null, {isOrdered, step, visited})
}

export default composeWithTracker(composer, CircularProgress)(EventStepper)