const phoneSearch = () => {
    input_text = document.getElementById("input-text")
    text = input_text.value

    if (input_text == "") {
        console.log("Empty String")
    } else {
        const url = "https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089";
        fetch(url)
            .then(res => res.json())
            .then(data => console.log(data))
    }
}