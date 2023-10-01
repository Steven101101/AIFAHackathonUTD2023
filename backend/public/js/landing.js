const getHelpBtn = document.getElementsByClassName('getHelpBtn')[0];
const helpBtn = document.getElementsByClassName('helpBtn')[0];

getHelpBtn.addEventListener('click', () => {
    window.location = '/gethelp';
});

helpBtn.addEventListener('click', () => {
    window.location = '/helpers';
});
