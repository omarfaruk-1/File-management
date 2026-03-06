import * as fs from "node:fs/promises";
import path from "node:path";
import chalk from "chalk";

export async function createFolder(folderPath) {

    try {
        await fs.mkdir(folderPath,{recursive:true})
    } catch (error) {
        console.log(error);
    }
    
}

export async function createFile(filePath,content="") {
    try {
        await fs.writeFile(filePath,content,{recursive:true})
    } catch (error) {
        console.log(error)
    }
}

export async function addContent(filePath,content) {
    try {
        await fs.appendFile(filePath,content)
    } catch (error) {
        console.log(error) 
    }
}


export async function readContent(filePath) {
    try {
        const data = await fs.readFile(filePath,"utf-8")
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}


export async function deleteFile(filePath) {
    await fs.unlink(filePath)
}

export async function deleteFolder(folderPath) {
    try{
        await fs.rm(folderPath,{recursive:true});
        console.log(chalk.blackBright("Delete folder"));
    }catch(err){
        console.log(err)
    }
    
}

// deleteFolder("./omar")
export async function listItems(listPath="./") {
    try {
        const items=await fs.readdir(listPath,{withFileTypes:true});
        // console.log(items)
        return items.map((item)=>{
            return{
                name : item.name,
                type : item.isDirectory() ? "folder" : "file",
                path : path.join(import.meta.dirname, item.name)
            }
        })
    } catch (error) {
        console.log(error); 
    }
    
}

// listItems()


// createFile("./content/text/textfile.txt","Inside file I write text")

// readFile("./content/text/textfile.txt")



// createFolder("./content/text")