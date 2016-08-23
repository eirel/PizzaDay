import React, {Component} from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import TextField from 'material-ui/TextField'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {composeWithTracker} from 'react-komposer'
import ContentSend from 'material-ui/svg-icons/content/send'

const style = {
    marginRight: 20
}

const mapItemsToSource = (items) =>
    items.map(item => ({
        name : item.name,
        price: item.price
    }))

const dataSourceConfig = {
    text: 'name',
    value: 'price'
}

class AddOrder extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            price: 0,
            quantity: 1
        }
    }

    handleUpdateInput (t) {
        this.setState({
            name: t
        })
    }

    handleSelect(e) {
        this.setState({
            name: e.name,
            price: e.price
        })
    }

    onOrderAdd(id) {
        return (event) => {
            event.preventDefault()

            Meteor.call('addOrderItem', {
                id: id,
                name: this.state.name,
                price: this.state.price,
                quantity: event.target.quantity.value
            })

            this.setState({
                name: '',
                price: 0,
                quantity: 1
            })
        }

    }

    render() {
        const {items, id, isOrdered} = this.props
        return (
            <form className="form--add-order" onSubmit={this.onOrderAdd(id)}>
                <Row>
                    <Col xz="12" sm="6">
                        <AutoComplete
                            floatingLabelText="Type your yummy here... "
                            filter={AutoComplete.caseInsensitiveFilter}
                            dataSource={mapItemsToSource(items)}
                            fullWidth={true}
                            searchText={this.state.name}
                            name="name"
                            required={true}
                            disabled={isOrdered}
                            openOnFocus={true}
                            onUpdateInput={this.handleUpdateInput.bind(this)}
                            onNewRequest={this.handleSelect.bind(this)}
                            dataSourceConfig={dataSourceConfig}

                        />
                    </Col>
                    <Col xz="6" sm="3">
                        <TextField
                            floatingLabelText="Quantity"
                            hintText="1"
                            defaultValue={1}
                            name="quantity"
                            type="number"
                            min={1}
                            step="any"
                            disabled={isOrdered}
                            fullWidth={true}
                            required={true}
                        />
                    </Col>
                    <Col xz="6" sm="3">
                        <FloatingActionButton
                            type="submit"
                            disabled={isOrdered}
                            style={style}
                        >
                            <ContentSend />
                        </FloatingActionButton>
                    </Col>
                </Row>
            </form>
        )
    }
}


function composer({members}, onData) {
    const member = members.find(member => member.id === Meteor.userId())
    const status = member ? member.status : 'ordering'
    const isOrdered = status === 'ordered'
    onData(null, {status, isOrdered})
}

export default composeWithTracker(composer)(AddOrder)