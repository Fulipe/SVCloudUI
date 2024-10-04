const fs = require('fs')
const path = require('path')
const UrlHistory = require('../services/urlHistory.js');
const urlHistory = new UrlHistory();

class FileService{
    constructor(/*baseDir*/){
        // this.baseDir = baseDir;
    }

    //metodo recebe valor de req.params no controller
    listFiles(dir = ""){

        //junta ao ultimo diretorio, o valor do req.path descodificado 
        const directoryPath = path
                            .join(urlHistory
                            .getCurrentPath()
                            .concat(dir));

        console.log("PATH: " + directoryPath)

        //como o diretorio vem como array, .map() e atribui os valores a cada diretorio consoante embaixo
        return fs.readdirSync(directoryPath).map(file => ({
          
            //nome do ficheiro -> file  
            name: file,

            //ao dir anterior, junta o novo nome
            path: path.join(dir, file),

            //verifica se é diretorio
            isDirectory: fs.lstatSync(path.join(directoryPath, file)).isDirectory()
        }));   
    }
}

module.exports = FileService