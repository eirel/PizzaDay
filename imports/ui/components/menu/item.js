import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import {TableRow, TableRowColumn} from 'material-ui/Table'

const styles = {
    smallIcon: {
        width: 16,
        height: 16,
        padding: 0
    },
    small: {
        width: 20,
        height: 20,
        padding: 0
    }
}

const onCellClick = (event) =>
    event.stopPropagation()

const onMenuItemChange = (groupId, id, onUpdate) => (event) => {
    event.preventDefault()

    if (event.target.name) {
        const name = event.target.name.value

        Meteor.call('updateMenuItemName', {
            id: groupId,
            itemId: id,
            name: name
        }, onUpdate)

        event.target.name.value = name
        event.target.name.blur()
    } else {
        const price = event.target.price.value.replace(/[^\d.-]/g, '') || 0

        Meteor.call('updateMenuItemPrice', {
            id: groupId,
            itemId: id,
            price: price
        }, onUpdate)

        event.target.price.value = `${price} $`
        event.target.price.blur()
    }
}

export class MenuTableItem extends Component {
    constructor() {
        super()
        this.state = {
            editable: false
        }
    }

    onUpdate() {
        this.setState({editable: false})
    }

    render() {
        const { id, name, price, index, groupId, isMember, ...props} = this.props
        return (
            <TableRow
                className={`menu__item ${this.state.editable ? 'edit' : ''}`}
                hoverable={true}
                {...props}
            >
                {props.children[0]}
                <TableRowColumn style={{width: '10%'}} className="cell">
                    <div className="cell__container" onClick={event => onCellClick(event)}>{index + 1}</div>
                </TableRowColumn>

                <TableRowColumn style={{width: '35%'}} className="cell">
                    <div className="cell__container" onClick={event => onCellClick(event)}>
                        <form onSubmit={onMenuItemChange(groupId, id, this.onUpdate.bind(this))}>
                            <input
                                type="text"
                                name="name"
                                className="transparent"
                                defaultValue={name}
                                disabled={!this.state.editable} ref={(c) => this.name = c}
                            />
                        </form>
                    </div>
                </TableRowColumn>

                <TableRowColumn style={{width: '15%'}}  className="cell">
                    <div className="cell__container" onClick={event => onCellClick(event)}>
                        <form onSubmit={onMenuItemChange(groupId, id, this.onUpdate.bind(this))}>
                            <input
                                type="text"
                                name="price"
                                className="transparent price"
                                defaultValue={`${price} $`}
                                disabled={!this.state.editable} ref={(c) => this.price = c}
                            />
                        </form>
                    </div>
                </TableRowColumn>

                {
                    isMember &&
                    <TableRowColumn className="cell"  style={{width: '15%'}}>
                        <div className="cell__container flex--center" onClick={event => onCellClick(event)}>
                            <IconButton
                                iconStyle={styles.smallIcon}
                                style={styles.small}
                                onClick={() => {
                                this.setState({editable: !this.state.editable})
                                setTimeout(() => {
                                    this.name.select()
                                    this.name.focus()
                                }, 100)
                            }}
                            >
                                <EditorModeEdit />
                            </IconButton>
                        </div>
                    </TableRowColumn>
                }

            </TableRow>
        )
    }
}