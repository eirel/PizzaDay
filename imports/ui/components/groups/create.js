import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import Subheader from 'material-ui/Subheader'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

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

const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min)

export const getRandomKitten = () =>
    `https://placekitten.com/${getRandomInt(400, 500)}/300`

class CreateGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logoURL: getRandomKitten()
        }
    }

    onSubmit(event) {
        event.preventDefault()
        const name = event.target.name.value
        const logo = event.target.logo.value

        Meteor.call('addGroup', {
            name: name,
            logo: logo
        })

        event.target.name.value = ''
        event.target.logo.value = ''
        this.setState({
            logoURL: getRandomKitten()
        })
    }

    render() {
        const {floatingLabelStyle, floatingLabelFocusStyle, underlineStyle} = styles
        return (
            <div className="tearsheet high">
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
                        value={this.state.logoURL}
                        floatingLabelStyle={floatingLabelStyle}
                        floatingLabelFocusStyle={floatingLabelFocusStyle}
                        underlineFocusStyle={underlineStyle}
                        onChange={(e) =>
                            this.setState({
                                logoURL: e.target.value
                            })
                        }
                    />
                    <img src={this.state.logoURL} className="image"/>
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

export {CreateGroup}