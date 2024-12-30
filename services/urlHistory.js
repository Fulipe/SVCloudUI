class UrlHistory {
    constructor() {
        this.history = [];

        //the counter starts in -1 because of the array being initialized empty
        //the counter increases by navigating through directories, and always represents the latest accessed directory
        this.currentIndex = -1;        
    }

    //Param takes latest accessed path, and sends to the history array
    addPath(url){

        console.log("URL PRE-PUSH: ", url)
        
        this.history.push(url)
        this.currentIndex ++;

        console.log(this.history)
    }

    //Gets latest path stored
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

    //When deleting an item, deletes the last appended item to the array, and decreases the count so it stays in the same directory (parent of deleted dir)
    pathDestroyed(){
        this.history.pop()
        this.currentIndex--;
    }

}

module.exports = UrlHistory