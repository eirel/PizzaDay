import React, {Component} from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSend from 'material-ui/svg-icons/content/send'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import AutoComplete from 'material-ui/AutoComplete'
import {composeWithTracker} from 'react-komposer'
import CircularProgress from 'material-ui/CircularProgress'

const mapUsersToSource = (users) =>
    users.map(user => ({
        name : user.profile ? user.profile.name : user.username,
        id: user._id
    }))


const dataSourceConfig = {
    text: 'name',
    value: 'id'
}

class AddMember extends Component {
    constructor() {
        super()
        this.state = {
            user: null,
            name: ''
        }
    }

    onMemberAdd(id) {
        return (event) => {
            event.preventDefault()

            Meteor.call('addInvitation', {
                recipient: this.state.user,
                group: id
            })

            this.setState({
                name: ''
            })
        }
    }

    handleUpdateInput (t) {
        this.setState({
            name: t
        })
    }

    handleSelect (user) {
        this.setState({
            name: user.name,
            user: user.id
        })
    }

    render() {
        const {id, users} = this.props
        return (
            <form className="" onSubmit={this.onMemberAdd(id)}>
                <Row>
                    <Col xs="8">
                        <AutoComplete
                            floatingLabelText="Search for users... "
                            filter={AutoComplete.caseInsensitiveFilter}
                            dataSource={mapUsersToSource(users)}
                            fullWidth={true}
                            required={true}
                            openOnFocus={true}
                            searchText={this.state.name}
                            menuStyle = {{maxHeight: '300px'}}
                            onUpdateInput={this.handleUpdateInput.bind(this)}
                            onNewRequest={this.handleSelect.bind(this)}
                            dataSourceConfig={dataSourceConfig}
                        />
                    </Col>
                    <Col xs="2">
                        <div className="flex--center">
                            <FloatingActionButton
                                type="submit"
                            >
                                <ContentSend />
                            </FloatingActionButton>
                        </div>
                    </Col>
                </Row>
            </form>
        )
    }
}

const xor = (most, less) =>
    most.filter(item =>
        !less.some(any =>
            any._id === item._id
        )
    )

const fetchMembers = (members) =>
    members.map(member =>
        Meteor.users.findOne(member.id)
    )

const composer = ({ members }, onData) => {
    if (Meteor.subscribe('users').ready()) {
        const users = xor(Meteor.users.find().fetch(), fetchMembers(members))
        onData(null, {users})
    }
}

export default composeWithTracker(composer, CircularProgress)(AddMember)