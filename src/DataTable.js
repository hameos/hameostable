import Select from "./components/Select.js"
import SearchInput from "./components/SearchInput.js"
import Paginator from "./components/paginator/Paginator.js"
import THead from "./components/table/THead.js"
import TBody from "./components/table/TBody.js"
import DataMgr from "./DataMgr.js"
import PopupMr from "./components/popup/PopupMr.js"
import InitialOptions from "./InitialOptions.js"
import { deepSeal, mergeOptions } from "./utils/Utils.js"
import IconBase from "./components/image/IconBase.js"

import "./assets/scss/style.scss"


class DataTable {
  constructor(root, data, options={}) {
    this.initialized = false
    this._initOptions(options)
    this.domExternal = root
    this.dom = null
    this.domTable = null
    this.domFeatures = null
    this.headings = data.headings
    this.editableHeadings = data.editableHeadings
    this.numElems = this.options.datatable["datatable-top"]["datatable-selectn"].select.itemsPerPage
    this.dataMgr = new DataMgr(this.numElems[0], data.objs)
    this.createBtn = null
    this.popupMr = null

    this._init(this.options)
    this._initPopupMr()

  }

  _initPopupMr = () => {
    const callbacks = {
      cbRemove: this.options.datatable["datatable-bottom"].delete.callback,
      cbEdit: this.options.datatable["datatable-bottom"].edit.callback,
      cbCreate: this.options.datatable["datatable-top"].create.callback
    }
    this.popupMr = new PopupMr(this.dataMgr, this.headings,
                                  this.editableHeadings, callbacks,
                                  this.options.windowPopup)

    this.dom.addEventListener(TBody.EVENT_TBODY_CONFIRM_DELETE, this.popupMr._popupConfirmDeleteHandler)
    this.dom.addEventListener(TBody.EVENT_TBODY_EDIT, this.popupMr._popupEditHandler)
    this.createBtn.addEventListener("click", this.popupMr._popupCreateHandler)
  }

  // initializers

  _initOptions = (options) => {
    this.options = options
    mergeOptions(this.options, InitialOptions)
    deepSeal(this.options)
  }

  _init = (options) => {
    if (this.initialized)
      return
    this.initialized = true
    
    this.dataMgr.addEventListener(DataMgr.EVENT_DATAMGR_ITEM_DELETED, this._dataMgrItemHandler)
    this.dataMgr.addEventListener(DataMgr.EVENT_DATAMGR_ITEM_ADDED, this._dataMgrItemHandler)
    this.dataMgr.addEventListener(DataMgr.EVENT_DATAMGR_ITEM_EDITED, this._dataMgrItemHandler)

    let selectedRows = this.dataMgr.getRows()

    this._createTopLevelDiv(options.datatable.className)
    this._createFeatureSection(options.datatable["datatable-top"])
    this._createTable(selectedRows, options.datatable["datatable-bottom"]["datatable-bottom-scroll"].table.className
      , options.datatable["datatable-bottom"].className
      , options.datatable["datatable-bottom"]["datatable-bottom-scroll"].className)
  }

  // event listeners

  _dataMgrItemHandler = (e) => {
    this._updateTBody(this.dataMgr.getRows())

    let totalPages = this.dataMgr.getTotalPages()
    let currPage = this.dataMgr.currentPage
    this.paginator.setNPages(totalPages, currPage)
  }

  _selectChangedHandler = (e) => {
    this.dataMgr.currentPage = 1
    this.dataMgr.setItemsPerPage(this.select.getItemsPerPage())

    this._updateTBody(this.dataMgr.getRows())

    let totalPages = this.dataMgr.getTotalPages()
    let currPage = this.dataMgr.currentPage
    this.paginator.setNPages(totalPages, currPage)
  }

  _inputChangedHandler = (e) => {
    this.dataMgr.currentPage = 1
    this.dataMgr.applyFilter(e.detail)

    this._updateTBody(this.dataMgr.getRows())

    let totalPages = this.dataMgr.getTotalPages()
    let currPage = this.dataMgr.currentPage
    this.paginator.setNPages(totalPages, currPage)
  }

  _pageUpdatedHandler = (e) => {
    this.dataMgr.currentPage = Number(e.detail)
    this._updateTBody(this.dataMgr.getRows())
  }

  // component creation

  _createTopLevelDiv = (className) => {
    this.dom = document.createElement("div")
    this.dom.id = "datatable"
    this.domExternal.appendChild(this.dom)
  }

  _createFeatureSection = (featureOptions) => {
    this.domFeatures = document.createElement("div")
    this.domFeatures.id = "datatable-top"
    this.domFeatures.className = featureOptions.className

    this._createSelect(this.domFeatures, featureOptions["datatable-selectn"])
    this._createPaginator(this.domFeatures, featureOptions["datatable-paginator"])
    this._createSearchInput(this.domFeatures, featureOptions["datatable-search"])
    this.dom.appendChild(this.domFeatures)

    this.dom.addEventListener(Select.EVENT_SELECT_CHANGED,
      this._selectChangedHandler, false)

    this.dom.addEventListener(SearchInput.EVENT_SEARCH_INPUT_CHANGED,
      this._inputChangedHandler, false)

    this.dom.addEventListener(Paginator.EVENT_PAGE_UPDATED,
      this._pageUpdatedHandler, false)
  }

  _createAddButton = (parent, options) => {
    let divParentIconCreate = document.createElement("div")

    let iconCreate = new IconBase(options)
    this.createBtn = iconCreate.dom
    iconCreate.dom.className = "icon-wrap"
    divParentIconCreate.appendChild(iconCreate.dom)
    parent.appendChild(divParentIconCreate)
  }

  _createSearchInput = (domUtilsDiv, options) => {
    this.searchInput = new SearchInput(options)
    domUtilsDiv.appendChild(this.searchInput.dom)
  }

  _createSelect = (domUtilsDiv, options) => {
    this.select = new Select(options)
    domUtilsDiv.appendChild(this.select.dom)
  }

  _createPaginator = (domUtilsDiv, options) => {
    let totalPages = this.dataMgr.getTotalPages()
    this.paginator = new Paginator(totalPages, options)
    domUtilsDiv.appendChild(this.paginator.dom)
  }

  _createTable = (selectedRows, className, parentClassName, scrollClassName) => {
    let fadeDiv = document.createElement("div")
    fadeDiv.id = "datatable-fade"
    fadeDiv.className = "table-fade"
    this.dom.appendChild(fadeDiv)

    let domParentTable = document.createElement("div")
    domParentTable.id = "datatable-bottom"
    parentClassName && (domParentTable.className = parentClassName)
    fadeDiv.appendChild(domParentTable)

    let domScrollTable = document.createElement("div")
    domScrollTable.id = "datatable-bottom-scroll"
    scrollClassName && (domScrollTable.className = scrollClassName)
    domParentTable.appendChild(domScrollTable)

    let table = document.createElement("table")
    className && (table.className = className)
    this.domTable = table
    domScrollTable.appendChild(this.domTable)

    let thead = new THead(this.headings)
    this._createAddButton(thead.domLastCell, 
      this.options.datatable["datatable-top"].create)
    table.appendChild(thead.dom)

    this._fillTBody(selectedRows)
  }

  _fillTBody = (selectedRows) => {
    let tbody = new TBody(this.options, selectedRows, this.headings)
    this.domTable.appendChild(tbody.dom)
    this.tbody = tbody
  }

  _updateTBody = (selectedRows) => {
    this.tbody._updateTBody(selectedRows, this.headings)
  }
}

export default DataTable
