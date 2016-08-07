import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Subheader from 'material-ui/Subheader'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import SubscribeComponent from '../subscribe'
import {connect} from 'react-redux'
import * as actions from '../../../api/groups/actions'

const styles = {
    errorStyle: {
        color: "rgb(222, 79, 79)"
    },
    underlineStyle: {
        borderColor: "rgb(222, 79, 79)"
    },
    floatingLabelStyle: {
        color: "rgb(222, 79, 79)"
    },
    floatingLabelFocusStyle: {
        color: "rgb(222, 79, 79)"
    }
}

const mapStateToProps = state => state

class CreateGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logoURL: ''
        }
    }
    onSubmit(event) {
        event.preventDefault()

        this.props.addGroup({
            name: event.target.name.value,
            logo: event.target.logo.value
        })

        event.target.name.value = ''
        event.target.logo.value = ''

        this.setState({
            logoURL: ''
        })
    }
    render() {
        const {floatingLabelStyle, floatingLabelFocusStyle, underlineStyle} = styles
        return (
            <div className="tearsheet">
                <form className="form--group-create" onSubmit={event => this.onSubmit(event)}>
                    <Subheader className="tearsheet__subheader">Create new group</Subheader>
                    <TextField
                        floatingLabelText="Group name"
                        hintText="Name"
                        name="name"
                        fullWidth={true}
                        required={true}
                        floatingLabelStyle={floatingLabelStyle}
                        floatingLabelFocusStyle={floatingLabelFocusStyle}
                        underlineFocusStyle={underlineStyle}
                    /><br/>
                    <TextField
                        floatingLabelText="Group logo"
                        hintText="URL"
                        name="logo"
                        fullWidth={true}
                        required={true}
                        floatingLabelStyle={floatingLabelStyle}
                        floatingLabelFocusStyle={floatingLabelFocusStyle}
                        underlineFocusStyle={underlineStyle}
                        onChange={(e) =>
                            this.setState({
                                logoURL: e.target.value
                            })
                        }
                    />
                    <img src={this.state.logoURL} className="image" />
                    {/*
                        <div className="logo" style={{backgroundImage: `url(${this.state.logoURL})`}}></div>
                     */}
                    <div className="flex--end">
                        <FloatingActionButton
                            type="submit"
                            className="btn--create"
                        >
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, actions)(SubscribeComponent(CreateGroup))