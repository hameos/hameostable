import EditDeleteCell from "./EditDeleteCell.js"

class TBody {
  static EVENT_TBODY_CONFIRM_DELETE = "EVENT_TBODY_CONFIRM_DELETE"
  static EVENT_TBODY_EDIT = "EVENT_TBODY_EDIT"

  constructor(options, selectedRows, headings) {
    this.initialized = false
    this.dom = null
    this.options = options
    this._init(selectedRows, headings)
  }

  // Listeners
  _tbodyClickHandler = (e) => {
    let ds = { ...e.target.dataset }
    if (ds["op"] === EditDeleteCell.CELL_OP_DELETE) {
      this.dom.dispatchEvent(new CustomEvent(TBody.EVENT_TBODY_CONFIRM_DELETE,
                                              { detail: ds["index"], bubbles: true }))
    } else if (ds["op"] === EditDeleteCell.CELL_OP_EDIT) { 
      this.dom.dispatchEvent(new CustomEvent(TBody.EVENT_TBODY_EDIT,
                                              { detail: ds["index"], bubbles: true }))
    }
  }

  _init = (selectedRows, headings) => {
    if (this.initialized)
      return
    this.initialized = true

    this._createBody(selectedRows, headings)
    this.dom.addEventListener("click", this._tbodyClickHandler)
  }

  _createBody = (selectedRows, headings) => {
    this.dom = document.createElement("tbody")
    this._updateTBody(selectedRows, headings)
  }

  _createCellIcons = (index) => {
    let edit = this.options.datatable["datatable-bottom"].edit
    let del = this.options.datatable["datatable-bottom"].delete
    let lastcell = this.options.datatable["datatable-bottom"]["datatable-bottom-scroll"].table.body.lastcell

    let td = document.createElement("td")
    new EditDeleteCell(td, index, {edit, delete: del, lastcell})
    td.dataset.index = index
    return td
  }

  _updateTBody = (selectedRows, headings) => {
    let tbody = this.dom
    if (selectedRows.length === 0) {
      tbody.innerHTML = null
      return
    }

    let ncols = headings.length
    let len = selectedRows.length
    let diffRows = tbody.children.length - selectedRows.length

    if (diffRows > 0) {
      for (let i=0; i < diffRows; i++)
        tbody.removeChild(tbody.children[tbody.children.length-1])
    } else {
      diffRows = -diffRows
      len = tbody.children.length

       // Create the remaining i rows
      for (let indexRow = len; indexRow < (len+diffRows); indexRow++) {
        let tr = document.createElement("tr")

        for (let key of headings) {
          let td = document.createElement("td")
          td.textContent = String(selectedRows[indexRow][key])
          td.dataset.index = `${indexRow},${key}`
          tr.appendChild(td)
        }
        tr.appendChild(this._createCellIcons(`${indexRow},${ncols}`))
        tbody.appendChild(tr)
      }
    }

    // Update the first m rows
    for (let indexRow=0; indexRow < len; indexRow++) {
      let tr = tbody.children[indexRow]
      for (let key of headings) {
        let td = tr.querySelector(`td[data-index='${indexRow},${key}'`)
        td.textContent = String(selectedRows[indexRow][key])
      }
    }
  }
}

export default TBody
