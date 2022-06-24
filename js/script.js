
function add(obj,name) {
    obj.parentNode.querySelector('input[type=number]').stepUp()
    quantity[name[0]][name[1]] += 1
    localStorage.setItem('quantity',JSON.stringify(quantity))
}

function subtract(obj,name) {
    obj.parentNode.querySelector('input[type=number]').stepDown()
    quantity[name[0]][name[1]] -= 1
    localStorage.setItem('quantity',JSON.stringify(quantity))
}

function updateIncrementers() {
    /*Price*/
    var ksPlants = Object.keys(price)
    for (var i=0; i<ksPlants.length; i++) {
        var plant = price[ksPlants[i]]
        var ksParts = Object.keys(plant)
        for (var j=0; j<ksParts.length; j++) {
            var n = ksPlants[i]+"-price-"+ksParts[j]
            var obj = document.getElementById(n)
            obj.innerHTML = obj.innerHTML.replace("_", plant[ksParts[j]])
        }
    }
    /*Quantity*/
    var ksPlants = Object.keys(quantity)
    for (var i=0; i<ksPlants.length; i++) {
        var plant = quantity[ksPlants[i]]
        var ksParts = Object.keys(plant)
        for (var j=0; j<ksParts.length; j++) {
            var n = ksPlants[i]+"-incrementer-"+ksParts[j]
            document.getElementById(n).querySelector('input[type=number]').value = plant[ksParts[j]];
        }
    }
}

function updateCart() {
    var objName = document.getElementById("products-name")
    var objQuantity = document.getElementById("products-quantity")
    var objPrice = document.getElementById("products-price")
    var objTotal = document.getElementById("products-price-total")
    var priceTotal = 0
    var ksPlants = Object.keys(price)
    for (var i=0; i<ksPlants.length; i++) {
        var plant = ksPlants[i]
        var ksParts = Object.keys(quantity[plant])
        for (var j=0; j<ksParts.length; j++) {
            var part = ksParts[j]
            var productsQuantity = quantity[plant][part]
            if (productsQuantity!=0) {
                var productName = names[plant] + " (" + part + ")"
                var productsPrice = price[plant][part]

                priceTotal += productsQuantity*productsPrice

                var p = document.createElement("p");
                var text = document.createTextNode(productName)
                p.appendChild(text)
                objName.appendChild(p)

                p = document.createElement("p")
                var lastDigit = productsQuantity % 10
                if (lastDigit ==1) {
                    var word = "порция"
                }
                else if (lastDigit==2 || lastDigit==3 || lastDigit==4) {
                    word = "порции"
                }
                else {
                    word = "порций"
                }
                text = document.createTextNode(productsQuantity+" "+word)
                p.appendChild(text)
                objQuantity.appendChild(p)

                p = document.createElement("p")
                text = document.createTextNode(productsPrice+" EUR")
                p.appendChild(text)
                objPrice.appendChild(p)
            }
        }
    }
    objTotal.appendChild(document.createTextNode(priceTotal+" EUR"))
}

function selectTransportationType(ind) {
    if (ind==0) {
        document.getElementById("dpd-pickup-point-select").style.display = "none"
        document.getElementById("omniva-pickup-point-select").style.display = "none"
        transportation = ["self-pickup",""]
    }
    else if (ind==1) {
        document.getElementById("dpd-pickup-point-select").style.display = "inline"
        document.getElementById("omniva-pickup-point-select").style.display = "none"
        var select = document.getElementById("dpd-pickup-point-select")
        transportation = ["DPD",select.options[select.selectedIndex].text]
    }
    else {
        document.getElementById("dpd-pickup-point-select").style.display = "none"
        document.getElementById("omniva-pickup-point-select").style.display = "inline"
        select = document.getElementById("omniva-pickup-point-select")
        transportation = ["Omniva",select.options[select.selectedIndex].text]
    }
}

function selectTransportationDestination(ind) {
    if (ind==1) {
        var select = document.getElementById("dpd-pickup-point-select")
        transportation = ["DPD",select.options[select.selectedIndex].text]
    }
    else {
        select = document.getElementById("omniva-pickup-point-select")
        transportation = ["Omniva",select.options[select.selectedIndex].text]
    }
}

function sendConfirmationCode() {
    var email = document.getElementById("email-for-verification").value
    if (email.includes("@")) {
        document.getElementById("verification-code-block").style.display = "block"
        document.getElementById("verification-wrong-email").style.display = "none"
    }
    else {
        document.getElementById("verification-wrong-email").style.display = "inline"
    }
}

function checkConfirmationCode() {
    var email = document.getElementById("email-for-verification").value
    if (email.includes("@")) {
        document.getElementById("verification-code-block").style.display = "block"
        document.getElementById("verification-wrong-email").style.display = "none"
    }
    else {
        document.getElementById("verification-wrong-email").style.display = "inline"
    }
}

function sendConfirmationEmail() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://looduslikud-taimed.000webhostapp.com/order");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => console.log(xhr.responseText);

    var name = document.getElementById("personal-data-name1").value + " " + document.getElementById("personal-data-name2").value
    var email = document.getElementById("personal-data-email").value
    var phoneNumber = document.getElementById("personal-data-phone").value
    var address = document.getElementById("personal-data-address").value

    let data = {
        "name":  name,
        "email": email,
    };

    xhr.send(data);
}