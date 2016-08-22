import React from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table'
import ContentClear from 'material-ui/svg-icons/content/clear'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import {getUsername} from './index'

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

const onOrderUpdateQuantity = (id, item, quantity) =>
    Meteor.call('updateOrderItemQuantity', {id, item, quantity: quantity > 0 ? quantity : 1})

const onCellClick = (event) =>
    event.stopPropagation()

const onOrderRemove = (id, item) =>
    Meteor.call('removeOrderItem', {id, item})

const OrderItem = ({id, groupId, index, name, price, quantity, orderedBy, status}) => {
    const isOwner = orderedBy === getUsername(Meteor.user())
    const isOrdering = status === 'ordering'
    return (
        <TableRow
            className="menu__item"
            hoverable={true}
        >
            <TableRowColumn style={{width: '5%'}} className="cell">
                <div className="cell__container" onClick={event => onCellClick(event)}>{index + 1}</div>
            </TableRowColumn>

            <TableRowColumn style={{width: '20%'}} className="cell">
                <div className="cell__container" onClick={event => onCellClick(event)}>{name}</div>
            </TableRowColumn>

            <TableRowColumn className="cell">
                <div className="cell__container" onClick={event => onCellClick(event)}>
                    <div className="price transparent">{`${price} $`}</div>
                </div>
            </TableRowColumn>

            <TableRowColumn style={{width: '20%', textAlign: 'center'}} className="cell">
                <div className="cell__container quantity__wrapper" onClick={event => onCellClick(event)}>
                    {
                        isOwner && isOrdering &&
                        <FloatingActionButton
                            mini={true}
                            className="quantity__btn"
                            onTouchTap={() => onOrderUpdateQuantity(groupId, id, quantity - 1)}
                        >
                            <ContentRemove className="quantity__icon"/>
                        </FloatingActionButton>
                    }
                    <div className="quantity">{quantity}</div>
                    {
                        isOwner && isOrdering &&
                        <FloatingActionButton
                            mini={true}
                            secondary={true}
                            className="quantity__btn"
                            onTouchTap={() => onOrderUpdateQuantity(groupId, id, quantity + 1)}
                        >
                            <ContentAdd className="quantity__icon"/>
                        </FloatingActionButton>
                    }
                </div>
            </TableRowColumn>

            <TableRowColumn className="cell">
                <div className="cell__container" onClick={event => onCellClick(event)}>
                    <div className="subtotal">{`${price * quantity} $`}</div>
                </div>
            </TableRowColumn>

            <TableRowColumn style={{width: '20%'}} className="cell">
                <div className="cell__container" onClick={event => onCellClick(event)}>
                    {orderedBy}
                </div>
            </TableRowColumn>

            <TableRowColumn className="cell">
                <div className="cell__container" onClick={event => onCellClick(event)}>
                    {status}
                </div>
            </TableRowColumn>

            <TableRowColumn className="cell" style={{width: '5%'}}>
                <div className="cell__container" onClick={event => onCellClick(event)}>
                    <div className="flex--center">
                        {
                            isOwner && isOrdering &&
                            <IconButton
                                iconStyle={styles.smallIcon}
                                style={styles.small}
                                onTouchTap={() => onOrderRemove(groupId, id)}
                            >
                                <ContentClear />
                            </IconButton>
                        }

                    </div>
                </div>
            </TableRowColumn>
        </TableRow>
    )
}

export default OrderItem