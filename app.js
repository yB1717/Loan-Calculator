document.querySelector('#loan-form').addEventListener('submit',function(e){
    document.getElementById('results').style.display = 'none'

    document.getElementById('loading').style.display = 'block'

    setTimeout(calculateResults , 2000)

    e.preventDefault()
})

//CALCULATE RESULTS
function calculateResults(){
    //UI VARS
    const amount = document.querySelector('#amount')
    const interest = document.querySelector('#interest')
    const years = document.querySelector('#years')
    const monthlyPayment = document.querySelector('#monthly-payment')
    const totalPayment = document.querySelector('#total-payment')
    const totalInterest = document.querySelector('#total-interest')

    const principal = parseFloat(amount.value)
    let calculatedInterest = parseFloat(interest.value) / 100
    calculatedInterest = calculatedInterest / 12
    const calculatedPayments = parseFloat(years.value) * 12

    //COMPUTE MONTHLY PAYMENT
    const x = Math.pow(1 + calculatedInterest , calculatedPayments)
    const monthly = (principal * x * calculatedInterest) / (x - 1)

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly * calculatedPayments).toFixed(2)
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)
        document.getElementById('loading').style.display = 'none'
        document.getElementById('results').style.display = 'block'
    }else{
        document.getElementById('loading').style.display = 'none'
        showError('Please check ur numbers')

    }

    e.preventDefault()
}

function showError(error){
    const errorDiv = document.createElement('div')

    errorDiv.className = "alert alert-danger"

    errorDiv.appendChild(document.createTextNode(error))

    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')

    card.insertBefore(errorDiv,heading)

    setTimeout(clearError , 3000)
}

function clearError(){
    document.querySelector('.alert').remove()
}