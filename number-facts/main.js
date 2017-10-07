let fact = document.querySelector('#fact');
let factText = document.querySelector('#factText');

let numberInput = document.querySelector('#numberInput');

// numberInput.addEventListener('input', getFactAjax);
numberInput.addEventListener('input', getFactFetch);


// function getFactAjax () {
//    let number = numberInput.value;
//    let url = `http://numbersapi.com/${number}`

//    let xhr = new XMLHttpRequest();

//    xhr.open('GET', url);
//    xhr.onload = function(){
//         if(this.status == 200 && number != ''){
//             fact.style.display = 'block';
//             factText.innerText = this.responseText
//         }
//    }
//    xhr.send();
// }

function getFactFetch() {
    let number = numberInput.value;
    let url = `http://numbersapi.com/${number}`

    fetch(url)
        .then(response => response.text())
        .then(data => {
            if (number != '') {
                fact.style.display = 'block';
                factText.innerText = data;
            }
        })
        .catch(err => console.log(err));
}
