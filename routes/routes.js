const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const root= path.resolve('data');

const urlsHistory = []

router.get('*', async (req,res) =>{
    const decodedReq = decodeURIComponent(req.path)
    if(req.path === '/'){
      var directoryPath = path.join(root); //isto é o "handler" das routes
      urlsHistory.push(directoryPath)
    } else {
      var lastUrl = urlsHistory.slice(-1).toString();
      var directoryPath = path.join(lastUrl, decodedReq);
      urlsHistory.push(directoryPath);
      
    }

    console.log("diretório" + directoryPath)
    console.log("req.path: "+ decodedReq)
    console.log("current: ", urlsHistory)
    try{
        const stat = await fs.stat(directoryPath);

        if (stat.isDirectory()){
          const items = await fs.readdir(directoryPath, {withFileTypes: true});
          const formattedItems = items.filter(item => !item.name.startsWith('.'));
          const checkDir = formattedItems.filter(item=> item.isDirectory());
          
          // .map(item => {path.join(req.path, item.name);});
          const parentPath = req.path === '/' ? '' : path.join(req.path, '..')
          const emptyDirMsg = "Diretorio vazio!";
          
          res.render('index', {checkDir, formattedItems:formattedItems, caminho:decodedReq, anterior:parentPath, emptyDirMsg});
        } else {
            const parentPath = req.path === '/' ? '' : path.join(req.path, '..')
            const content = await fs.readFile(directoryPath, 'utf-8');

            res.render('file_view', {conteudo:content, anterior:parentPath})
        }
        

    } catch (error) {
        console.error('Erro no acesso ao arquivo ou diretorio: ', error);
        res.status(500).send('Erro no acesso ao arquivo ou diretorio.');
    }
});

module.exports = router; 