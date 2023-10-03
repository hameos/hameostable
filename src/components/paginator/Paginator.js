import html from "./paginator.html"

class Paginator {
  static EVENT_PAGINATOR_LOADED = "PAGINATOR_LOADED"
  static EVENT_PAGE_UPDATED = "PAGE_UPDATED"

  constructor(nPages, options) {
    this.initialized = false
    this.options = options
    this.nPages = nPages
    this.btnPrev = null
    this.btnNext = null
    this.btnInit = null
    this.btnEnd = null
    this.inputField = null
    this._init()
  }

  _init = () => {
    if (this.initialized)
      return

    this.initialized = true

    let dom = document.createElement("div")
    dom.id = "datatable-paginator"
    dom.className = this.options.className

    dom.innerHTML = html

    let domUl = dom.getElementsByTagName("ul")[0]
    domUl.className = this.options.ul.className

    this.btnInit = dom.querySelector("#page-init")
    this.btnInit.className = this.options.li.className
    this.btnInit.textContent = this.options.li.text[0]
    this.btnInit.addEventListener("click", this._initClickHandler)

    this.btnPrev = dom.querySelector("#page-prev")
    this.btnPrev.className = this.options.li.className
    this.btnPrev.textContent = this.options.li.text[1]
    this.btnPrev.addEventListener("click", this._previousClickHandler)

    let paginatorInput = dom.querySelector("#paginator-input")
    paginatorInput.className = this.options["paginator-input"].className

    this.inputField = dom.querySelector("#page-input")
    this.inputField.className = this.options["paginator-input"]["page-input"].className
    this.inputField.textContent = this.nPages ? 1 : 0
    this.inputField.addEventListener("input", this._inputHandler)

    this.spanNPages = dom.querySelector("#page-total")
    this.spanNPages.className = this.options["paginator-input"]["page-total"].className
    this.spanNPages.textContent = this.options["paginator-input"]["page-total"].of + " " + this.nPages

    this.btnNext = dom.querySelector("#page-next")
    this.btnNext.className = this.options.li.className
    this.btnNext.textContent = this.options.li.text[2]
    this.btnNext.addEventListener("click", this._nextClickHandler)

    this.btnEnd = dom.querySelector("#page-end")
    this.btnEnd.className = this.options.li.className
    this.btnEnd.textContent = this.options.li.text[3]
    this.btnEnd.addEventListener("click", this._endClickHandler)
    
    this.dom = dom
    return dom
  }

  _inputHandler = (e) => {
    let value = Number(e.target.textContent)
    if (isNaN(value)) {                 // value is not number
      value = 1
    } else if (value < 1) {             // value < min
      value = 1
    } else if (this.nPages < value) {   // value > max
      value = this.nPages
    }

    this.inputField.textContent = value


    this.dom.dispatchEvent(new CustomEvent(Paginator.EVENT_PAGE_UPDATED, 
      { bubbles: true, detail: value }))
  }

  _initClickHandler = () => {
    this.inputField.textContent = 1
    this._dispatch(1)
  }

  _endClickHandler = () => {
    this.inputField.textContent = this.nPages
    this._dispatch(this.nPages)
  }

  _previousClickHandler = () => {
    let value = Number(this.inputField.textContent)
    if (1 < value) {
      value--
      this.inputField.textContent = value
    }

    this._dispatch(value)
  }

  _nextClickHandler = () => {
    let value = Number(this.inputField.textContent)

    if (value < this.nPages) {
      value++
      this.inputField.textContent = value
    }
    this._dispatch(value)
  }

  _dispatch = (value) => {
    this.dom.dispatchEvent(new CustomEvent(Paginator.EVENT_PAGE_UPDATED, 
      { bubbles: true, detail: value }))
  }

  setNPages = (nPages, currPage=0) => {
    if (currPage)
      this.inputField.textContent = currPage
    else if (this.inputField.value > nPages)
      this.inputField.textContent = nPages

    this.nPages = nPages
    this.spanNPages.textContent = ' of ' + this.nPages
  }
}

export default Paginator
