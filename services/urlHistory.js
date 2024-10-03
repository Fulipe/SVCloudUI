class UrlHistory {
    constructor() {
        this.history = [];

        //começa em -1 porque o array é inicializado, vazio. 
        //À medida que se navega, o index é incrementado estabelecendo-se, sempre, no dir mais recentemente adicionado.
        this.currentIndex = -1;        
    }

    addPath(path){
        if (this.currentIndex < this.history.length - 1) {
            this.history.slice(0, this.currentIndex + 1)
        }    
        this.history.push(path)
        this.currentIndex++
    }

    //goBack
    
    //goForward

    //getCurrentIndex
}