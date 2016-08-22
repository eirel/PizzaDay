import React, {Component} from 'react'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {composeWithTracker} from 'react-komposer'
import ContentSend from 'material-ui/svg-icons/content/send'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
    input: {
        marginBottom: 10
    },
    button: {
        margin: '12px 0'
    }
}

const nextEventDate = (date) => {
    let ret = new Date(date || new Date())
    ret.setDate(ret.getDate() + (3 - 1 - ret.getDay() + 7) % 7 + 1)
    return ret
}

export default class AddEvent extends Component {
    constructor() {
        super()
        this.state = {
            name: 'Pizza Day',
            date: nextEventDate()
        }
    }

    // handleUpdateInput (t) {
    //     this.setState({
    //         name: t
    //     })
    // }
    //
    // handleSelect(e) {
    //     this.setState({
    //         name: e.name,
    //         price: e.price
    //     })
    // }

    handleDateChange = (event, date) => {
        this.setState({
            date: date
        })
    }

    onEventAdd(id) {
        return (event) => {
            event.preventDefault()

            Meteor.call('addEvent', {
                group: id,
                ...this.state
            }, () => {
                Meteor.call('addParticipant', {
                    id: id,
                    userId: Meteor.userId()
                })
            })

            // this.setState({
            //     name: '',
            //     price: 0,
            //     quantity: 1
            // })
        }

    }

    render() {
        const {id} = this.props
        return (
            <form className="form--add-event" onSubmit={this.onEventAdd(id)}>
                <Row>
                    <Col xs="12">
                        <TextField
                            floatingLabelText="Name"
                            defaultValue={this.state.name}
                            name="name"
                            fullWidth={true}
                            required={true}
                            style={style.input}
                        />
                    </Col>
                    <Col xs="12">
                        <DatePicker
                            hintText="Event Date"
                            name="date"
                            value={this.state.date}
                            onChange={this.handleDateChange}
                            autoOk={true}
                            style={style.input}
                        />
                    </Col>
                    <Col xs="12">
                        <div className="flex--end">
                            <RaisedButton
                                type="submit"
                                label="Create event"
                                primary={true}
                                style={style.button}
                            />
                        </div>
                    </Col>
                </Row>
            </form>
        )
    }
}

