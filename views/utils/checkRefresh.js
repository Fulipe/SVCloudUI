window.addEventListener('load', () => {
    const navigationType = performance.getEntriesByType('navigation')[0].type;
    const isReload = navigationType === 'reload'
    console.log(navigationType)
    console.log(isReload) 

    if(isReload){        
        fetch('/navInfo', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({isReload: isReload})
        })/*.then(() =>{
            location.reload()
            })
        */
    }
    // if(navigationType === 'reload'){
    //     isReload = true
    //     console.log("REFRESH!")
    //     fetch('/navInfo', {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({isReload: true})
    //     })
    //     console.log('pós-refresh: ' + isReload)
    // }
});