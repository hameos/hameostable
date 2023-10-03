import SvgIcon from "./SvgIcon.js"

class AnimSvgIcon extends SvgIcon {
  constructor(options, op, index, animParams={}) {
    super(options, op, index)

    this.animElem = null
    this.reqId = 0
    this.playing = false
    this.animParams = animParams
  }

  async _createSVG(className, src) {
    await super._createSVG(className, src)

    this.animElem = this.domChild.getElementById(this.animParams.id)
    if (this.animElem)
      this.domChild.addEventListener("mousemove", this.mouseMoveHandler)
  }

  mouseMoveHandler = () => {
    if (!this.playing) {
      this.playing = true
      this.animate()
    }
  }

  animate = () => {
    this.reqId = window.requestAnimationFrame(this._step)
  }
  
  _step = (timestamp) => {
    if (this.start === undefined)
      this.start = timestamp

    const elapsed = timestamp - this.start  // ms

    if (this.previousTimeStamp !== timestamp) {
      const count = elapsed * this.animParams.sigma    
      this.animElem.style.transform = `${this.animParams.cssTransform}(-${this.animParams.fn(count)}px)`
    }

    if (elapsed < this.animParams.duration) {
      this.previousTimeStamp = timestamp
      this.reqId = window.requestAnimationFrame(this._step)
    }
    else {
      this.animElem.removeAttribute("style")
      window.cancelAnimationFrame(this.reqId)
      this.reqId = 0
      this.start = undefined
      this.previousTimeStamp = undefined
      this.playing = false
    }
  }
}


export default AnimSvgIcon

