import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import {store} from '../../store'

import Header from '../components/header'
import Sidebar from '../components/sidebar'

const Layout = ({content, menu}) => {
    return (
        <Provider store={store}>
            <MuiThemeProvider>
                <div className="app__layout">
                    <div className="flex--nowrap">
                        <Sidebar menu={menu} />
                        <main>
                            <Header />
                            { content }
                        </main>
                    </div>
                </div>
            </MuiThemeProvider>
        </Provider>
    )
}
//
// function composer(props, onData) {
//     const menu = Session.get('menu')
//     onData(null, {menu})
// }
//
// export default composeWithTracker(composer)(Layout)

export default Layout