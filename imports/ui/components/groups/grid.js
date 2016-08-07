import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import { Widget } from './widget'
import { GroupsDialog } from './dialog'
import SubscribeComponent from '../subscribe'
import {connect} from 'react-redux'
import * as actions from '../../../api/groups/actions'

const mapStateToProps = state => ({
    groups: state.groups
})

class GroupsGrid extends Component {

    componentWillMount() {
        const {subscribe, getGroups} = this.props
        subscribe('groups', onReady = () => getGroups())
    }

    render() {
        const { groups } = this.props

        if (groups.length !== 0) {
            return (
                <div className="groups__grid">
                    <Row>
                        {
                            groups &&
                            groups.map(group =>
                                <Col sm="12" md="6" lg="4" key={group._id}>
                                    <Widget onDelete={showModalDialog} {...group} />
                                </Col>
                            )
                        }
                    </Row>
                    <GroupsDialog group={groups.find(group => group.active)} />
                </div>
            )
        }
        return <CircularProgress />
    }
}

const showModalDialog = () =>
    Session.set('modalDialogOpened', true)

export default connect(mapStateToProps, actions)(SubscribeComponent(GroupsGrid))