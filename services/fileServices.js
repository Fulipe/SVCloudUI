const fs = require('fs');
const path = require('path');
const UrlHistory = require('./urlHistory.js');
const urlHistory = new UrlHistory();

class FileService{
    constructor(/*baseDir*/){
        // this.baseDir = baseDir;
    }
    checkExistsDir(newdir, dirAtual){
        const newDir = path.join(dirAtual, newdir)
        console.log(newDir)
        return fs.existsSync(newDir)
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
    //mkDir
    mkdir(name, dirAtual){
        const newDir = path.join(dirAtual, name)

        fs.mkdir(newDir, (err)=>{
            if(err) throw err;
        })

    }

    //editDir

    //rmDir
}

module.exports = FileService