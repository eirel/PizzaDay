import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import AvNewReleases from 'material-ui/svg-icons/av/new-releases'
import Badge from 'material-ui/Badge';

import {TableRow, TableRowColumn} from 'material-ui/Table'

const styles = {
    smallIcon: {
        width: 16,
        height: 16,
        padding: 0
    },
    mediumIcon: {
        width: 22,
        height: 22,
        padding: 0,
        fill: 'rgb(255, 64, 129)'
    },
    small: {
        width: 20,
        height: 20,
        padding: 0
    },
    medium: {
        padding: 0,
        margin: '-15px 0 0 -20px'
    },
    badge: {
        top: 12,
        right: 18,
        width: 20,
        height: 20,
        fontSize: '9px'
    }
}

const onCellClick = (event) =>
    event.stopPropagation()

const onMenuItemChange = (id, itemId, onUpdate) => (event) => {
    event.preventDefault()
    const form = event.target

    if (form.name) {
        const name = form.name.value

        Meteor.call('updateMenuItemName', {id, itemId, name}, onUpdate)

        form.name.value = name
        form.name.blur()
    }

    if (form.price) {
        const price = form.price.value.replace(/[^\d.-]/g, '') || 0

        Meteor.call('updateMenuItemPrice', {id, itemId, price}, onUpdate)

        form.price.value = `${price} $`
        form.price.blur()
    }

    // if (form.discount) {
    //     const discount = (discount => discount >= 0 && discount <= 100 ? discount : 0)(form.discount.value.replace(/[^\d.-]/g, ''))
    //
    //     Meteor.call('updateMenuItemDiscount', {id, itemId, discount}, onUpdate)
    //
    //     form.discount.value = `${discount} %`
    //     form.discount.blur()
    // }
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
        const {id, name, price, index, groupId, isMember, isOwner, discount, ...props} = this.props
        return (
            <TableRow
                className={`menu__item ${this.state.editable ? 'edit' : ''}`}
                hoverable={true}
                {...props}
            >
                {props.children[0]}
                <TableRowColumn style={{width: '8%'}} className="cell">
                    <div className="cell__container" onClick={event => onCellClick(event)}>{index + 1}</div>
                </TableRowColumn>

                <TableRowColumn style={{width: '30%'}} className="cell">
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

                <TableRowColumn style={{width: '15%'}} className="cell">
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

                {/*

                <TableRowColumn style={{width: '15%'}} className="cell">
                    <div className="cell__container" onClick={event => onCellClick(event)}>
                        {
                            isOwner &&
                            <form onSubmit={onMenuItemChange(groupId, id, this.onUpdate.bind(this))}>
                                <input
                                    type="text"
                                    name="discount"
                                    className="transparent discount"
                                    defaultValue={`${discount} %`}
                                    disabled={!this.state.editable} ref={(c) => this.discount = c}
                                />
                            </form>
                        }
                        {
                            !!discount && !isOwner &&
                            <Badge
                                badgeContent={`${discount}%`}
                                secondary={true}
                                badgeStyle={styles.badge}
                            >
                                <IconButton
                                    iconStyle={styles.mediumIcon}
                                    style={styles.medium}
                                >
                                    <AvNewReleases />
                                </IconButton>
                            </Badge>
                        }

                    </div>
                </TableRowColumn>

                 */}

                {
                    isMember &&
                    <TableRowColumn className="cell" style={{width: '15%'}}>
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