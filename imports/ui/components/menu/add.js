import React from 'react'
import TextField from 'material-ui/TextField'
import Subheader from 'material-ui/Subheader'
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

const AddItem = ({onItemAdd}) => {
    const {floatingLabelStyle, floatingLabelFocusStyle, underlineStyle} = styles
    return (
        <form className="form--add-item" onSubmit={onItemAdd}>
            <Subheader className="tearsheet__subheader">Menu</Subheader>
            <Row>
                <Col xs="5">
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
                <Col xs="5">
                    <TextField
                        floatingLabelText="Item price"
                        hintText="$"
                        name="price"
                        type="number"
                        fullWidth={true}
                        required={true}
                        floatingLabelStyle={floatingLabelStyle}
                        floatingLabelFocusStyle={floatingLabelFocusStyle}
                        underlineFocusStyle={underlineStyle}
                    />
                </Col>
                <Col xs="2">
                    <div className="flex--end">
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
