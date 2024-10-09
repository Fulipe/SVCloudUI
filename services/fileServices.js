const fs = require('fs');
const path = require('path');

class FileService{
    constructor(/*baseDir*/){
        // this.baseDir = baseDir;
    }

    //metodo recebe valor de req.params no controller
    listFiles(dir = ""){

        console.log("PATH: " + dir)

        //como o diretorio vem como array, .map() e atribui os valores a cada diretorio consoante embaixo
        return fs.readdirSync(dir).map(file => ({
          
            //nome do ficheiro -> file  
            name: file,

            //ao dir anterior, junta o novo nome
            path: path.join(dir, file),

            //verifica se é diretorio
            isDirectory: fs.lstatSync(path.join(dir, file)).isDirectory()
        }));   
    }
}

module.exports = FileService