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
        confirmDialog.showModal(); // Exibe o diálogo de confirmação
    });
})

cancelDelete.addEventListener('click', function(){
    confirmDialog.close()
})

closeCross.addEventListener('click', function(){
    confirmDialog.close()
})

// confirmDeleteBtn