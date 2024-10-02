const FileService = require('../services/fileServices.js');
const fileService = new FileService('data')

exports.listfiles = (req, res) => {
    try{
        const files = fileService.listFiles(req.params.directory || '');
        console.log(req.path)
        res.render('index', { files });
    } catch (err){
        res.status(500).send("Erro a listar os ficheiros")
        console.error(err)
    }
}; 
