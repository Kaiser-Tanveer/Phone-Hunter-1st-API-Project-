// Load Phone 
const loadPhone = async(searchText, unlimitedData) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, unlimitedData);
}

// Display Phone 
const displayPhone = (phones, unlimitedData) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // Show all 
    const showAll = document.getElementById('show-all');
    if(unlimitedData && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    
    // Not found
    const warMsg = document.getElementById('not-found-msg');
    if(phones.length === 0){
        warMsg.classList.remove('d-none');
    }
    else{
        warMsg.classList.add('d-none');
    }

    phones.forEach(phone =>{
    // Adding Card div
    const phoneContainer = document.getElementById('phone-container');
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="Phone Image">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p>The best online shopping platform</p>
            <button onclick="loadPhoneDetail('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
    `;
    phoneContainer.appendChild(phoneDiv);
});
// Loader Stop 
toggleSpinner(false);
}

const searchProcss = unlimitedData => {
    toggleSpinner(true);
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    loadPhone(inputText, unlimitedData);
    inputField.value = '';
}

// Search Button 
document.getElementById('search-btn').addEventListener('click', function(){
    // Loader Start 
    searchProcss(10);
})

// Search Field Enter event handler
document.getElementById('input-field').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        searchProcss(10);
    }
})

// Loader
const toggleSpinner = isLoading => {
    const loderSec = document.getElementById('loader');
if(isLoading){
    loderSec.classList.remove('d-none');
}
else{
    loderSec.classList.add('d-none');
}
}

// Load Show all (Not the best way)
document.getElementById('show-all-btn').addEventListener('click', function(){
    searchProcss();
})


// Load Phone Detail
const loadPhoneDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url);
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone)
    const modalTitle = document.getElementById('displayPhoneDetails');
    modalTitle.innerText = phone.name;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img src="${phone.image}">
    <p><strong>Released Date:</strong> ${phone.releaseDate ? phone.releaseDate : 'No Release information'}</p>
    <p><strong>Chipset:</strong> ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No chipset information'}</p>
    <p><strong>Display:</strong> ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No Display information'}</p>
    <p><strong>Storage:</strong> ${phone.mainFeatures ? phone.mainFeatures.memory : 'No storage information'}</p>
    <p><strong>Bluetooth:</strong> ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
    <p><strong>GPS:</strong> ${phone.others ? phone.others.GPS : 'No GPS information'}</p>
    <p><strong>USB:</strong> ${phone.others ? phone.others.USB : 'No USB information'}</p>
    `;
}


loadPhone('apple');