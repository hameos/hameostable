class DataMgr extends EventTarget {
  static EVENT_DATAMGR_ITEM_DELETED = "EVENT_DATAMGR_ITEM_DELETED"
  static EVENT_DATAMGR_ITEM_ADDED = "EVENT_DATAMGR_ITEM_ADDED"
  static EVENT_DATAMGR_ITEM_EDITED = "EVENT_DATAMGR_ITEM_EDITED"

  constructor(itemsPerPage, objs) {
    super()
    
    this.objs = objs ? objs : []
    this.indexes = [...this.objs.keys()]

    this.filterText = ""
    this.itemsPerPage = itemsPerPage ? itemsPerPage : 5
    this.currentPage = 1
  }

  applyFilter(filterText) {
    this.filterText = filterText
    this._updateIndexes()
  }

  delete(row) {
    let filterPos = (this.currentPage-1) * this.itemsPerPage
    let filterIndex = filterPos + row
    let globalIndex = this.indexes[filterIndex]

    // Removing the only item in a last page makes page empty so 
    // it requires decrease current page
    if (this._isLastItemInPage(filterIndex))
      this.currentPage--

    this.objs.splice(globalIndex, 1)
    this._updateIndexes()

    this.dispatchEvent(new CustomEvent(DataMgr.EVENT_DATAMGR_ITEM_DELETED))
  }

  add(elem) {
    this.objs.push(elem)
    this._updateIndexes()

    this.dispatchEvent(new CustomEvent(DataMgr.EVENT_DATAMGR_ITEM_ADDED))
  }

  edit(row, elem=[]) {
    let item = this.getItem(row)
    for (let key in item)
      item[key] = elem[key]

    this._updateIndexes()

    this.dispatchEvent(new CustomEvent(DataMgr.EVENT_DATAMGR_ITEM_EDITED))
  }

  getItem(row) {
    let index = ((this.currentPage-1) * this.itemsPerPage) + row
    return this.objs[this.indexes[index]]
  }

  reset() {
    this.filterText = ""
  }

  _isLastItemInPage(filterIndex) {
    return ((this.indexes.length-1) === filterIndex) &&
              ((filterIndex % this.itemsPerPage) === 0)
  }

  _updateIndexes() { // 2 inputs: values, filterText; 1 output: indexes
    let indexes = []

    if (!this.filterText) {
      this.indexes = [...this.objs.keys()]
      return
    }

    for (let row = 0; row < this.objs.length; row++) {
      let rowElem = this.objs[row]
      let found = false
      for (let col in rowElem) {
        let colElem = String(rowElem[col])
        if (colElem.indexOf(this.filterText) !== -1) {
          found = true
          break
        }
      }
      if (found) {
        indexes.push(row)
      }
    }

    this.indexes = indexes
  }

  setItemsPerPage(itemsPerPage) {
    if (!isNaN(Number(itemsPerPage)))
      this.itemsPerPage = itemsPerPage
  }

  getRows() { // 4 inputs: values, indexes, currentPage, itemsPerPage; 1 output: selectedRows
    let rows = []
    let index = (this.currentPage-1) * this.itemsPerPage

    if (this.objs.length === this.indexes.length) {
      rows = this.objs
    }
    else {
      rows = this.objs.filter((row, index) => {
        return (this.indexes.includes(index))
      })
    }
    return rows.slice(index, index + this.itemsPerPage)
  }

  getTotalPages() {
    return Math.ceil( this.indexes.length / this.itemsPerPage)
  }
}

export default DataMgr
