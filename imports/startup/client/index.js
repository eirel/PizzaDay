import { Meteor } from 'meteor/meteor'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './routes'
import '../../ui/sheets/index.styl'

Meteor.startup(() => {
    Hooks.init()

    // Needed for onTouchTap
    // http://stackoverflow.com/a/34015469/988941
    injectTapEventPlugin()
})