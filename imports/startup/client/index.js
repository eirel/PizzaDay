import './routes'
import '../../ui/styles/index.styl'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Meteor } from 'meteor/meteor'

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
})

Meteor.startup(() => {
    Hooks.init()

    // Needed for onTouchTap
    // http://stackoverflow.com/a/34015469/988941
    injectTapEventPlugin()
})