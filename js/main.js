const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)


  //guardo el Jquery en una variable para facilitar su uso
  let description = $('#description')
  let carbs = $('#carbs')
  let calories = $('#calories')
  let protein = $('#protein')




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

