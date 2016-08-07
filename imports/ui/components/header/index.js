import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import AccountsUI from '../accounts'

const style = {
    dialog: {
        width: '100%',
        maxWidth: '350px'
    },
    button: {
        margin: 12
    }
}

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render() {
        const actions = [
            <FlatButton
                label="Sign up"
                style={style.button}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Login"
                primary={true}
                style={style.button}
                onTouchTap={this.handleClose}
            />
        ]

        return (
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
                            <Badge
                              badgeContent={2}
                              secondary={true}
                              badgeStyle={{top: 12, right: 12}}
                              className="badge--notification"
                            >
                              <IconButton tooltip="Notifications">
                                <NotificationsIcon />
                              </IconButton>
                            </Badge>
                            <AccountsUI />
                        </div>
                    }
                />
                <Dialog
                    title="Sign in"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    contentStyle={style.dialog}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        hintText="Username"
                        floatingLabelText="Username"
                    /><br/>
                    <TextField
                        hintText="Password"
                        floatingLabelText="Password"
                        type="password"
                    />
                </Dialog>

            </header>
        )
    }
}