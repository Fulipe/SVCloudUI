const express = require('express');
// const multer = require('multer')
const fileController = require('../controllers/fileController');
const router = express.Router();

router.get('/', fileController.listroot)
router.get('/forward', fileController.goforward);
router.get('/back', fileController.goback);
router.get('/:directory?', fileController.listfiles);

module.exports = router;




















/////////////////////////////////////////////////////////////////~

// const express = require('express');
// const router = express.Router();
// const fs = require('fs').promises;
// const path = require('path');
// const mimetypes = require('mime-types')

// const root= path.resolve('./data');

// const urlsHistory = []

// router.get('*', async (req,res) =>{
//     const decodedReq = decodeURIComponent(req.path)
//     if(req.path === '/'){
//       var directoryPath = path.join(root); //isto é o "handler" das routes
//       urlsHistory.push(directoryPath)
//     } else {
//       var lastUrl = urlsHistory.slice(-1).toString();
//       var directoryPath = path.join(lastUrl, decodedReq);
//       urlsHistory.push(directoryPath);
      
//     }

//     console.log("diretório" + directoryPath)
//     console.log("req.path: "+ decodedReq)
//     console.log("current: ", urlsHistory)
//     try{
//         const stat = await fs.stat(directoryPath);

//         if (stat.isDirectory()){
//           const items = await fs.readdir(directoryPath, {withFileTypes: true});
//           const formattedItems = items.filter(item => !item.name.startsWith('.'));
//           const checkDir = formattedItems.filter(item=> item.isDirectory());
          
//           // .map(item => {path.join(req.path, item.name);});
//           const parentPath = req.path === '/' ? '' : path.join(req.path, '..')
//           const emptyDirMsg = "Diretorio vazio!";
          
//           res.render('index', {checkDir, formattedItems:formattedItems, caminho:decodedReq, anterior:parentPath, emptyDirMsg});
//         } else {
//             const parentPath = req.path === '/' ? '' : path.join(req.path, '..')

//             const mimeTypes = mimetypes.lookup(directoryPath);
//             if(mimeTypes.startsWith('text')){
//               const content = await fs.readFile(directoryPath, 'utf-8');

//               res.render('file_view', {caminho:decodedReq, conteudo:content, tipo: 'texto', anterior:parentPath})

//             } else if (mimeTypes.startsWith('image')) {
//               // Se for uma imagem

//               const imageBuffer = await fs.readFile(directoryPath);
//               res.writeHead(200, { 'Content-Type': mimeTypes });
//               res.render('index', imageBuffer);

//               // res.render('file_view', { caminho: decodedReq, conteudo: directoryPath, tipo: 'image', anterior: parentPath});
//               // res.redirect('/imagem')
//               // res.sendFile(directoryPath);

//             } else if (mimeTypes.startsWith('video')) {
//               // Se for um vídeo
//               res.render('file_view', { caminho: decodedReq, conteudo: directoryPath, tipo: 'video', anterior: parentPath });
//             } else {
//               // Se for outro tipo de arquivo (como binários)
//               res.render('file_view', { caminho: decodedReq, conteudo: 'Este tipo de arquivo não pode ser aberto'})
//             }

//         }
        

//     } catch (error) {
//         console.error('Erro no acesso ao arquivo ou diretorio: ', error);
//         res.status(500).send('Erro no acesso ao arquivo ou diretorio.');
//     }
// });

// module.exports = router; 