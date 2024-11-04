const goBack = document.getElementById('goBack')
const goForward = document.getElementById('goForward')

goBack.addEventListener('click', () => {
    fetch('/back', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(()=>{
        history.back()
    })
});

goForward.addEventListener('click', () =>{
    fetch('/forward', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(()=>{
        history.forward()
    })
});