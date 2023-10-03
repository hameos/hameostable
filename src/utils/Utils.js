const isObject = (object) => (object && 
  object.toString && 
  object.toString() === "[object Object]")


const deepSeal = (object) => {
  Object.seal(object)
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      if (isObject(object[key])) {
        deepSeal(object[key])
      }
    }
  }
} 

const mergeOptions = (doptions, soptions) => {
  for (let key in soptions) {
    if (soptions.hasOwnProperty(key)) {
      if (isObject(doptions[key]))
        mergeOptions(doptions[key], soptions[key])
      else
        if (doptions[key]===undefined && soptions[key]!==undefined)
          doptions[key] = soptions[key]
    }
  }
}

export { mergeOptions, deepSeal }
