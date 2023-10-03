class THead {
  constructor(headings) {
    this.initialized = false
    this.headings = headings
    this.dom = null
    this.domLastCell = null
    this._init()
  }

  _init = () => {
    if (this.initialized)
      return
    this.initialized = true

    this.dom = this._createHeader()
  }

  _createHeader = () => {
    let thead = document.createElement("thead")
    let tr = document.createElement("tr")
    this.headings.forEach(elem => {
      this._createTH(tr, elem)
    })

    this._createTH(tr, "")
    
    thead.appendChild(tr)
    return thead
  }
  
  _createTH = (tr, elem) => {
    let th = document.createElement("th")
    th.textContent = elem
    tr.appendChild(th)
    this.domLastCell = th
  }
}

export default THead
