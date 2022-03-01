//Now showing the error message

document.getElementById('error-message').style.display = 'none';

// Toggle Spinner Code 
const spinnerToggle = toggle => {
    document.getElementById('spinner').style.display = toggle
}

// Fetching Api in json
const phoneSearch = () => {
        spinnerToggle('block')
        input_text = document.getElementById("input-text").value.toLowerCase()
        input_text.value = '';
        if (input_text == "") {
            document.getElementById('error-message').style.display = 'block';
        } else {

            console.log(input_text)
            document.getElementById('error-message').style.display = 'none';
            const url = `https://openapi.programming-hero.com/api/phones?search=${input_text}`;
            fetch(url)
                .then(res => res.json())
                .then(data => resultList(data.data))
                .catch(error => displayError(error));
        }
    }
    // display error message
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
    // document.getElementById('phone-full-details').textContent = '';
    // document.getElementById('search-result').textContent = '';


}


// showing only 20 phones in the search 
const resultList = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    document.getElementById('phone-full-details').textContent = ''
    phones = phones.slice(0, 20);

    if (phones.length == 0) {
        document.getElementById('error-message').style.display = 'block';
    }
    phones.forEach(phone => {
            // console.log(phone)
            const phoneDetails = document.getElementById('phone-full-details');
            phoneDetails.textContent = '';
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100 bg-secondary bg-opacity-10">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto mt-3 " alt="...">
            <div class="card-body mx-auto text-center">
                <h5 class="card-title fs-3">${phone.phone_name}</h5>
                <p class="card-text fs-4">Brand Name: ${phone.brand}</p>
                <button type="button" onclick="phoneDetailsfetch('${phone.slug}')" class="btn btn-info">Show Details</button>
            </div>
        </div>
        `;
            searchResult.appendChild(div);
        })
        // toggling spinner code 
    spinnerToggle('none')
}


// fetching details of specific phones by phoneID
const phoneDetailsfetch = phoneID => {
    spinnerToggle('block')
    const url = `https://openapi.programming-hero.com/api/phone/${phoneID}`;
    fetch(url)
        .then(res => res.json())
        .then(data => phonefulldetails(data.data));
}

// showing details of specific phones
const phonefulldetails = phone => {
    const phoneDetails = document.getElementById('phone-full-details');
    phoneDetails.textContent = '';
    const others = phone.others
    const mainFeatures = phone.mainFeatures

    // const sensors = JSON.stringify(phone.mainFeatures.sensors).split(',').join(', ');
    const sensor = phone.mainFeatures.sensors;
    const p1 = document.createElement('p');
    // p1.classList.add('card-text')
    p1.className = "card-text";

    // looping all other objects

    if (phone.others != undefined)
        for (const [key, value] of Object.entries(phone.others)) {
            const p = document.createTextNode(`${key} : ${value}`);
            // var text = document.createTextNode("\n");
            var br = document.createElement("br");
            p1.appendChild(p)
            p1.appendChild(br)
                // console.log(p)
                // console.log(p1)
                // console.log(key)
                // console.log(value)
        }
        // condition  for checking phone undefined or empty string

    if (phone.releaseDate == '' || phone.releaseDate == undefined) {
        phone.releaseDate = "Not published yet"
    }
    if (phone.brand == '' || phone.brand == undefined) {
        phone.brand = "Not published yet"
    }
    if (mainFeatures.chipSet == '' || mainFeatures.chipSet == undefined) {
        mainFeatures.chipSet = "Not published yet"
    }
    if (mainFeatures.storage == '' || mainFeatures.storage == undefined) {
        mainFeatures.storage = "Not published yet"
    }
    if (mainFeatures.displaySize == '' || mainFeatures.displaySize == undefined) {
        mainFeatures.displaySize = "Not published yet"
    }
    if (mainFeatures.memory == '' || mainFeatures.memory == undefined) {
        mainFeatures.memory = "Not published yet"
    }
    if (sensor == '' || sensor == undefined) {
        sensor = "Not published yet"
    }
    if (phone.name == '' || phone.name == undefined) {
        phone.name = "Not published yet"
    }
    if (phone.releaseDate == '' || phone.releaseDate == undefined) {
        phone.releaseDate = "Not published yet"
    }
    // <p class="card-text ">Bluetooth: ${others.Bluetooth}</p>
    // <p class="card-text ">GPS ${others.GPS}</p>
    // <p class="card-text ">NFC: ${others.NFC}</p>
    // <p class="card-text ">Radio: ${others.Radio}</p>
    // <p class="card-text ">USB: ${others.USB}</p>
    // <p class="card-text ">WLAN: ${others.WLAN}</p>
    // <p class="card-text ">WLAN: ${others}</p>

    // clearing canvus 
    console.log(sensor);
    // div.classList.add('card');

    // displaying details of phone 
    const div = document.createElement('div');
    div.innerHTML = `
    <div class = "card mt-5 mb-4 bg-success bg-opacity-10">
        <img src="${phone.image}" class="card-img-top w-50 mx-auto mt-5" alt="...">
        <div class="card-body">
        
            <h5 class="card-title">Phone Name: ${phone.name}</h5>
            <p class="card-text mb-5">Brand Name: ${phone.brand}</p>
            <h5 class="card-title fs-2 text-bold">Features</h5>
            <p class="card-text ">Chip Set: ${mainFeatures.chipSet}</p>
            <p class="card-text ">Storage: ${mainFeatures.storage}</p>
            <p class="card-text ">Display Size: ${mainFeatures.displaySize}</p>
            <p class="card-text ">Memory: ${mainFeatures.memory}</p>
            <p class="card-text my-3">Sensors: ${sensor}</p>
            
            <p class="card-text ">Release Date: ${phone.releaseDate}</p>
            
        </div>
    </div>
    `;
    div.lastElementChild.lastElementChild.appendChild(p1)
        // console.log('this is: ', div.lastChild)
    phoneDetails.appendChild(div);

    // toggling spinner code 
    spinnerToggle('none')
}