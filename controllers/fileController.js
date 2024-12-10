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
        dirAtualDisplayed = decodeURIComponent(req.originalUrl);
        
        const emptyDirMsg = "Diretorio Vazio"

        //envia para fileService path completo, tirando o dir base
        const files = fileService.listFiles(decodeURIComponent(req.path)|| '');

        console.log("Ficheiros do dir: ", files)
        console.log("Caminho atual:", dirAtualDisplayed)
        res.render('index', { files, emptyDirMsg, dirAtual:dirAtualDisplayed });
        
    } catch (error) {
        res.status(500).send("Erro a listar os ficheiros")
        console.error(error)
    }

}; 

exports.goback = (req,res)=>{
    try{
        urlHistory.goBack();

    } catch (err){
        res.status(500).send("Erro a listar os ficheiros [exports.goback]")
        console.error(err)
    }
};

exports.goforward = (req, res) => {
    try{
        urlHistory.goForward()
        const dirAtual = urlHistory.getCurrentPath();

        const emptyDirMsg = "Diretorio Vazio"
        
        const files = fileService.listFiles(dirAtual || '');
        console.log(dirAtual)
        res.render('index', { files, emptyDirMsg, dirAtual });

    } catch (err){
        res.status(500).send("Erro a listar os ficheiros [exports.goforward]")
        console.error(err)
    }
};

exports.mkdir = (req,res) => {
    try{
        //inicialização variavel
        const msgCheckDir = ''
        //dá render à view mkdir, e envia o nome do diretorio onde se vai adicionar um novo dir
        res.render('mkdir', { dirAtual:dirAtualDisplayed, msgCheckDir });

    } catch (err) {
        res.status(500).send("Erro a ir para criação de dir")
        console.error(err)
    }

};

exports.mkdirPost = (req,res) =>{
    try{
        //vai buscar apenas req.path guardado
        const dirAtual = urlHistory.getCurrentPath() 

        if(fileService.checkExistsDir(req.body.nome, dirAtual) === true){

            //mensagem quando dir já existe
            const msgCheckDir = 'O nome que inserido já existe num diretório. Insere outro nome'

            res.render('mkdir', {dirAtual:dirAtualDisplayed, msgCheckDir})

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