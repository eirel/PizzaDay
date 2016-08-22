import React from 'react'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {orange500} from 'material-ui/styles/colors'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

const styles = {
    errorStyle: {
        color: orange500
    },
    underlineStyle: {
        borderColor: orange500
    },
    floatingLabelStyle: {
        color: orange500
    },
    floatingLabelFocusStyle: {
        color: orange500
    }
}

const onItemAdd = (id) => (event) => {
    event.preventDefault()

    const name = event.target.name.value
    const price = event.target.price.value

    Meteor.call('addMenuItem', {
        id: id,
        name: name,
        price: price
    })

    event.target.name.value = ''
    event.target.price.value = ''
    event.target.name.focus()
}

const AddItem = ({id}) => {
    const {floatingLabelStyle, floatingLabelFocusStyle, underlineStyle} = styles
    return (
        <form className="form--add-item" onSubmit={onItemAdd(id)}>
            <Row>
                <Col xs="6">
                    <TextField
                        floatingLabelText="Item name"
                        hintText="Name"
                        name="name"
                        fullWidth={true}
                        required={true}
                        floatingLabelStyle={floatingLabelStyle}
                        floatingLabelFocusStyle={floatingLabelFocusStyle}
                        underlineFocusStyle={underlineStyle}
                    />
                </Col>
                <Col xs="4">
                    <TextField
                        floatingLabelText="Item price"
                        hintText="$"
                        name="price"
                        type="number"
                        step="any"
                        min={0}
                        fullWidth={true}
                        required={true}
                        floatingLabelStyle={floatingLabelStyle}
                        floatingLabelFocusStyle={floatingLabelFocusStyle}
                        underlineFocusStyle={underlineStyle}
                    />
                </Col>
                <Col xs="2">
                    <div className="flex--center">
                        <FloatingActionButton
                            type="submit"
                            className="btn--create"
                        >
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>
                </Col>
            </Row>

        </form>
    )
}

export default AddItem
