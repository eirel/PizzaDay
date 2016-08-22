import React, {Component, PropTypes} from 'react'
import {List, MakeSelectable} from 'material-ui/List'

let SelectableList = MakeSelectable(List)

function wrapState(ComposedComponent) {
    return class SelectableList extends Component {
        static propTypes = {
            children: PropTypes.node.isRequired,
            defaultValue: PropTypes.number.isRequired
        }

        componentWillMount() {
            this.setState({
                selectedIndex: this.props.defaultValue
            })
        }

        componentWillReceiveProps(nextProps) {
            this.setState({
                selectedIndex: nextProps.defaultValue
            })
        }

        handleRequestChange = (event, index) => {
            this.setState({
                selectedIndex: index
            })
        }

        render() {
            return (
                <ComposedComponent
                    value={this.state.selectedIndex}
                    onChange={this.handleRequestChange}
                >
                    {this.props.children}
                </ComposedComponent>
            )
        }
    }
}

export default wrapState(SelectableList)
