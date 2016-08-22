export { CreateGroup } from './create'
export { GroupsGrid } from './grid'

export const showModalDialog = (id) => {
    Session.set('Modal.group.opened', true)
    Session.set('Modal.group.active', id)
}