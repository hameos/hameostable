class DivImage {
  constructor({className, icon: src, tooltip: title, classNameParent} , op, index) {
    this.dom = null
    this.domChild = null

    this.className = className
    this.src = src
    this.op = op
    this.index = index
    this.title = title
    this.classNameParent = classNameParent

    this._init(className, classNameParent, src, op, index, title)
  }

  _init(className, classNameParent, src, op, index, title) {
    this.dom = this._createDiv(classNameParent, op, index, title)
    this.domChild = this._createImg(className, src)
    this.dom.appendChild(this.domChild)
  }

  _createDiv = (classNameParent, op, index, title) => {
    let domDiv = document.createElement("div")
    domDiv.className = "icon-wrap"
    op && domDiv.setAttribute("data-op", op)
    index && domDiv.setAttribute("data-index", index)
    domDiv.setAttribute("title", title)
    domDiv.addEventListener("click", this._clickHandler)

    return domDiv
  }

  _createImg = (className, src) => {
    let img = document.createElement("img")
    img.src = src
    img.className = className

    return img
  }

  _clickHandler = () => {
    this.dom.click()
  }
}

export default DivImage
