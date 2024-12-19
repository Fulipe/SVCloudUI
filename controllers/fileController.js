const path = require('path');
const FileService = require('../services/fileServices.js');
const UrlHistory = require('../services/urlHistory.js');
const urlHistory = new UrlHistory();
const fileService = new FileService('./data')

//guarda valor do dir atual guardado
//mkdir assim já dá display do diretorio atual
var dirAtualDisplayed = ''

exports.listfolders = (req, res) => {
    try {

        //manda só req.path porque o sistema já tem '/data' como diretorio base
        urlHistory.addPath(decodeURIComponent(req.path)); 
        
        //Mostra caminho na nav
        // dirAtualDisplayed = decodeURIComponent(req.originalUrl);
        dirAtualDisplayed = decodeURIComponent(req.path);

        //split aos dirs nos "/" para segmentar os links 
        const dirSplit = dirAtualDisplayed == "/" ? dirAtualDisplayed.split(' ') : dirAtualDisplayed.split('/')
        
        const emptyDirMsg = "Diretorio Vazio"

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

exports.mkdirPost = (req,res) =>{
    try{
        //vai buscar apenas req.path guardado
        const dirAtual = urlHistory.getCurrentPath() 
        const dirSplit = dirAtualDisplayed == "/" ? dirAtualDisplayed.split('') : dirAtualDisplayed.split('/')
        
        if(fileService.checkExistsDir(req.body.nome, dirAtual) === true){
            
            //mensagem quando dir já existe
            const msgCheckDir = 'O nome que inserido já existe num diretório. Insere outro nome'
            
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

exports.rmdir = (req,res) =>{
    try {
        const dirAtual = urlHistory.getCurrentPath()
        fileService.rmDir(req.body.path, dirAtual)
        
        res.redirect(dirAtualDisplayed)
        
    } catch (error) {
        res.status(500).send("Erro a apagar diretorio")
        console.error(error)
    }
}

exports.editdir = (req,res) =>{
    try {        
        const dirAtual = urlHistory.getCurrentPath() 
        const oldName = req.body.oldName
        const newName = req.body.newName

        fileService.editDir(oldName, newName, dirAtual)

        res.redirect('/data' + dirAtual)
        
    } catch (error) {
        res.status(500).send("Erro a editar diretorio")
        console.error(error) 
    }
}

// exports.goback = (req,res)=>{
//     try{
//         // urlHistory.goBack();
//         // dirAtualDisplayed = urlHistory.getCurrentPath() 
//         // console.log("DirAtual goback: ", "/data" + dirAtualDisplayed)

//     } catch (err){
//         res.status(500).send("Erro a listar os ficheiros [exports.goback]")
//         console.error(err)
//     }
// };

// exports.goforward = (req, res) => {
//     try{
//         urlHistory.goForward()
//         const dirAtual = urlHistory.getCurrentPath() 
//         res.redirect('/data' + dirAtual)

//     } catch (err){
//         res.status(500).send("Erro a listar os ficheiros [exports.goforward]")
//         console.error(err)
//     }
// };