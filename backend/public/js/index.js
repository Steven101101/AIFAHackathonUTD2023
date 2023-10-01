const suggestBtn = document.getElementById('suggestBtn');
const closeBtn = document.getElementById('closeBtn');
const activitiesModal = document.getElementById('activitiesModal');
const activitiesList = document.getElementById('activitiesList');
const ageActivityMessage = document.getElementById('ageActivityMessage');

closeBtn.addEventListener('click', () => {
    activitiesModal.close();
});

suggestBtn.addEventListener('click', () => {
    activitiesModal.show();
    const cityInput = document.getElementById('cityInput');
    const stateInput = document.getElementById('stateInput');
    const ageInput = document.getElementById('ageInput');
    if (cityInput.value && stateInput.value && ageInput.value) {      
        ageActivityMessage.innerText = `Suitable activites for a ${ageInput.value} year old`;  
        fetch(`/getnearbyactivities/${cityInput.value}/${stateInput.value}/${ageInput.value}`).then(output => output.json()).then(output => {
            output.forEach(activity => {
                const activityEl = document.createElement('li');
                activityEl.innerText = activity;
                activitiesList.append(activityEl);
            });
        }).catch(error => {
            alert(error);
        });
    }
});
