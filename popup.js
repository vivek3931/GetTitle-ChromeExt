const myBtn = document.querySelector('#myButton');
const result = document.querySelector('#result');


myBtn.addEventListener('click' , () =>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const title = tabs[0].title;
    result.style.display = "block"
    result.textContent = 'Tab Title: ' + title;
  });
})

