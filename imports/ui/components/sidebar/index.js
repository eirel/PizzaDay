import React from 'react'
import {ListItem} from 'material-ui/List'
import ActionHome from 'material-ui/svg-icons/action/home'
import SocialPeople from 'material-ui/svg-icons/social/people'
import ActionEvent from 'material-ui/svg-icons/action/event'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import SelectableList from './list'
import {composeWithTracker} from 'react-komposer'

const Sidebar = ({index, menu}) => (
    <div className={'app__sidebar ' + (menu ? 'opened' : '')}>
        <SelectableList defaultValue={index} className="app__nav">
            <ListItem href="/" primaryText="Home" leftIcon={<ActionHome />} value={1}/>
            <ListItem href="/groups" primaryText="User groups" leftIcon={<SocialPeople />} value={2}/>
            <ListItem href="/events" primaryText="Events" leftIcon={<ActionEvent />} value={3}/>
            <ListItem href="/profile" primaryText="Profile" leftIcon={<ActionSettings />} value={4}/>
        </SelectableList>
    </div>
)

const composer = (props, onData) => {
    const menu = Session.get('menu')
    onData(null, {menu})
}

export default composeWithTracker(composer)(Sidebar)