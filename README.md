# SVCloudUI  
## Overview
  
**SVCloudUI** is a webapp built with Express.js that scans a filesystem up from a root directory to their subsequent subdirectories and lists them.  

It allows the user to easily list and navigate through directories in the remote filesystem from a root directory, and as well upload and download, and access files anytime.  

I built this project to serve my home linux server, and make the interaction with it more user friendly by creating an UI that everyone could understand, and with that, able people unfamiliar with Linux and POSIX commands, to interact with the files within the server, more easily.

---

## Features  
### With this project, you can:  
- **Navigate through directories**
- **Create directories**
- **Upload and Download files**
- **Delete files and directories**

---

## Built with  
- **Javascript**
- **Node.js**
- **Express.js**
- **Multer**
- **Bootstrap**

---

# WARNING  
This project was built for internal network use only.  
The app may not be suitable for public use purposes.

---

# Instalation and Configuration  
## Prerequisites
* Node.js (v20 or higher)

## Steps

1. Clone the repository:  
```
git clone https://github.com/Fulipe/SVCloudUI.git
```
2. Install the required dependencies:  
```
npm install
```
3. Go to the `/SVCloudUI` directory  
```
cd SVCloudUI
```  
4. Create a `.env` file to config the root directory and app listening port
```
touch .env
```  
5. Setup the root directory and listening port on the `.env` file
```
nano .env
```  
```
root = "<root_directory_absolute_path>"
port = <e.g: 3000>
```  
6. Start the application 
```
node mainApp.js
```  
7. Access `<local_ip_of_the_server_hosting_the_app>:<port>` on your browser  

---

# Usage
1. **Navigating through folders**  
   * Always use the folder tree interface in the nav bar to navigate through the opened directory path
   * Click on "Go ->" button to open the desired directory
   * You can navigate immediately to the root folder, by clicking in "SVCloudUI" in the top left corner  

2. **Creating Folders**
   * Create new folders within a folder, by clicking in the button "Create"
   * Give a name to the new folder and click in "Create"  

3. **Uploading Files**
   * Upload a file to the current directory by clicking in the "Upload" button
   * Select the file from your local machine you want to upload to the server  
     *File names will not be encoded in UTF-8*  

4. **Download Files**  
   * Click on the Download Button on the file you want to save locally

5. **Deleting Folders and Files**
   * Click in the red delete button to delete the item

6. **Editing Folders and Files**  
   * Click in the grey pencil button to change the name of the item

---
