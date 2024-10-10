const FileService = require('../services/fileServices.js');
const UrlHistory = require('../services/urlHistory.js');
const urlHistory = new UrlHistory();
const fileService = new FileService()

exports.listroot = (req, res) => {
    try{
        //if para que checkar se já há um dir no historico (haverá sempre porque root é carregada diretamente)

        urlHistory.getRoot()
        
        const files = fileService.listFiles(urlHistory.getCurrentPath());
    
        console.log("Caminho atual " + urlHistory.getCurrentPath())
        res.render('index', { files });

    } catch (err){
        res.status(500).send("Erro a listar os ficheiros")
        console.error(err)
    }
}

exports.listfiles = (req, res) => {
    try{
        //if para que checkar se já há um dir no historico (haverá sempre porque root é carregada diretamente)
        urlHistory.addPath(decodeURIComponent(req.path)); 
        const dir = urlHistory.getCurrentPath();

        const emptyDirMsg = "Diretorio Vazio"
        const files = fileService.listFiles(dir || '');
        res.render('index', { files, emptyDirMsg });

    } catch (err){
        res.status(500).send("Erro a listar os ficheiros")
        console.error(err)
    }
}; 

exports.goback = (req,res)=>{
    try{
        urlHistory.goBack();
        const dir = urlHistory.getCurrentPath();

        const emptyDirMsg = "Diretorio Vazio"

        const files = fileService.listFiles(dir || '');
        console.log(dir)
        res.render('index', {files, emptyDirMsg});

    } catch (err){
        res.status(500).send("Erro a listar os ficheiros [exports.goback]")
        console.error(err)
    }
};

exports.goforward = (req, res) => {
    try{
        urlHistory.goForward()
        const dir = urlHistory.getCurrentPath();

        const emptyDirMsg = "Diretorio Vazio"
        
        const files = fileService.listFiles(dir || '');
        console.log(dir)
        res.render('index', { files, emptyDirMsg });

    } catch (err){
        res.status(500).send("Erro a listar os ficheiros [exports.goforward]")
        console.error(err)
    }
}

exports.mkdir = (req,res) => {
    try{
        res.render('mkdir');

    } catch (err) {
        res.status(500).send("Erro a ir para criação de dir")
        console.error(err)
    }

}