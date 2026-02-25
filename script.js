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


    if(id == 'interview-filter-btn'){
        allCards.style.display = 'none';
        filterSection.style.display = 'grid';
        renderInterview();
    }
    else if(id == 'all-filter-btn'){
        allCards.style.display = 'grid';
        filterSection.style.display = 'none';
    }
    else if(id == 'rejected-filter-btn'){
        allCards.style.display = 'none';
        filterSection.style.display = 'grid';
        renderRejected();
    }
}


mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const parentNode = event.target.parentNode.parentNode;
        // console.log(parentNode.parentNode);
        parentNode.parentNode.style.borderLeft = '5px solid oklch(72.3% 0.219 149.579)';

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
            status: 'Interview',
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
        parentNode.parentNode.style.borderLeft = '5px solid oklch(57.7% 0.245 27.325)';

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
            status: 'Rejected',
            extraText
        }
        // console.log(cardInfo);

        const rejectExist = rejectedList.find(item => item.cardTitle == cardInfo.cardTitle);
        if (!rejectExist) {
            rejectedList.push(cardInfo);
        }
        // console.log(rejectedList);
        calculateCount();
        renderRejected();
    }
})


function renderInterview() {
    filterSection.innerHTML = '';

    for (let interview of interviewList) {
        console.log(interview);

        let div = document.createElement('div');
        div.className = 'card bg-white rounded-lg';
        div.innerHTML = `
            <div>
                    <h3 class="card-title text-2xl font-bold text-blue-950">${interview.cardTitle}</h3>
                    <p class="job-roll text-stone-400">${interview.jobRoll}</p>

                    <p class="job-details text-stone-500 font-normal">${interview.jobDetails}</p>

                    <p class="inteview-status">${interview.status}</p>
                    <p class="extra-text">${interview.extraText}</p>

                    <div class="card-buttons">
                        <button class="interview-btn">INTERVIEW</button>
                        <button class="reject-btn">REJECT</button>
                    </div>
                </div>
                <div class="delete-icon">
                    <i class="fa-solid fa-trash-can"></i>
                </div>
        `;
        filterSection.appendChild(div);
    }
}

function renderRejected() {
    filterSection.innerHTML = '';

    for (let rejected of rejectedList) {
        console.log(rejected);

        let div = document.createElement('div');
        div.className = 'card bg-white rounded-lg';
        div.innerHTML = `
            <div>
                    <h3 class="card-title text-2xl font-bold text-blue-950">${rejected.cardTitle}</h3>
                    <p class="job-roll text-stone-400">${rejected.jobRoll}</p>

                    <p class="job-details text-stone-500 font-normal">${rejected.jobDetails}</p>

                    <p class="rejected-status">${rejected.status}</p>
                    <p class="extra-text">${rejected.extraText}</p>

                    <div class="card-buttons">
                        <button class="interview-btn">INTERVIEW</button>
                        <button class="reject-btn">REJECT</button>
                    </div>
                </div>
                <div class="delete-icon">
                    <i class="fa-solid fa-trash-can"></i>
                </div>
        `;
        filterSection.appendChild(div);
    }
}