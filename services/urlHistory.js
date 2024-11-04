class UrlHistory {
    constructor() {
        this.history = ['data'];

        //começa em -1 porque o array é inicializado, vazio. 
        //À medida que se navega, o index é incrementado estabelecendo-se, sempre, no dir mais recentemente adicionado.
        this.currentIndex = 0;        
    }

    addPath(url){
        console.log(' ') //para separar processos com o fim de dar debug
    

        //adicionar um caminho, depois, de se ter retrocedido. Apaga diretorios futuros antes navegados
        if (this.currentIndex < this.history.length - 1) {

            //substitui registo de historico por um atualizado sem links futuros
            this.history = this.history.slice(0, this.currentIndex + 1)
            
            let lastUrl = this.history.slice(-1).toString();
            let urlToPush = lastUrl.concat(url) 

            this.history.push(urlToPush)
            this.currentIndex++

            // console.log("Disparou addPath if " + this.currentIndex)
            console.log(this.history)

        //se já houver 1 link no historico, juntar url novo ao parent para criar caminho para subdiretorio
        } else {
            let lastUrl = this.history.slice(-1).toString();
            let urlToPush = lastUrl.concat(url) 

            this.history.push(urlToPush)
            this.currentIndex++

            // console.log("Disparou else if: " + this.currentIndex)
            console.log("Historico: ", this.history)
        }
    }

    goBack(){
        if (this.currentIndex > 0) {
            this.currentIndex--;

            // console.log("Disparou back: " + this.currentIndex)
            console.log(this.history)

        } else return null
    }
    
    goForward(){
        if (this.currentIndex < this.history.length -1) {
            this.currentIndex++;

            // console.log("Disparou forward: " + this.currentIndex)
            console.log(this.history)

        } else return null
    }

    getCurrentPath() {
        if (this.currentIndex >= 0 && this.currentIndex < this.history.length) {
            const dirAtual = this.history[this.currentIndex].toString();

            // console.log("CurrentPath: " + dirAtual + " " + this.currentIndex)

          return dirAtual

        } else {
            // console.log("disparou else currentPath")
            return '/';
        }
    }

    getRoot(){
        this.currentIndex = 0;
    }

    //Quando se elimina um diretorio, apaga o ultimo item do array 'history' e decresce um no index, para ficar no mesmo dir (o parent)
    pathDestroyed(){
        this.history.pop()
        this.currentIndex--;
    }

}

module.exports = UrlHistory