import React from 'react'
import ReactDOM from 'react-dom'

export default class AccountsUI extends React.Component{

    componentDidMount () {
      this.view = Blaze.render(Template.loginButtons,
          ReactDOM.findDOMNode(this._node)
      )
    }

    componentWillUnmount () {
        Blaze.remove(this.view)
    }

    render () {
        return (
            <span className="app__accounts" ref={c => this._node = c} />
        )
    }
}