const deleteButtons = document.querySelectorAll('.del-btn'); // Seleciona todos os botões de delete
const nameDir = document.getElementById('nameDir');
const confirmDialog = document.getElementById('confirmDelDialog');

const closeCross = document.getElementById('closeCross')
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');
let fileNameToDelete = '';

// Para cada botão, adicionar o evento de clique
deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
        fileNameToDelete = this.getAttribute('data-file-name'); // Obter o nome do ficheiro do atributo data
        // console.log("A tentar eliminar:", fileNameToDelete); // Exibe o nome do ficheiro a ser eliminado
        
        nameDir.innerHTML = '/' + fileNameToDelete;
        confirmDialog.showModal(); // Exibe o Dialog de confirmação
    });
})

cancelDelete.addEventListener('click', function(){
    confirmDialog.close() //fecha Dialog ao clicar no botao cancelar
})

closeCross.addEventListener('click', function(){
    confirmDialog.close() //fecha Dialog ao clicar na cruz
})

confirmDelete.addEventListener('click', function(){
    fetch('/delete', {
        method: 'POST',
        body: JSON.stringify({path: fileNameToDelete}),
        headers: {'Content-Type': 'application/json'}
    }).then(() => {
        location.reload()
    })
    .catch(error => {
        console.error('Erro:', error);
    });
    confirmDialog.close()
    
})