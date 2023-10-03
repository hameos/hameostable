import AddEditPopup from "./addedit.html"

class PopupAddEditDel {
  static EVENT_POPUP_ADDEDIT_ACCEPT = "EVENT_POPUP_ADDEDIT_ACCEPT"
  static EVENT_POPUP_ADDEDIT_CANCEL = "EVENT_POPUP_ADDEDIT_CANCEL"

  static TYPE_CREATE = "TYPE_CREATE"
  static TYPE_EDIT = "TYPE_EDIT"
  static TYPE_DELETE = "TYPE_DELETE"

  constructor(editableHeadings, options = {}) {
    this.initialized = false
    this.editableHeadings = editableHeadings
    this.dom = null
    this.type = ""
    this.title = ""
    this.options = options
    this._init()
  }

  _init() {
    if (this.initialized)
      return
    this.initialized = true

    let divElem = document.createElement("div")
    divElem.className = this.options.className

    this.dom = divElem
    this.dom.addEventListener("click", this._clickHandler.bind(this))
  }

  _clickHandler(e) {
    if (e.target === this.dom)
      this.close()
  }

  _acceptHandler() {
    let inputs = Array.from(this.dom.getElementsByTagName("input"))
    let inputKeyValues = inputs.reduce((acc, input) => ({[input.name]: input.value, ...acc }), {})
    let item = { ...this.item, ...inputKeyValues }
    let detail = { item, row: this.row, type: this.type }
    let evt = new CustomEvent(PopupAddEditDel.EVENT_POPUP_ADDEDIT_ACCEPT, 
                    { bubbles: true, detail })
    this.dom.dispatchEvent(evt)
    this.close()
  }

  _cancelHandler() {
    let evt = new CustomEvent(PopupAddEditDel.EVENT_POPUP_ADDEDIT_CANCEL,
                    { bubbles: true })
    this.dom.dispatchEvent(evt)
    this.close()
  }

  isEditPopup() {
    return !!this.item
  }

  _setData(type, data) {
    this.item = data

    switch(type) {
      case PopupAddEditDel.TYPE_CREATE: {
        this.title = this.options.create.title
        break
      }
      case PopupAddEditDel.TYPE_EDIT: {
        this.title = this.options.edit.title
        break
      }
      case PopupAddEditDel.TYPE_DELETE: {
        this.title = this.options.delete.title
        break
      }
      default:
        this.title = ""
        this.className = ""
        this.item = null
    }
  }

  _getInnerDOM() {
    let innerHTML = AddEditPopup.replace("${this.title}",this.title)
    innerHTML = innerHTML.replace("${this._getFormItems()}", this._getFormItems())

    innerHTML = innerHTML.replace("${this.options.dialog.className}", this.options.dialog.className)
    innerHTML = innerHTML.replace("${this.options.content.className}", this.options.content.className)
    innerHTML = innerHTML.replace("${this.options.header.className}", this.options.header.className)
    innerHTML = innerHTML.replace("${this.options.body.className}", this.options.body.className)
    innerHTML = innerHTML.replace("${this.options.footer.className}", this.options.footer.className)

    return innerHTML
  }

  _initTitleAndButtons() {
    let btnArray = Array.from(this.dom.getElementsByTagName("button"))
    let btnCancel = btnArray[0]
    let btnAccept = btnArray[1]

    btnCancel.addEventListener("click", this._cancelHandler.bind(this))
    btnAccept.addEventListener("click", this._acceptHandler.bind(this))

    btnCancel.textContent = this.options.cancel
    let h5 = this.dom.getElementsByTagName("h5")[0]

    if (this.type === PopupAddEditDel.TYPE_DELETE) {
      btnAccept.className = "btn btn-danger"
      btnAccept.textContent = this.options.delete.accept
      h5.textContent = this.options.delete.title

    } else if (this.type === PopupAddEditDel.TYPE_EDIT) {
      btnAccept.textContent = this.options.edit.accept
      h5.textContent = this.options.edit.title

    } else if (this.type === PopupAddEditDel.TYPE_CREATE) {
      btnAccept.textContent = this.options.create.accept
      h5.textContent = this.options.create.title

    }   
  }

  show(type, data, row) {
    this.type = type
    this.row = row
    this._setData(type, data)
    this.dom.innerHTML = this._getInnerDOM()

    this._initTitleAndButtons()

    document.body.appendChild(this.dom)

    setTimeout(() => {
      let content = this.dom.querySelector("#content-popup")
      let pos = content.parentElement.offsetTop
      content.style.top = "0px"
      content.style.opacity = 1
    }, 0)
  }

  close() {
    let btnArray = Array.from(this.dom.getElementsByTagName("button"))
    btnArray[0].removeEventListener("click", this._acceptHandler)
    btnArray[1].removeEventListener("click", this._cancelHandler)

    document.body.removeChild(document.body.lastElementChild)
  }

  _getFormItems() {
    let str = ''
    let i = 0
    let strDisable = this.type === PopupAddEditDel.TYPE_DELETE ? ' disabled' : ''
    for (let field of this.editableHeadings) {
      str += `<div class="${this.options.body.item.className}">
              <label class="${this.options.body.item.label.className}" for="${field}">${field}: </label>
              <input class="${this.options.body.item.input.className}" type="text" name="${field}"` + 
                `${this._getStrInput(field)}` + `${strDisable}></input></div>`
    }
    return str
  }

  _getStrInput(key) {
    return (this.item ? ` value="${this.item[key]}"` : '')
  }
}

export default PopupAddEditDel
