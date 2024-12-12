const resultsList = document.getElementById('results')

const prices = {
    chair: 25.50,
    recliner: 37.75, 
    table: 49.95,
    umbrella: 24.89
}
const shippingZone = [0, 20, 30, 35, 45, 50];
let purchaseQuantities = [];
let purchasePrices = [];

let grandTotal = 0;
//get form values
new URLSearchParams(window.location.search).forEach((quan, type) => {
    if(quan.trim() !== '' && prices[type] !== undefined){
        //identify user purchases
        const quantity = parseInt(quan, 10);
        const price = prices[type];
        const total = quantity * price;
        purchaseQuantities.push(quantity);
        purchasePrices.push(total);
        grandTotal += total

        const div = document.createElement('div');
        //div.textContent = `${uVar} ${type}`;
        div.textContent = `${capitalizeFirstLetter(type)}: ${quantity} x $${price} = $${total.toFixed(2)}`
        div.classList.add('item');
        resultsList.appendChild(div);
        console.log(`quantity: ${quan}, item: ${type}`)
    }
})
//calculate costs
if(grandTotal > 0) {
    let subTotal = grandTotal
    let taxCost = grandTotal * 0.15
    let shippingCost = shippingZone[prompt('Which shipping zone are you in?') - 1]
    if(shippingCost == undefined){
        while(shippingCost == undefined){
            shippingCost = shippingZone[prompt('Which shipping zone are you in (must choose an available shipping zone).') -1]
        } 
    }
    //no shipping cost if order is > 100
    if(subTotal > 100){
        shippingCost = 0
    }
    grandTotal += taxCost
    grandTotal += shippingCost
    const hr = document.createElement('hr')
    const shippingCostDiv = document.createElement('div')
    shippingCostDiv.textContent = `$${shippingCost} is the cost of shipping and tax is 15%`
    shippingCostDiv.classList.add('shipping-cost')
    const subTotalDiv = document.createElement('div')
    subTotalDiv.textContent = `Subtotal: $${subTotal.toFixed(2)}`
    subTotalDiv.classList.add('subtotal')
    const grandTotalDiv = document.createElement('div');
    grandTotalDiv.textContent = `Grand Total: $${grandTotal.toFixed(2)}`;
    grandTotalDiv.classList.add('grand-total');
    resultsList.appendChild(hr)
    resultsList.appendChild(subTotalDiv)
    resultsList.appendChild(shippingCostDiv)
    resultsList.appendChild(grandTotalDiv);
    console.log(`Shipping: ${shippingCost}`)
    console.log(`Tax: ${taxCost.toFixed(2)}`)
    console.log(`Purchase Quantities: ${purchaseQuantities}`)
    console.log(`Purchase Prices: ${purchasePrices}`)
}

function capitalizeFirstLetter(str) {
    if (str.length === 0){
        return str; // Return empty string if input is empty
    } else{
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
//make sure user can't access completed purchase page without buying anything
function checkIfFormIsEmpty(event) {
    const form = event.target; // Get the form from the event object
    const elements = form.elements;
    let allEmpty = true;

    // Loop through all form elements and check if any are not empty
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].type !== "button" && elements[i].type !== "submit" && elements[i].type !== "reset") {
            if (elements[i].value.trim() !== "") {
                allEmpty = false; // Found a non-empty field
                break;
            }
        }
    }

    // If all fields are empty, prevent the form from submitting
    if (allEmpty) {
        alert("You must have items in your cart to make a purchase.");
        event.preventDefault(); // Prevent the form submission
        return false;
    }

    return true; // Allow the form to submit if not all fields are empty
}


