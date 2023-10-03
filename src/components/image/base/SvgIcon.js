/**
 * SvgIcon contains in its dom property the html element: 
 *    if not svg => <div><img/></div>
 *    if is svg =>  <div><svg>...</svg></div>
 */

import DivImage from "./Image.js"

class SvgIcon extends DivImage {
  constructor(options, op, index) {
    super(options, op, index)
  }

  _init(className, classNameParent, src, op, index, title) {
    super._init(className, classNameParent, src, op, index, title)

    if (this._isSVG(src)) {
      setTimeout(() => {
        this._replaceIcon("icon-anim", src)
      }, 0)
    }
  }

  _isSVG(src) { return (0 < src.lastIndexOf(`.svg`)) }

  _replaceIcon = async (className, src) => {
    await this._createSVG(className, src)
  }

  async _createSVG(className, src) {
    let res = await fetch(src, { method: "GET", cache: "force-cache" })
    let strSVG = await res.text()
    let fragment = document.createRange().createContextualFragment(strSVG)
    let svgElem = fragment.querySelector("svg")
    svgElem.setAttribute("class", className)

    this.dom.replaceChild(fragment, this.domChild)  
    this.domChild = svgElem
  }
}

export default SvgIcon
