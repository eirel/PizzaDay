import React from 'react'
import AppBar from 'material-ui/AppBar'
import {AccountsUI} from '../accounts'
import Notifications from '../notifications'

const Header = () => (
    <header className="app__header">
        <AppBar
            title="Pizza Day"
            style={{backgroundColor: '#de4f4f'}}
            onLeftIconButtonTouchTap={() => {
                Session.set({
                  menu: !Session.get('menu')
                })
            }}
            iconElementRight={
                <div>
                    <Notifications />
                    <AccountsUI />
                </div>
            }
        />
    </header>
)

export default Header