document.querySelector('#loan-form').addEventListener('submit', function(e){
    // hide results
    document.querySelector('#results').style.display= 'none';

    document.querySelector('#loading').style.display= 'block';

    setTimeout(calculate, 200);

    e.preventDefault();
});


function calculate(e) {
    // variables

    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const emi = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const check = [amount.value, interest.value, years.value];
    const removeerror = [amount, interest, years];
    removeerror.forEach(function(el){
        el.addEventListener('keydown', removeErrorMsg);
    } );
    // console.log(check);

    if (check.includes('')){
        // console.log(amount,interest, years);
        showError('Missing inputs, Please check');
        e.preventDefault();
    }
    else {
            
            const principal = parseFloat(amount.value);
            const calculatedInterest = parseFloat(interest.value) /100 /12;
            const calculatedPayments = parseFloat(years.value) * 12;
        
            const x = Math.pow(1+ calculatedInterest, calculatedPayments);
            const monthly = (principal * x * calculatedInterest) / (x-1);
    
        
            if(isFinite(monthly)) {
                emi.value = monthly.toFixed(2);
                totalPayment.value = (monthly * calculatedPayments).toFixed(2);
                totalInterest.value= ((monthly * calculatedPayments) - principal).toFixed(2);
                document.querySelector('#loading').style.display= 'none';
                document.querySelector('#results').style.display= 'block';
            } else {
                showError('Please check Inputs');
            }

    }



    
}

function showError(error) {
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    errorDiv.id = 'errorDiv'
    errorDiv.className = 'alert alert-danger';

    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);
}

function removeErrorMsg(e) {
    const errorDiv = document.querySelector('#errorDiv');
    if (errorDiv) {
        errorDiv.remove();

    }

}