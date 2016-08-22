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

    handleStep = (step) => {
        this.setState({stepIndex: step})
    }

    render() {
        const {stepIndex, visited} = this.state
        const {isOwner, isOrdered} = this.props

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
                        <StepButton onClick={() => isOwner && isOrdered ? this.handleStep(2) : null}>
                            Delivering...
                        </StepButton>
                    </Step>
                    <Step completed={visited.indexOf(3) !== -1} active={stepIndex === 3}>
                        <StepButton onClick={() => isOwner && isOrdered ? this.handleStep(3) : null}>
                            Delivered
                        </StepButton>
                    </Step>
                </Stepper>
            </div>
        )
    }
}

const mapStatusToStep = (status) => {
    switch (status) {
        case 'ordering':
            return 0
        case 'ordered':
            return 1
        case 'delivering':
            return 2
        case 'delivered':
            return 3
    }
}

const mapStatusToVisited = (status) => {
    switch (status) {
        case 'ordering':
            return [0]
        case 'ordered':
            return [0, 1]
        case 'delivering':
            return [0, 1, 2]
        case 'delivered':
            return [0, 1, 2, 3]
    }
}

const composer = ({status}, onData) => {
    const step = mapStatusToStep(status)
    const visited = mapStatusToVisited(status)
    const isOrdered = status === 'ordered'

    onData(null, {isOrdered, step, visited})
}

export default composeWithTracker(composer, CircularProgress)(EventStepper)