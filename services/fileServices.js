const fs = require('fs');
const path = require('path');

class FileService{
    constructor(baseDir){
        this.baseDir = baseDir;
    }
    
    //Verifies if Directory exists
    checkExistsDir(newdir, dirAtual){
        //Joins baseDir with path to follow
        const pathReq = path.join(this.baseDir, dirAtual)
        //Joins built path with the name of the newly created directory 
        const newDir = path.join(pathReq, newdir)
        
        console.log(newDir)
        return fs.existsSync(newDir)
    }
    
    //Param receives value of req.path from controller
    listFiles(dir = ""){

        //Joins baseDir with path to follow
        const pathReq = path.join(this.baseDir, dir)
        console.log("pathJunto: " + pathReq)

        //Mapping of the array where the directories come
        return fs.readdirSync(pathReq).map(file => ({
          
            //Name of an item -> file  
            name: file,

            //Joins the name of the item to its parent directory path
            path: path.join(dir, file),

            //Verifies if item is a directory
            isDirectory: fs.lstatSync(path.join(pathReq, file)).isDirectory()
        }));   
    }

    mkdir(name, dirAtual){
        //Construct path, to the directory to be created

        //Joins baseDir with path to follow
        const pathReq = path.join(this.baseDir, dirAtual)
        //Joins built path with the name of the newly created directory 
        const newDir = path.join(pathReq, name)

        fs.mkdir(newDir, (err)=>{
            console.log("Diretorio criado " + newDir)
            if(err) throw err;
        })
    }

    delete(name, dirAtual){
        //Joins baseDir with path to follow
        const pathReq = path.join(this.baseDir, dirAtual)
        //Joins built path with the name of the to be deleted directory
        const dirDeleted = path.join(pathReq, name)

        //Recursive deleting, so it is possible to delete directories with files inside 
        fs.rm(dirDeleted, {recursive: true}, (err)=>{
            console.log("Diretorio apagado " + dirDeleted)
            if(err) throw err;
        })
    }

    edit(oldName, newName, dirAtual){
        //Joins baseDir with path to follow
        const pathReq = path.join(this.baseDir, dirAtual)
        //Joins built path with the name of the to be edited directory
        const oldPath = path.join(pathReq, oldName)
        //Builds new path with the new directory name
        const newPath = path.join(pathReq, newName)
        
        fs.renameSync(oldPath, newPath, (err) =>{
            console.log("Diretorio editado: ", 
                "\nAntigo: ", oldPath, 
                " \nNovo: ", newPath)
            if (err) throw err;
        }) 
    }

}

module.exports = FileService