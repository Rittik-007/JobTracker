let interviewList = [];
let rejectedList = [];

let total = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');
let availableCount = document.getElementById('available-count');

// filter buttons variables
const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCards = document.getElementById('allcards');
const mainContainer = document.querySelector('.main');
const filterSection = document.getElementById('filtered-section');


function calculateCount() {
    total.innerText = allCards.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
    availableCount.innerText = allCards.children.length + " jobs";
}
calculateCount();


function toggleStyle(id) {

    allFilterBtn.classList.add('filter-btn');
    interviewFilterBtn.classList.add('filter-btn');
    rejectedFilterBtn.classList.add('filter-btn');

    allFilterBtn.classList.remove('filter-btn-active');
    interviewFilterBtn.classList.remove('filter-btn-active');
    rejectedFilterBtn.classList.remove('filter-btn-active');

    // console.log(id);

    const selected = document.getElementById(id);
    // console.log(selected);

    selected.classList.remove('filter-btn');
    selected.classList.add('filter-btn-active');
}


mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const parentNode = event.target.parentNode.parentNode;

        const cardTitle = parentNode.querySelector('.card-title').innerText;
        const jobRoll = parentNode.querySelector('.job-roll').innerText;
        const jobDetails = parentNode.querySelector('.job-details').innerText;
        const extraText = parentNode.querySelector('.extra-text').innerText;

        const status = parentNode.querySelector('.status');
        status.classList.remove('rejected-status');
        status.classList.add('inteview-status');
        status.innerText = 'Interview';

        const cardInfo = {
            cardTitle,
            jobRoll,
            jobDetails,
            status,
            extraText
        }
        // console.log(cardInfo);

        const interviewExist = interviewList.find(item => item.cardTitle == cardInfo.cardTitle);
        if (!interviewExist) {
            interviewList.push(cardInfo);
        }
        // console.log(interviewList);
        calculateCount();
        renderInterview();
    }
    else if (event.target.classList.contains('reject-btn')) {
        const parentNode = event.target.parentNode.parentNode;

        const cardTitle = parentNode.querySelector('.card-title').innerText;
        const jobRoll = parentNode.querySelector('.job-roll').innerText;
        const jobDetails = parentNode.querySelector('.job-details').innerText;
        const extraText = parentNode.querySelector('.extra-text').innerText;

        const status = parentNode.querySelector('.status');
        status.classList.add('rejected-status');
        status.innerText = 'Rejected';

        const cardInfo = {
            cardTitle,
            jobRoll,
            jobDetails,
            status,
            extraText
        }
        // console.log(cardInfo);

        const rejectExist = rejectedList.find(item => item.cardTitle == cardInfo.cardTitle);
        if (!rejectExist) {
            rejectedList.push(cardInfo);
        }
        // console.log(rejectedList);
        calculateCount();
    }
})


