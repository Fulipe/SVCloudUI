const fs = require('fs');
const path = require('path');

class FileService{
    constructor(/*baseDir*/){
        // this.baseDir = baseDir;
    }
    //Verifica se existe diretório
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

    mkdir(name, dirAtual){
        //constrói path, até ao dir que vai ser criado
        const newDir = path.join(dirAtual, name)

        fs.mkdir(newDir, (err)=>{
            console.log("Diretorio criado " + newDir)
            if(err) throw err;
        })

    }
    rmDir(params, dirAtual){
        //constrói path, até ao dir que vai ser eliminado
        const dirDeleted = path.join(dirAtual, params)

        //elimina recursivamente, para que seja possivel eliminar diretorios com ficheiros
        fs.rmSync(dirDeleted, {recursive: true}, (err)=>{
            console.log("Diretorio apagado " + dirDeleted)
            if(err) throw err;
        })
    }

    //editDir

}

module.exports = FileService