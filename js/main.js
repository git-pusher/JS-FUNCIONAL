const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)


  //guardo el Jquery en una variable para facilitar su uso
  let description = $('#description')
  let carbs = $('#carbs')
  let calories = $('#calories')
  let protein = $('#protein')

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
  }