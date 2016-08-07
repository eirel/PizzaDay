import React from 'react'
import { Meteor } from 'meteor/meteor'
import {composeWithTracker} from 'react-komposer'

const Home = ({ authorized }) => {
    return (
        <section className="app__section" id="home">
            <div className="posa flex--center">
                <Main authorized={authorized} />
            </div>
        </section>
    )
}

const toggleSignIn = (event) => {
    event.preventDefault()
    Session.set('Meteor.loginButtons.dropdownVisible', !Session.get('Meteor.loginButtons.dropdownVisible'))
}

const Main = ({authorized}) => {
    if (authorized) {
        return (
            <div>
                <h1 className="tac">Welcome back!</h1>
                <h3>Check out our upcoming <a href="/events" className="color--brand underline">events</a>!</h3>
            </div>
        )
    }
    return (
        <div>
            <h1 className="tac">Yo, man!</h1>
            <h3>Seems like you need to <a href="/" className="color--brand underline" onClick={toggleSignIn}>Sign in</a>, bro</h3>
        </div>
    )
}


function composer(props, onData) {
    const authorized = Meteor.userId()
    onData(null, {authorized})
}

export default composeWithTracker(composer)(Home)