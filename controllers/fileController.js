require('dotenv').config()
const FileService = require('../services/fileServices.js');
const UrlHistory = require('../services/urlHistory.js');
const path = require('path');
const multer  = require('multer')

var root = process.env.root
const urlHistory = new UrlHistory();
const fileService = new FileService(root)

//Stores the value of the current directory 
var dirAtualDisplayed = ''

//lists directories
exports.listfolders = (req, res) => {
    try {

        //manda só req.path porque o sistema já tem '/data' como diretorio base
        urlHistory.addPath(decodeURIComponent(req.path)); 
        
        //Mostra caminho na nav
        // dirAtualDisplayed = decodeURIComponent(req.originalUrl);
        dirAtualDisplayed = decodeURIComponent(req.path);

        //split aos dirs nos "/" para segmentar os links 
        const dirSplit = dirAtualDisplayed == "/" ? dirAtualDisplayed.split(' ') : dirAtualDisplayed.split('/')
        
        const emptyDirMsg = "Empty Directory"

        //envia para fileService path completo, tirando o dir base
        const files = fileService.listFiles(dirAtualDisplayed || '');

        console.log("Ficheiros do dir: ", files)
        console.log("Caminho atual:", dirAtualDisplayed)
        res.render('index', { files, emptyDirMsg, dirAtual:dirSplit });
        
    } catch (error) {
        res.status(500).send("Erro a listar os ficheiros")
        console.error(error)
    }

}; 

//GET METHOD: create directories
exports.mkdir = (req,res) => {
    try{
        //split aos dirs nos "/" para segmentar os links 
        const dirSplit = dirAtualDisplayed == "/" ? dirAtualDisplayed.split('') : dirAtualDisplayed.split('/')
        //inicialização variavel
        console.log('mkdir: ', dirSplit)
        const msgCheckDir = ''
        //dá render à view mkdir, e envia o nome do diretorio onde se vai adicionar um novo dir
        res.render('mkdir', { dirAtual:dirSplit, msgCheckDir });
        
    } catch (err) {
        res.status(500).send("Erro a ir para criação de dir")
        console.error(err)
    }

};

//POST METHOD: create directories
exports.mkdirPost = (req,res) =>{
    try{
        //vai buscar apenas req.path guardado
        const dirAtual = urlHistory.getCurrentPath() 
        const dirSplit = dirAtualDisplayed == "/" ? dirAtualDisplayed.split('') : dirAtualDisplayed.split('/')
        
        if(fileService.checkExistsDir(req.body.nome, dirAtual) === true){
            
            //mensagem quando dir já existe
            const msgCheckDir = 'Name already given. Insert a different name.'
            
            res.render('mkdir', {dirAtual:dirSplit, msgCheckDir})
            
        } else {
            try {
                fileService.mkdir(req.body.nome, dirAtual)   
                
                //Correção path que é enviada para a nav de seguida 
                dirAtual == '/'  
                ? res.redirect('/data' + dirAtual + req.body.nome) //caso o dir seja add em /data
                : res.redirect('/data' + dirAtual + '/' + req.body.nome) //caso o dir seja add em dirs +2º grau
                    
                } catch (error) {
                res.status(500).send("Erro a criar diretorio ou mostrar diretorio")
                console.error(error)
                
            }
        }
        
    } catch (err) {
        res.status(500).send("Erro a ir para criação de dir")
        console.error(err)
    }    
}

//Delete
exports.delete = (req,res) =>{
    try {
        const dirAtual = urlHistory.getCurrentPath()
        fileService.delete(req.body.path, dirAtual)
        
        res.redirect(dirAtualDisplayed)
        
    } catch (error) {
        res.status(500).send("Erro a apagar diretorio")
        console.error(error)
    }
}

//Edit
exports.edit = (req,res) =>{
    try {        
        const dirAtual = urlHistory.getCurrentPath() 
        const oldName = req.body.oldName
        const newName = req.body.newName

        fileService.edit(oldName, newName, dirAtual)

        res.redirect('/data' + dirAtual)
        
    } catch (error) {
        res.status(500).send("Erro a editar diretorio")
        console.error(error) 
    }
}

//Download Files
exports.getfile = (req, res) => {
    try {        
        const dirAtual = urlHistory.getCurrentPath()
        console.log(req.path)

        //ao clicar em "Ir >>>" num ficheiro, fará download no ficheiro para a máquina
        res.download(root + dirAtual + decodeURIComponent(req.path))

    } catch (error) {
        res.status(500).send("Erro download Ficheiro")
        console.error(error)
    }
}

//GET METHOD: Upload Files
exports.uploadFile = (req,res) =>{
    try{
        //split aos dirs nos "/" para segmentar os links 
        const dirSplit = dirAtualDisplayed == "/" ? dirAtualDisplayed.split('') : dirAtualDisplayed.split('/')
        //inicialização variavel
        console.log('upload: ', dirSplit)
        const msgCheckDir = ''
        const dirAtual = urlHistory.getCurrentPath()
        console.log("Dir upload: ",dirAtual)
        //dá render à view mkdir, e envia o nome do diretorio onde se vai adicionar um novo dir
        res.render('upload', { dirAtual:dirSplit, msgCheckDir });
        
    } catch (err) {
        res.status(500).send("Erro a ir para criação de dir")
        console.error(err)
    } 
}

//Multer
//#region 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const dirAtual = urlHistory.getCurrentPath()
        const pathUpload = path.join(root, dirAtual)
        cb(null, pathUpload)
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})
const upload = multer({storage})

exports.multerUpload = upload.single('file');
//#endregion

//POST METHOD: Upload Files
exports.uploadFilePost = (req, res) => {
    try{
        const dirAtual = urlHistory.getCurrentPath()
        console.log(req.file)
        console.log(dirAtual)
        res.redirect('/data' + dirAtual ) //caso o dir seja add em /data
    } catch (err) {
        res.status(500).send("Erro a carregar ficheiro")
        console.error(err)
    }
}
