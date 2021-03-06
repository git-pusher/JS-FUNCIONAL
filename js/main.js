const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

//forma IMPERATIVA
//pasar los atributos del argumento a String, recibe un objeto inicializado vacío
  const attrsToString = (obj = {}) => {
    const keys = Object.keys(obj)
    //aquí se guardarán los atributos, inica vacía
    const attrs = []  
    //recorremos keys
    for (let i = 0; i < keys.length; i++) {
      let attr = keys[i]
      //insertamos los atributos obtenidos
      attrs.push(`${attr}="${obj[attr]}"`)
    }  
    //generamos un string con todos los elementos de la lista
    const string = attrs.join(' ')
      return string
  }

  //forma DECLARATIVA de la función attrsToString
      // const attrsToString = (obj = {}) =>
      //   Object.keys(obj)
      //   .map(attr => `${attr}="${obj[attr]}"`)
      //   .join('')

  
//atributos
  const tagAttrs = obj => (content = '') =>
    `<${obj.tag}${obj.attrs ? ' ' :	''}${attrsToString(obj.attrs)}>${content}</${obj.tag}>`
  
  //función compuesta
  const tag = t => {
    //verificamos el tipo de dato, si es un string
    if(typeof t === 'string') {
      //si lo es, llamamos la función adAttrs y le pasamos directamente la propiedad 'tag'
      return tagAttrs({ tag: t })
    }
    return tagAttrs(t)
  }

  //filas
  const tableRowTag = tag('tr')
  //const tableRow = items => tableRowTag(tableCells(items))
  const tableRow = items => compose(tableRowTag, tableCells)(items)
  //celdas
const tableCell = tag('td')
const tableCells = items => items.map(tableCell).join('')

const trashIcon = tag({tag: 'i', attrs: {class: 'fas fa-trash-alt'}})('')

  //guardo el Jquery en una variable para facilitar su uso
  let description = $('#description')
  let carbs = $('#carbs')
  let calories = $('#calories')
  let protein = $('#protein')

  //inicializamos un arreglo
  let list =[]

//removemos la clase 'is-invalid' al empezar a escribir
description.keypress(() => {
  description.removeClass('is-invalid')
  })
calories.keypress(() => {
  calories.removeClass('is-invalid')
  })
carbs.keypress(() => {
  carbs.removeClass('is-invalid')
  })
protein.keypress(() => {
  protein.removeClass('is-invalid')
  })


  //valida si está vacío o no el campo
  const validateInputs = () => {
    // if(description.val() === '') {
    //   description.addClass('is-invalid')
    // }
    //cambiamos a operador ternario para reducir el código
    description.val() ? '' : description.addClass('is-invalid')
    calories.val() ? '' : calories.addClass('is-invalid')
    carbs.val() ? '' : carbs.addClass('is-invalid')
    protein.val() ? '' : protein.addClass('is-invalid')

    //verifica que no sea nulo o vacío
    if(
      description.val() && 
      calories.val() && 
      carbs.val() && 
      protein.val()
    ) add()
  }

  const add = () => {
    //generamos un nuevo objeto para agregar a la lista
    const newItem = {
      description: description.val(),
      //en estois casos necesitamos enteros
      calories: parseInt(calories.val()),
      carbs: parseInt(carbs.val()),
      protein: parseInt(protein.val()),
    }
    //agrego el objeto mediante push
    list.push(newItem)
    cleanInputs()
    updateTotals()
    renderItems()
  }

const updateTotals = () => {
  let calories = 0, carbs = 0, protein =0
  list.map(item => {
    calories += item.calories,
    carbs += item.carbs,
    protein += item.protein
  })
  //text reemplaza lo que contienen las variables
  $('#totalCalories').text(calories)
  $('#totalCarbs').text(carbs)
  $('#totalProtein').text(protein)
}

//limpiar los inputs luego de agregar un elemento
const cleanInputs = () => {
  description.val('')
  calories.val('')
  carbs.val('')
  protein.val('')
}

//mostrar elementos
const renderItems = () => { 
  //apuntamos al selector tbody y con empty se limpia lo que contenga tbody
  $('tbody').empty()

  list.map((item, index )=> { 
    const removeButton = tag({
      tag: 'button',
      attrs: {
        class: 'btn btn-outline-danger',
        onclick: `removeItem(${index})`
      }
    })(trashIcon)
    //append inserta al final de la lista un nuevo elemento, necesitamos insertar una fila y sus celdas
   //tableRow recibe un arreglo items con cada una de loas celdas que vamos a insertar para generar una fila
    $('tbody').append(tableRow([item.description, item.calories, item.carbs, item.protein, removeButton]))
  })
}

const removeItem = (index) => {
  list.splice(index, 1)
  updateTotals()
  renderItems()
}