import React from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table'
import ContentClear from 'material-ui/svg-icons/content/clear'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import {getUsername} from './index'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import AvNewReleases from 'material-ui/svg-icons/av/new-releases'
import Badge from 'material-ui/Badge';

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
    },
    mediumIcon: {
        width: 22,
        height: 22,
        padding: 0,
        fill: 'rgb(255, 64, 129)'
    },

    medium: {
        padding: 0,
        marginTop: -15
    },
    badge: {
        top: 12,
        right: 18,
        width: 20,
        height: 20,
        fontSize: '9px'
    }
}

const onOrderUpdateQuantity = (id, item, quantity) =>
    Meteor.call('updateOrderItemQuantity', {id, item, quantity: quantity > 0 ? quantity : 1})

const onCellClick = (event) =>
    event.stopPropagation()

const onOrderRemove = (id, item) =>
    Meteor.call('removeOrderItem', {id, item})

const onDiscountUpdate = (id, item) => (event) => {
    event.preventDefault()
    const form = event.target
    const discount = (discount => discount >= 0 && discount <= 100 ? discount : 0)(form.discount.value.replace(/[^\d.-]/g, ''))

    Meteor.call('updateOrderItemDiscount', {id, item, discount})

    form.discount.value = `${discount} %`
    form.discount.blur()
}

const OrderItem = ({id, groupId, index, name, price, discount, quantity, orderedBy, status, isGroupOwner}) => {
    const isOwner = orderedBy === getUsername(Meteor.user())
    const isOrdering = status === 'ordering'

    return (
        <TableRow
            className="order__item"
            hoverable={true}
        >
            <TableRowColumn style={{width: '5%'}} className="cell">
                <div className="cell__container" onClick={event => onCellClick(event)}>{index + 1}</div>
            </TableRowColumn>

            <TableRowColumn style={{width: '20%'}} className="cell">
                <div className="cell__container" onClick={event => onCellClick(event)}>{name}</div>
            </TableRowColumn>

            <TableRowColumn className="cell" style={{width: '10%'}}>
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

            <TableRowColumn className="cell" style={{width: '10%'}}>
                <div className="cell__container" onClick={event => onCellClick(event)}>
                    {
                        isGroupOwner &&
                        <form
                            onSubmit={onDiscountUpdate(groupId, id)}
                            style={{maxWidth: '100%'}}
                        >
                            <input
                                type="text"
                                name="discount"
                                className="transparent discount"
                                defaultValue={`${discount} %`}
                                disabled={false}
                                style={{textAlign: 'center'}}
                            />
                        </form>
                    }
                    {
                        !!~~discount && !isGroupOwner &&
                        <Badge
                            badgeContent={`-${discount}%`}
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

            <TableRowColumn className="cell" style={{width: '10%'}}>
                <div className="cell__container" onClick={event => onCellClick(event)}>
                    <div className={'subtotal'}>
                        <span className={!!~~discount ? 'line-through' : ''}>
                            {`${price * quantity} $`}
                        </span>
                        {
                            !!~~discount &&
                            <span>{`\u00A0 ${(num => num.toFixed(2))(price * quantity - ~~discount / 100 * price)} $`}</span>
                        }
                    </div>
                </div>
            </TableRowColumn>

            <TableRowColumn style={{width: '20%'}} className="cell">
                <div className="cell__container" onClick={event => onCellClick(event)}>
                    {orderedBy}
                </div>
            </TableRowColumn>

            <TableRowColumn className="cell" style={{width: '10%'}}>
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