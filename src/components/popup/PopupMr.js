import PopupAddEditDel from './PopupAddEditDel.js'

class PopupMr {
  constructor(dataMgr, headings, editableHeadings, callback, options) {
    this.dataMgr = dataMgr
    this.cbRemove = callback.cbRemove
    this.cbEdit = callback.cbEdit
    this.cbCreate = callback.cbCreate

    this.headings = headings
    this.editableHeadings = editableHeadings
    this._createPopup(editableHeadings, options)
  }

  _createPopup = (editableHeadings, popupOptions) => {
    this.popup = new PopupAddEditDel(editableHeadings, popupOptions)
    document.body.addEventListener(PopupAddEditDel.EVENT_POPUP_ADDEDIT_ACCEPT, this._popupAcceptHandler)
    document.body.addEventListener(PopupAddEditDel.EVENT_POPUP_ADDEDIT_CANCEL, this._popupCancelHandler)
  }

  // Buttons handler: Delete, Create and Edit
  _popupConfirmDeleteHandler = (e) => {
    let row = Number(e.detail.split(',')[0])
    let item = this.dataMgr.getItem(row)
    this.popup.show(PopupAddEditDel.TYPE_DELETE, item, row)
  }

  _popupCreateHandler = (e) => {
    this.popup.show(PopupAddEditDel.TYPE_CREATE)
  }

  _popupEditHandler = (e) => {
    let row = Number(e.detail.split(',')[0])
    let item = this.dataMgr.getItem(row)
    this.popup.show(PopupAddEditDel.TYPE_EDIT, item, row)
  }

  // Popup Accept button -> create, edit or delete
  _popupAcceptHandler = (e) => {
    let detail = e.detail
    let row = -1
    let item = null
    let cb = null

    switch(detail.type) {
      case PopupAddEditDel.TYPE_DELETE:
        row = detail.row
        item = detail.item
        cb = this.cbRemove
        
        if (!cb)
          this.dataMgr.delete(row)
        else
          this._remove(cb, row, item)
        break
      case PopupAddEditDel.TYPE_EDIT:
        row = detail.row
        item = detail.item
        cb = this.cbEdit

        if (!cb)
          this.dataMgr.edit(row, item)
        else
          this._edit(cb, row, item)
        break
      case PopupAddEditDel.TYPE_CREATE:
        item = detail.item
        cb = this.cbCreate
        if (!cb)
          this.dataMgr.add(item)
        else
          this._create(cb, item)
        break
    }
  }

  _popupCancelHandler = (e) => {
    // console.log('_popupCancelHandler')
  }

  // callbacks

  _remove = (cbRemove, row, item) => {
    let obj = item
    cbRemove && cbRemove(obj).then(res => {
      if (res) {
        this.dataMgr.delete(row)
        console.log('removed successfully')
      } else {
        console.log('could not be removed')
      }
    })
    .catch(err => {
      console.log('Error cbRemove: ', err)
    })
  }

  _edit = (cbEdit, row, item) => {
    let obj = item

    cbEdit && cbEdit(obj).then(res => {
      if (res) {
        this.dataMgr.edit(row, res)
        console.log('edited successfully')
      } else {
        console.log('could not be edited')
      }
    })
    .catch(err => {
      console.log('Error cbEdit: ', err)
    })
  }

  _create = (cbAdd, item) => {
    let obj = item

    cbAdd && cbAdd(obj).then(res => {
      if (res) {
        this.dataMgr.add(res)
        console.log('created successfully')
      } else {
        console.log('could not be created')
      }
    })
    .catch(err => {
      console.log('Error cbAdd: ', err)
    })
  }
}

export default PopupMr
