import AnimSvgIcon from "./base/AnimSvgIcon"

const animParams = {
  id: "trash-top",
  cssTransform: "translateY",
  fn: (n) => Math.sin(n)*60,
  duration: 500,
  sigma: 0.02
}

class IconDelete extends AnimSvgIcon {
  constructor(options, op, index) {
    super(options, op, index, animParams)
  }
}

export default IconDelete
