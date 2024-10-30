const FileService = require('../services/fileServices.js');
const UrlHistory = require('../services/urlHistory.js');
const urlHistory = new UrlHistory();
const fileService = new FileService()

exports.listroot = (req, res) => {
    try{
        //if para que checkar se já há um dir no historico (haverá sempre porque root é carregada diretamente)

        urlHistory.getRoot()
        const emptyDirMsg = "Diretorio Vazio"
        const dirAtual = urlHistory.getCurrentPath()
        const files = fileService.listFiles(dirAtual);
    
        console.log("Caminho atual: " + dirAtual)
        res.render('index', { files, emptyDirMsg, dirAtual });

    } catch (err){
        res.status(500).send("Erro a listar os ficheiros")
        console.error(err)
    }
}

exports.listfiles = (req, res) => {

    //[IN DEV] 
    //  -> caso haja um subdiretorio com o mm nome do diretorio parent (como no exemplo abaixo), não dá acesso e apenas mostra o parent.
    const dirAtual = urlHistory.getCurrentPath();
    const dirSplit = dirAtual.split("/");
    const lastDir = "/" + dirSplit.slice(-1).toString();

    //Para quando se dá refresh na página evita-se que o dir incoming não seja adicionado ao url e assim não tentando buscar dirs que não existem
    //Ex: data/dir/dir
    if (req.params.directory == lastDir) {
        try {
            const emptyDirMsg = "Diretorio Vazio"
            const files = fileService.listFiles(dirAtual || '');
            res.render('index', { files, emptyDirMsg, dirAtual });
            
        } catch (error) {
            res.status(500).send("Erro a dar refresh")
            console.error(error)
        }
    
    } else{
        try {
            urlHistory.addPath('/' + decodeURIComponent(req.params.directory)); 
            const dirAtual = urlHistory.getCurrentPath();
            const emptyDirMsg = "Diretorio Vazio"
            const files = fileService.listFiles(dirAtual || '');

            console.log(files)
            res.render('index', { files, emptyDirMsg, dirAtual });
            
        } catch (error) {
            res.status(500).send("Erro a listar os ficheiros")
            console.error(error)
        }
    }
}; 

exports.goback = (req,res)=>{
    try{
        urlHistory.goBack();
        const dirAtual = urlHistory.getCurrentPath();

        const emptyDirMsg = "Diretorio Vazio"

        const files = fileService.listFiles(dirAtual || '');
        console.log(dirAtual)
        res.render('index', {files, emptyDirMsg, dirAtual});

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
                res.render('index', { files, emptyDirMsg, dirAtual:dir });

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
        urlHistory.pathDestroyed()
        
        const dirAnterior = urlHistory.getCurrentPath()
        const files = fileService.listFiles(dirAnterior || '');
        const emptyDirMsg = "Diretorio Vazio"

        console.log(dirAnterior)
        res.render('index', { files, emptyDirMsg, dirAtual });
        
    } catch (error) {
        res.status(500).send("Erro a apagar diretorio")
        console.error(error)
    }
}