let total = document.getElementById('total-count');

let availableCount = document.getElementById('available-count');

const allCards = document.getElementById('allcards');

total.innerText = allCards.children.length; 
availableCount.innerText = allCards.children.length + " jobs";