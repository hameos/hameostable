import languages from "./lang/index.js"
import { deepSeal } from "./utils/Utils.js"

import IconDefaultCreate from "./assets/icons/add.svg"
import IconDefaultEdit from "./assets/icons/pencil.svg"
import IconDefaultDelete from "./assets/icons/trash.svg"
import IconDefaultSearch from "./assets/icons/search.svg"

const lang = languages.en

const InitialOptions = {
  "datatable": {
    className: "",
    "datatable-top": {
      className: "",  
      create: {
        className: "",
        classNameParent: "icon-wrap",
        icon: IconDefaultCreate,
        tooltip: lang.CREATE,
        callback: () => { return new Promise((resolve,reject) => { resolve(true)}) }
      },
      "datatable-selectn": {
        className: "",
        select: {
          className: "form-select",
          itemsPerPage: [5,10,20,30]
        },
        label: {
          className: "form-label",
          text: `${lang.SELECT}: `,
        },
      },
      "datatable-search": {
        className: "",
        label: {
          className: "",
          text: `${lang.FIND}: `,
        },
        input: {
          className: "form-control",
          placeholder: `${lang.TYPE_TEXT}`,
        },
        icon: {
          className: "",
          src: IconDefaultSearch
        }
      },
      "datatable-paginator": {
        className: "",
        ul: {
          className: "pagination",
        },
        li: {
          className: "page-item btn btn-link",
          text: [lang.FIRST, lang.PREVIOUS, lang.NEXT, lang.LAST]
        },
        "paginator-input": { 
          className: "",
          "page-input": {
            className: "",
          },
          "page-total": {
            className: "",
            of: lang.OF
          }
        }
      }
    },
    "datatable-bottom": {
      className: "",
      edit: {
        className: "",
        classNameParent: "icon-wrap",
        icon: IconDefaultEdit,
        tooltip: lang.EDIT_ENTRY,
        callback: () => { return new Promise((resolve,reject) => { resolve(true)}) }
      },
      delete: {
        className: "",
        classNameParent: "icon-wrap",
        icon: IconDefaultDelete,
        tooltip: lang.DELETE_ENTRY,
        callback: () => { return new Promise((resolve,reject) => { resolve(true)}) }
      },
      "datatable-bottom-scroll": {
        className: "",
        table: {
          className: "table table-striped table-bordered table-hover d-inline-table",
          header: {
            lastcell: {
              className: "d-flex justify-content-center align-items-center"
            }
          },
          body: {
            lastcell: {
              className: "position-relative",
              childClassName: "d-flex justify-content-evenly align-items-center",
            }
          }
        },
      },
    },
  },
  windowPopup: {
    className: "table-popup",
    cancel: lang.CANCEL,
    create: {
      title: lang.CREATE_ENTRY,
      accept: lang.SAVE
    },
    edit: {
      title: lang.EDIT_ENTRY,
      accept: lang.SAVE
    },
    delete: {
      title: lang.DELETE_ENTRY,
      accept: lang.DELETE
    },
    dialog: {
      className: "modal-dialog modal-dialog-centered",
    },
    content: {
      className: "modal-content table-popup__content"
    },
    body: {
      className: "modal-body",
      item: {
        className: "d-flex pe-4 py-2 justify-content-end align-items-center",
        label: {
          className: "text-nowrap px-3"
        },
        input: {
          className: "form-control"
        }
      }
    },
    footer: {
      className: "modal-footer bg-light-custom"
    },
    header: {
      className: "modal-header bg-light-custom"
    }
  }
}

deepSeal(InitialOptions)
export default InitialOptions
