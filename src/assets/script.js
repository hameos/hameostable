import DataTable from "./datatable.js"

// Callbacks to do something after clicking create/edit/delete button 
const createItem = (item) => (new Promise((resolve,reject) => { resolve(item) }))
const editItem = (item) => (new Promise((resolve,reject) => { resolve(item) }))
const deleteItem = (item) => (new Promise((resolve,reject) => { resolve(item) }))

const init = async () => {
  let datasource = await fetch('./data.json').then(res => res.json())
  let headings = Object.values(datasource.headings)
  let objs = datasource.values.map(elem => (
    elem.reduce((acc, curr, idx) => ({[headings[idx]]: curr, ...acc }), {})
  ))
  let data = {
    headings,
    editableHeadings: headings,
    objs
  }

  let parent = document.getElementById("table-container")
  let options = {
    // ...options here
    datatable: {
      "datatable-top": {
        create: {
          callback: createItem
        },
      },
      "datatable-bottom": {
        edit: {
          callback: editItem
        },
        delete: {
          callback: deleteItem
        }
      }
    }
  }
  let dataTable = new DataTable(parent, data, options)
}

init()
