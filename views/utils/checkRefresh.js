const irButtons = document.querySelectorAll('.ir-btn'); // Seleciona todos os botões de delete
var fileNameToGo = '';
const navigationType = performance.getEntriesByType('navigation')[0].type;

// if(navigationType === 'reload'){
//     fetch('/nav-info', {
//         method: 'POST',
//         body: JSON.stringify({ isReload: navigationType === 'reload' }),
//         headers: { 'Content-Type': 'application/json' },
//     });

// } else {
    irButtons.forEach (button => {
        button.addEventListener('click', function (){
            fileNameToGo = this.getAttribute('dirName')
            console.log('antes de fetch: ',fileNameToGo)
    
            fetch('/folders', {
                method: 'POST',
                body: JSON.stringify({dir: fileNameToGo}),
                headers: { 'Content-Type': 'application/json' },
            })
        })
    })
// }






    // const navigationType = performance.getEntriesByType('navigation')[0].type;
    // const isReload = navigationType === 'reload'
    // console.log(navigationType)
    // console.log(isReload) 
    

    // fetch('/navInfo', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ isReload: isReload })
    // }).then(() =>{
    //         location.reload()
    //         })
    
    // // if(navigationType === 'reload'){
    // //     isReload = true
    // //     console.log("REFRESH!")
    // //     fetch('/navInfo', {
    // //         method: 'POST',
    // //         headers: {'Content-Type': 'application/json'},
    // //         body: JSON.stringify({isReload: true})
    // //     })
    // //     console.log('pós-refresh: ' + isReload)
    // // }