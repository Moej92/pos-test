class InvoiceItems {
    constructor() {
        this.items = [];
        this.subtotal = 0;
        this.discount = 0;
        this.amount = 0;
        this.change = 0;
    }

    addItem(itemName, itemPrice) {
        if(!this.items.length) {
            this.items.push({ name: itemName, price: itemPrice, qty: 1 });
            return;
        } else {
            let itemIdx;
            for(let i = 0; i < this.items.length; i++) {
                if(this.items[i].name === itemName) {
                    itemIdx = i;
                    break;
                }
            }

            if(itemIdx >= 0) {
                const item = this.items[itemIdx]
                const qty = item.qty + 1;
                item.price = itemPrice * qty;
                item.qty = qty;
            } else {
                this.items.push({ name: itemName, price: itemPrice, qty: 1 });
            }
        }
    }

    deleteItem(itemName) {
        this.items = this.items.filter(item => item.name !== itemName);
    }

    getSubtotal() {
        const subtotal = this.items.reduce((acc, curr) => acc + curr.price, 0);
        this.subtotal = (subtotal).toFixed(2);
        return (subtotal).toFixed(2);
    }

    getDiscountValue(percentage) {
        let discount = (Number(percentage) / 100) * this.subtotal;
        this.discount = discount.toFixed(2);
        return discount.toFixed(2);  
    }

    removeDiscount() {
        this.discount = 0;
        return 0
    }

    getTotal() {
        return (this.subtotal - this.discount).toFixed(2);
    }

}

const invoice = new InvoiceItems();

const invoiceItems = document.querySelector(".invoice-items");
const subtotal = document.querySelectorAll(".subtotal-value");
const selectDiscount = document.getElementById("add-discount");
const discount = document.querySelector(".discount-value");
const amount_input = document.querySelector(".amount-input");
const change = document.querySelector(".change-value");
const total = document.querySelector(".total-value");

function displaySubtotal() {
    subtotal.forEach(el => el.textContent = invoice.getSubtotal());
}

function displayTotal() {
    total.textContent = invoice.getTotal();
}

function addDiscount(event) {
    const discountVal = invoice.getDiscountValue(event.target.value);
    discount.textContent = discountVal;
    invoice.amount = 0;
    invoice.change = 0;
    amount_input.value = "";
    change.textContent = 0;
    displayTotal()
}

selectDiscount.addEventListener("input", addDiscount)

function displayInvoiceItems() {
    let html = ""
        invoice.items.forEach(item => {
            html += `
            <div class='row' tabindex="0">
                <p>${item.name}</p>
                <p>${item.qty}</p>
                <p>${item.price}</p>
                <i class="delete-item" id="${item.name}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M9.25 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 .75.75v.75H19a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1 0-1.5h4.25z"/><path fill="currentColor" fill-rule="evenodd" d="M6.24 7.945a.5.5 0 0 1 .497-.445h10.526a.5.5 0 0 1 .497.445l.2 1.801a44.213 44.213 0 0 1 0 9.771l-.02.177a2.603 2.603 0 0 1-2.226 2.29a26.788 26.788 0 0 1-7.428 0a2.603 2.603 0 0 1-2.227-2.29l-.02-.177a44.239 44.239 0 0 1 0-9.77zm4.51 3.455a.75.75 0 0 0-1.5 0v7a.75.75 0 0 0 1.5 0zm4 0a.75.75 0 0 0-1.5 0v7a.75.75 0 0 0 1.5 0z" clip-rule="evenodd"/></svg>
                </i>
            </div>`
        });
        invoiceItems.innerHTML = `
            <div class="row">
                <p>Item</p>
                <p>Qty</p>
                <p>Price</p>
            </div>
            ${html}
        `
        function deleteItem() {
            invoice.deleteItem(this.id);
            displayInvoiceItems();
            displaySubtotal()
            invoice.removeDiscount()
            discount.textContent = 0;
            selectDiscount.selectedIndex = 0;
            displayTotal();
        }
        document.querySelectorAll(".delete-item").forEach(el => {
            el.removeEventListener("click", deleteItem);
            el.addEventListener("click", deleteItem);
        })
}

// add item
const items = document.querySelectorAll(".item");
items.forEach(item => {
    item.addEventListener("click", function() {
        const itemName = item.firstElementChild.textContent;
        const itemPrice = item.lastElementChild.textContent;
        invoice.addItem(itemName, +itemPrice);
        invoice.removeDiscount();
        discount.textContent = 0;
        selectDiscount.selectedIndex = 0;
        displayInvoiceItems();
        displaySubtotal()
        displayTotal();
    });
})



const payment = document.querySelector(".payment")
const screen = document.querySelector(".payment-screen")

let payment_method = "credit card";

payment.addEventListener("click", () => {
    if(invoice.items.length) {
        screen.style.display = "flex";
    }
})

document.querySelector(".close-payment").addEventListener("click", () => {
    screen.style.display = "none";
})


const payment_methods = document.querySelectorAll(".method")
payment_methods.forEach(method => {
    method.addEventListener("click", function() {
        document.querySelector(".selected-method").classList.remove("selected-method");
        method.classList.add("selected-method");
        payment_method = this.lastElementChild.textContent;
        document.querySelector(".current-method").textContent = payment_method;
        
        const change_calculator = document.querySelector(".change-calculator")
        if(payment_method === "Credit Card") {
            change_calculator.style.pointerEvents = "none";
            change_calculator.style.opacity = 0.5;
        } else {
            change_calculator.style.pointerEvents = "unset";
            change_calculator.style.opacity = 1;
        }
    })
})


const numbers = document.querySelectorAll(".num");
numbers.forEach(num => {
    num.addEventListener("click", () => {
        amount_input.value += num.textContent;
    })
})

document.querySelector(".dot").addEventListener("click", () => {
    if(amount_input.value.indexOf(".") > -1) return;
    amount_input.value += "."
})

document.querySelector(".ac").addEventListener("click", () => {
    amount_input.value = "";
})

document.querySelector(".equal").addEventListener("click", () => {
    const amount = Number(amount_input.value); 
    const total = invoice.getTotal();
    if(amount) {
        const subtract = amount - total;
        if(subtract >= 0) {
            invoice.amount = amount;
            invoice.change = subtract;
            change.textContent = subtract;
        }
    }
})

document.querySelector(".confirm-payment").addEventListener("click", async () => {
    const user = document.getElementById("username").textContent;
    const invoiceNumber = document.querySelector(".invoice-num").textContent; 
    console.log(invoiceNumber)
    const res = await fetch("/payment", {
        method: "POST",
        body: JSON.stringify({ 
            user,
            invoiceNumber: +invoiceNumber,
            payment_method,
            items: invoice.items,
            subtotal: invoice.subtotal,
            discount: invoice.discount,
            amount: invoice.amount,
            change: invoice.change,
            total: invoice.getTotal()         
        }),
        headers: { "Content-Type": "application/json" }
    })
    const json = await res.json();
    
    location.reload()
})
