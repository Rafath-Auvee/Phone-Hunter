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
                <button type="button" onclick="showDetails('${phone.slug}')" class="btn btn-info">Show Details</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}