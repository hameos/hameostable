class Select {
  static EVENT_SELECT_CHANGED = "SELECT_CHANGED"

  constructor(options={}) {
    this.initialized = false
    this.valuesOpt = options.select.itemsPerPage
    this.valueSelected = parseInt(this.valuesOpt[0])
    this.options = options
    this._init()
  }

  _init = () => {
    if (this.initialized)
      return

    this.initialized = true
    let domLabel = document.createElement("label")
    domLabel.setAttribute("for", "selectNum")

    domLabel.textContent = this.options.label.text
    domLabel.className = this.options.label.className

    let domSelect = document.createElement("select")
    domSelect.setAttribute("id", "selectNum")

    domSelect.className = this.options.select.className
    domSelect.addEventListener("change", this.selectChangeHandler)
    this.valuesOpt.forEach(elem => {
      let domOption = document.createElement("option")
      domOption.value = domOption.textContent = elem
      domSelect.appendChild(domOption)
    })

    let dom = document.createElement("div")
    dom.id = "datatable-selectn"
    dom.className = this.options.className

    dom.appendChild(domLabel)
    dom.appendChild(domSelect)

    this.dom = dom
    return this.dom
  }

  getItemsPerPage = () => this.valueSelected

  selectChangeHandler = (e) => {
    let opt = Number(e.target.value)
    this.valueSelected = isNaN(opt) ? this.valuesOpt[0] : opt
    
    this.dom.dispatchEvent(new CustomEvent(Select.EVENT_SELECT_CHANGED, 
      { bubbles:true, detail: this.valueSelected } ))
  }
}

export default Select
