import IconBase from "../image/IconBase.js"
import IconDelete from "../image/IconDelete.js"


class EditDeleteCell {
  static CELL_OP_EDIT = "CELL_OP_EDIT"
  static CELL_OP_DELETE = "CELL_OP_DELETE"

  constructor(domParent, index, options={}) {
    this.initialized = false
    this.options = options
    this.domParent = domParent
    this.dom = null
    this.domEditIcon = null
    this.domDelIcon = null
    this.index = index
    this._init()
  }

  _init = () => {
    if (this.initialized)
      return true
    this.initialized = true

    this.domParent.className = this.options.lastcell.className

    this.dom = this._getChildren()
    this.domParent.appendChild(this.dom)
  }

  _getChildren() {
    let divElem = document.createElement("div")
    divElem.className = this.options.lastcell.childClassName

    // SvgIcon
    let iconEdit = new IconBase(this.options.edit,
                                  EditDeleteCell.CELL_OP_EDIT,
                                  this.index)

    let iconDel = new IconDelete(this.options.delete,
                                  EditDeleteCell.CELL_OP_DELETE,
                                  this.index)

    divElem.appendChild(iconEdit.dom)
    divElem.appendChild(iconDel.dom)
    return divElem
  }
}

export default EditDeleteCell
