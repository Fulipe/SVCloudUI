const path = require('path');
const FileService = require('../services/fileServices.js');
const UrlHistory = require('../services/urlHistory.js');
const { dir } = require('console');
const urlHistory = new UrlHistory();
const fileService = new FileService()

exports.listroot = (req, res) => {
    try{
        //if para que checkar se já há um dir no historico (haverá sempre porque root é carregada diretamente)

        urlHistory.getRoot()
        
        const files = fileService.listFiles(urlHistory.getCurrentPath());
    
        console.log("Caminho atual: " + urlHistory.getCurrentPath())
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
};

exports.mkdir = (req,res) => {
    try{
        const dirAtual = urlHistory.getCurrentPath()
        res.render('mkdir', { dirAtual });

    } catch (err) {
        res.status(500).send("Erro a ir para criação de dir")
        console.error(err)
    }

};

exports.mkdirPost = (req,res) =>{
    try{
        const dirAtual = urlHistory.getCurrentPath()

        if(fileService.checkExistsDir(req.body.nome, dirAtual) === true){
            console.log('O nome que inseriu já existe. Tente novamente.')
            res.render('mkdir', {dirAtual})

        } else {
            try {
                fileService.mkdir(req.body.nome, dirAtual)
                
                urlHistory.addPath('/' + decodeURIComponent(req.body.nome))
                const dir = urlHistory.getCurrentPath()
                
                const files = fileService.listFiles(dir || '');

                const emptyDirMsg = "Diretorio Vazio"

                console.log(dir)
                res.render('index', { files, emptyDirMsg });

            } catch (error) {
                res.status(500).send("Erro a criar diretorio")
                console.error(error)
                
            }
        }

        // // urlHistory.addPath(decodeURIComponent(req.body.name))
        // const dirAtual = urlHistory.getCurrentPath()
        // // const emptyDirMsg = "Diretorio Vazio"
        // const newDir = path.join(dirAtual, req.body.nome)

    } catch (err) {
        res.status(500).send("Erro a ir para criação de dir")
        console.error(err)
    }
    

}