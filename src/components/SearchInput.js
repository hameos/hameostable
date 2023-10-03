class SearchInput {
  static EVENT_SEARCH_INPUT_CHANGED = "EVENT_SEARCH_INPUT_CHANGED"
  constructor(options={}) {
    this.initialized = false
    this.options = options
    this._init()
  }

  _init = () => {
    if (this.initialized)
      return

    this.initialized = true

    let dom = document.createElement("div")
    dom.id = "datatable-search"
    
    let domImg = this._createSearchIcon()
    dom.appendChild(domImg)

    let domLabel = this._createLabel()
    dom.appendChild(domLabel)

    let domInput = this._createInput()
    dom.appendChild(domInput)

    this.dom = dom
    return this.dom
  }

  _createLabel = () => {
    let domLabel = document.createElement("label")
    domLabel.setAttribute("for", "searchInput")
    domLabel.textContent = this.options.label.text
    domLabel.className = this.options.label.className
    return domLabel
  }

  _createInput = () => {
    let domInput = document.createElement("input")
    domInput.setAttribute("id", "searchInput")
    domInput.setAttribute("autocomplete", "off")
    domInput.className = this.options.input.className

    let placeholder = this.options.input.placeholder
    domInput.setAttribute("placeholder", placeholder)
    domInput.addEventListener("input", this.inputChangeHandler)
    return domInput
  }

  _createSearchIcon = () => {
    let domImg = document.createElement("img")
    domImg.src = this.options.icon.src
    domImg.className = this.options.icon.className
    return domImg
  }

  inputChangeHandler = (e) => {
    let filterText = e.target.value
    this.filterText = filterText
    // console.log("change", e.target.value)

    this.dom.dispatchEvent(new CustomEvent(SearchInput.EVENT_SEARCH_INPUT_CHANGED,
      { bubbles:true, detail: filterText } ))
  }
}

export default SearchInput
