document.getElementById('error-message').style.display = 'none';

const phoneSearch = () => {
    input_text = document.getElementById("input-text").value.toLowerCase()
    input_text.value = '';
    if (input_text == "") {
        document.getElementById('error-message').style.display = 'block';
    } else {
        console.log(input_text)
        const url = `https://openapi.programming-hero.com/api/phones?search=${input_text}`;
        fetch(url)
            .then(res => res.json())
            .then(data => resultList(data.data))
            .catch(error => displayError(error));
    }
}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const resultList = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (phones.length == 0) {
        document.getElementById('error-message').style.display = 'block';
    }
    phones.forEach(phone => {
        console.log(phone)
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
}

const phoneDetailsfetch = phoneID => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneID}`;
    fetch(url)
        .then(res => res.json())
        .then(data => phonefulldetails(data.data));
}


const phonefulldetails = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-full-details');
    const div = document.createElement('div');
    // div.classList.add('card');
    div.innerHTML = `
    <div class = "card mt-5 mb-4 bg-success bg-opacity-10">
        <img src="${phone.image}" class="card-img-top w-50 mx-auto mt-5" alt="...">
        <div class="card-body">
            <h5 class="card-title">Phone Name: ${phone.name}</h5>
            <p class="card-text mb-5">Brand Name: ${phone.brand}</p>
            <p class="card-text mb-5">Chip Set: ${phone.mainFeatures.chipSet}</p>
            <p class="card-text mb-5">Release Date: ${phone.releaseDate}</p>
            
        </div>
    </div>
    `;
    phoneDetails.appendChild(div);
}