const fs = require('fs');
const path = require('path');

class FileService{
    constructor(baseDir){
        this.baseDir = baseDir;
    }
    
    //Verifica se existe diretório
    checkExistsDir(newdir, dirAtual){
        //junta dir base com path guardada no historico
        const pathReq = path.join(this.baseDir, dirAtual)
        //junta dir construido acima, com nome do novo diretorio
        const newDir = path.join(pathReq, newdir)
        
        console.log(newDir)
        return fs.existsSync(newDir)
    }
    
    //metodo recebe valor de req.path no controller
    listFiles(dir = ""){

        //junta path do request ao dir base
        const pathReq = path.join(this.baseDir, dir)
        console.log("pathJunto: " + pathReq)

        //como o diretorio vem como array, .map() e atribui os valores a cada diretorio consoante embaixo
        return fs.readdirSync(pathReq).map(file => ({
          
            //nome do ficheiro -> file  
            name: file,

            //ao dir anterior, junta o novo nome
            path: path.join(dir, file),

            //verifica se é diretorio
            isDirectory: fs.lstatSync(path.join(pathReq, file)).isDirectory()
        }));   
    }

    mkdir(name, dirAtual){
        //constrói path, até ao dir que vai ser criado

        //junta dir base com path guardada no historico
        const pathReq = path.join(this.baseDir, dirAtual)
        //junta dir construido acima, com nome do novo diretorio
        const newDir = path.join(pathReq, name)

        fs.mkdir(newDir, (err)=>{
            console.log("Diretorio criado " + newDir)
            if(err) throw err;
        })
    }

    rmDir(name, dirAtual){
        //constrói path, até ao dir que vai ser criado

        //junta dir base com path guardada no historico
        const pathReq = path.join(this.baseDir, dirAtual)
        //junta dir construido acima, com nome do novo diretorio
        const dirDeleted = path.join(pathReq, name)

        //elimina recursivamente, para que seja possivel eliminar diretorios com ficheiros
        fs.rm(dirDeleted, {recursive: true}, (err)=>{
            console.log("Diretorio apagado " + dirDeleted)
            if(err) throw err;
        })
    }

    //editDir

}

module.exports = FileService