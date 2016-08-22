import React from 'react'
import AddItem from './add'
import MenuTable from './table'
import {composeWithTracker} from 'react-komposer'
import Subheader from 'material-ui/Subheader'

const Menu = ({id, menu, isMember}) => {
    return (
        <div className="menu tearsheet middle">
            <Subheader className="tearsheet__subheader">Menu</Subheader>
            { isMember ? <AddItem id={id} /> : <div></div> }
            <MenuTable id={id} menu={menu} isMember={isMember} />
        </div>
    )
}   

export default Menu