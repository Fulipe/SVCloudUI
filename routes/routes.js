const express = require('express');
const { type } = require('os');
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
    console.log()
    try{
        const stat = await fs.stat(directoryPath);

        if (stat.isDirectory()){
          const items = await fs.readdir(directoryPath, {withFileTypes: true});
          const formattedItems = items.filter(item => !item.name.startsWith('.'))
          const checkDir = items.filter(item=> item.isDirectory);
          
          // .map(item => {path.join(req.path, item.name);});
          const parentPath = req.path === '/' ? '' : path.join(req.path, '..')
          const emptyDirMsg = "Diretorio vazio!";
          console.log(items)
          console.log(checkDir)

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


// router.get('/', (req, res) =>{

//   var directoryPath = path.resolve(root); 

//   urlsHistory.push(directoryPath);

//   //tem de ser "/" porque em Linux os diretórios são separados por "/" ao contrario de Windows que é "\\"
//   var urlSplit = directoryPath.split("/");
//   var dir = urlSplit.slice(-1).toString();

//   console.log("url split: ", dir)
  
//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       console.error('Erro ao ler diretório:', err);
//       return;
//     }

//     // const folders = files.filter(file =>{fs.statSync(path.join(directoryPath, file)).isDirectory()}); -> apenas mostra diretorios
//     const folders = files.filter((str) => {return !str.startsWith('.')});
//     const parentPath = req.path === '/' ? '' : path.join(req.path, '..');

//     const dirs = files.filter(directory =>{fs.statSync(path.join(directoryPath, directory)).isDirectory()});
//     const archives = files.filter(arch =>{fs.statSync(path.join(directoryPath, arch)).isFile()});
//     var emptyDirMsg = "Diretorio vazio!";

//     console.log('Pastas existentes:', folders);
//     console.log(directoryPath);
//     console.log(urlsHistory);
//     console.log(req.originalUrl)

//     res.render('index', {folders: folders, dir:dir, emptyDirMsg, dirs:dirs, archives:archives, parentPath});
//   });
// });

// // router.get('/anterior', (req, res) =>{

// //   //Get last url
// //   var lastUrl = urlsHistory.slice(-1).toString();
// //   urlsHistory.pop(lastUrl)
  
// //   //sets last url to be shown
// //   var directoryPath = path.dirname(lastUrl);
  
// //   //tem de ser "/" porque em Linux os diretórios são separados por "/" ao contrario de Windows que é "\\"
// //   const urlSplit = directoryPath.split("/");
// //   var dir = urlSplit.slice(-1).toString();

// //   console.log("url split: ", urlSplit)
// //   fs.readdir(directoryPath, (err, files) => {
// //     if (err) {
// //       console.error('Erro ao ler diretório:', err);
// //       return;
// //     }
    
// //     const folders = files.filter((str) => {return !str.startsWith('.')});

// //     var emptyDirMsg = "Diretorio vazio!";
    
// //     console.log('Pastas existentes:', folders);
// //     console.log(directoryPath)
// //     console.log(urlsHistory);

// //     res.render('index', {folders: folders, dir:dir, emptyDirMsg});
// //     });
// // });

// router.get('/:diretorio?/', (req, res) =>{
//   const newDir = req.params.diretorio || ''

//   var lastUrl = urlsHistory.slice(-1).toString();
//   var directoryPath = path.join(lastUrl, newDir); 
//   urlsHistory.push(directoryPath)


//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       console.error('Erro ao ler diretório:', err);
//       return;
//     }

//     const folders = files.filter((str) => {return !str.startsWith('.')});

//     const emptyDirMsg = "Diretorio vazio!";
    
//     const parentPath = req.path === '/' ? '' : path.join(req.path, '..');

//     console.log('Pastas existentes:', folders);
//     console.log(directoryPath)
//     console.log(urlsHistory);
//     console.log(req.originalUrl)

//     res.render('index', {folders: folders, dir:newDir, emptyDirMsg, parentPath});
//   });
// });


module.exports = router; 