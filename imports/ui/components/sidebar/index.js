import React, {Component, PropTypes} from 'react'
import {List, ListItem, MakeSelectable} from 'material-ui/List'
import ActionHome from 'material-ui/svg-icons/action/home'
import SocialPeople from 'material-ui/svg-icons/social/people'
import ActionEvent from 'material-ui/svg-icons/action/event'
// import ContentSend from 'material-ui/svg-icons/content/send'

let SelectableList = MakeSelectable(List)

function wrapState(ComposedComponent) {
    return class SelectableList extends Component {
        static propTypes = {
            children: PropTypes.node.isRequired,
            defaultValue: PropTypes.number.isRequired
        }

        componentWillMount() {
            this.setState({
                selectedIndex: this.props.defaultValue
            })
        }

        handleRequestChange = (event, index) => {
            this.setState({
                selectedIndex: index
            })
        }

        render() {
            return (
                <ComposedComponent
                    value={this.state.selectedIndex}
                    onChange={this.handleRequestChange}
                >
                    {this.props.children}
                </ComposedComponent>
            )
        }
    }
}

SelectableList = wrapState(SelectableList)

const Sidebar = ({menu}) => (
    <div className={'app__sidebar ' + (menu ? 'opened' : '')}>
        <SelectableList defaultValue={2} className="app__nav">
            <ListItem href="/" primaryText="Home" leftIcon={<ActionHome />} value={1} />
            <ListItem href="/groups"  primaryText="User groups" leftIcon={<SocialPeople />} value={2} />
            <ListItem href="/events" primaryText="Events" leftIcon={<ActionEvent />} value={3} />
        </SelectableList>
    </div>
)

export default Sidebar