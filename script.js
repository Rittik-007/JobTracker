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
const noJobSection = document.getElementById('nojobs');


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


    if (id == 'interview-filter-btn') {
        availableCount.innerText = interviewCount.innerText + " of " + total.innerText + " jobs";

        if(interviewList.length < 1){
            noJobSection.style.display = 'flex';
        }

        allCards.style.display = 'none';
        filterSection.style.display = 'grid';
        renderInterview();
    }
    else if (id == 'all-filter-btn') {
        availableCount.innerText = allCards.children.length + " jobs";

        if(allCards.children.length < 1){
            noJobSection.style.display = 'flex';
        }

        allCards.style.display = 'grid';
        filterSection.style.display = 'none';
    }
    else if (id == 'rejected-filter-btn') {
        availableCount.innerText = rejectedCount.innerText + " of " + total.innerText + " jobs";

        if(rejectedList.length < 1){
            noJobSection.style.display = 'flex';
        }

        allCards.style.display = 'none';
        filterSection.style.display = 'grid';
        renderRejected();
    }
}


mainContainer.addEventListener('click', function (event) {

    const card = event.target.closest('.card');
    if (!card) return; // safety

    const cardTitle = card.querySelector('.card-title').innerText;
    const jobRoll = card.querySelector('.job-roll').innerText;
    const jobDetails = card.querySelector('.job-details').innerText;
    const extraText = card.querySelector('.extra-text').innerText;
    const statusElement = card.querySelector('.status');

    // ================= INTERVIEW =================
    if (event.target.classList.contains('interview-btn')) {

        card.style.borderLeft = '5px solid oklch(72.3% 0.219 149.579)';

        statusElement.classList.remove('rejected-status');
        statusElement.classList.add('interview-status');
        statusElement.innerText = event.target.innerText + 'ED';

        const cardInfo = {
            cardTitle,
            jobRoll,
            jobDetails,
            status: event.target.innerText, // STRING only
            extraText
        };

        const exist = interviewList.find(item => item.cardTitle === cardTitle);

        if (!exist) {
            interviewList.push(cardInfo);
        }else{
            return;
        }

        // remove from rejected list
        rejectedList = rejectedList.filter(item => item.cardTitle !== cardTitle);

        renderInterview();
        renderRejected();
        calculateCount();
    }

    // ================= REJECT =================
    else if (event.target.classList.contains('reject-btn')) {

        card.style.borderLeft = '5px solid oklch(57.7% 0.245 27.325)';

        statusElement.classList.remove('interview-status');
        statusElement.classList.add('rejected-status');
        statusElement.innerText = event.target.innerText + 'ED';

        const cardInfo = {
            cardTitle,
            jobRoll,
            jobDetails,
            status: event.target.innerText, // STRING only
            extraText
        };

        const exist = rejectedList.find(item => item.cardTitle === cardTitle);

        if (!exist) {
            rejectedList.push(cardInfo);
        }else{
            return;
        }

        // remove from interview list
        interviewList = interviewList.filter(item => item.cardTitle !== cardTitle);

        renderRejected();
        renderInterview();
        calculateCount();
    }
    else if(event.target.classList.contains('delete-btn')){
        const parentCard = event.target.parentNode.parentNode;
        // const targetChild = event.target.classList.contains('delete-btn');
        // console.log(parentCard);

        interviewList = interviewList.filter(item => item.cardTitle !== cardTitle);
        rejectedList = rejectedList.filter(item => item.cardTitle !== cardTitle);

        parentCard.remove();

        calculateCount();
    }

});


function renderInterview() {
    filterSection.innerHTML = '';
    console.log("Hello");

    for (let interview of interviewList) {
        console.log({ interview });

        let div = document.createElement('div');
        div.className = 'card interview-card bg-white rounded-lg';
        div.innerHTML = `
            <div>
                    <h3 class="card-title text-2xl font-bold text-blue-950">${interview.cardTitle}</h3>
                    <p class="job-roll text-stone-400">${interview.jobRoll}</p>

                    <p class="job-details text-stone-500 font-normal">${interview.jobDetails}</p>

                    <p class="status interview-status">${interview.status}</p>
                    <p class="extra-text">${interview.extraText}</p>

                    <div class="card-buttons">
                        <button class="interview-btn">INTERVIEW</button>
                        <button class="reject-btn">REJECT</button>
                    </div>
                </div>
                <div class="delete-icon">
                    <i class="fa-solid fa-trash-can delete-btn"></i>
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
        div.className = 'card reject-card bg-white rounded-lg';
        div.innerHTML = `
            <div>
                    <h3 class="card-title text-2xl font-bold text-blue-950">${rejected.cardTitle}</h3>
                    <p class="job-roll text-stone-400">${rejected.jobRoll}</p>

                    <p class="job-details text-stone-500 font-normal">${rejected.jobDetails}</p>

                    <p class="status rejected-status">${rejected.status}</p>
                    <p class="extra-text">${rejected.extraText}</p>

                    <div class="card-buttons">
                        <button class="interview-btn">INTERVIEW</button>
                        <button class="reject-btn">REJECT</button>
                    </div>
                </div>
                <div class="delete-icon">
                    <i class="fa-solid fa-trash-can delete-btn"></i>
                </div>
        `;
        filterSection.appendChild(div);
    }
}