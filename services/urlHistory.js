const path = require('path');

class UrlHistory {
    constructor() {
        this.history = ['data'];

        //começa em -1 porque o array é inicializado, vazio. 
        //À medida que se navega, o index é incrementado estabelecendo-se, sempre, no dir mais recentemente adicionado.
        this.currentIndex = 0;        
    }

    addPath(url){
        //adicionar um caminho, depois, de se ter retrocedido. Apaga diretorios futuros antes navegados
        if (this.currentIndex < this.history.length - 1) {
            this.history.slice(0, this.currentIndex + 1)

        //se já houver 1 link no historico, juntar url novo ao parent para criar caminho para subdiretorio
        } else if(this.currentIndex > 0){
            let lastUrl = this.history.slice(-1).toString();
            let urlToPush = path.join(lastUrl, url)

            this.history.push(urlToPush)
            this.currentIndex++

            console.log(this.history)
            console.log("Disparou else if: " + this.currentIndex)

        //usado para iniciar o primeiro url
        } else {
            // let lastUrl = this.history.slice(-1).toString();
            // let urlToPush = lastUrl.concat(url)

            this.history.push(url)
            this.currentIndex++
            

            console.log(this.history)
            console.log("Disparou else: " + this.currentIndex)
        }
    }

    goBack(){
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return this.history[this.currentIndex].toString()
        } else return null
    }
    
    goForward(){
        if (this.currentIndex < this.history.length -1) {
            this.currentIndex++;
            return this.history[this.currentIndex].toString()
        } else return null
    }

    getCurrentPath() {
        if (this.currentIndex >= 0 && this.currentIndex < this.history.length) {
          return this.history[this.currentIndex].toString();
        } else {
            console.log("disparou else currentPath")
            return '/';
        }
    }
}

module.exports = UrlHistory