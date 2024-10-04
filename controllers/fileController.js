const FileService = require('../services/fileServices.js');
const UrlHistory = require('../services/urlHistory.js');
const urlHistory = new UrlHistory();
const fileService = new FileService()

exports.listfiles = (req, res) => {
    try{
        //if para que checkar se já há um dir no historico (haverá sempre porque root é carregada diretamente)
        urlHistory.addPath(decodeURIComponent(req.path)); 
        const dir = urlHistory.getCurrentPath();

        const files = fileService.listFiles(dir || '');
        console.log(dir)
        res.render('index', { files });

    } catch (err){
        res.status(500).send("Erro a listar os ficheiros")
        console.error(err)
    }
}; 
