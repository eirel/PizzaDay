import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import GroupsDialog from '../components/groups/dialog'
import Header from '../components/header'
import Sidebar from '../components/sidebar'

const Layout = ({index, content}) => {
    return (
        <MuiThemeProvider>
            <div className="app__layout">
                <GroupsDialog />
                <div className="flex--nowrap">
                    <Sidebar index={index}  />
                    <main>
                        <Header />
                        { content }
                    </main>
                </div>
            </div>
        </MuiThemeProvider>
    )
}

export default Layout