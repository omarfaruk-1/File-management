import * as readline from "node:readline/promises";
import { exit, stdin,stdout } from "node:process";
import chalk from "chalk";
import { createFolder,createFile,addContent,readContent, deleteFile, deleteFolder,listItems } from "./fileProject.js";
import { readFile } from "node:fs";


const rl = readline.createInterface({
    input: stdin,
    output: stdout
});


async function menu(){
    console.log(chalk.blue.bold(`📂 FILE SYSTEM`));

    const option =[
        "Create folder",
        "Create file",
        "Write File",
        "Read file",
        "Delete file",
        "Delete folder",
        "List Items",
        "Exit"
    ]


    option.forEach((opt,i)=>console.log(chalk.yellow(`${i+ 1}`) + chalk.white(` ${opt}`)));
    
    
    const ans = await rl.question(chalk.cyan("\n Select option: "))
    // console.log(ans)


    switch(ans){
        case "1":
            const folderPath = await rl.question(chalk.blue("Folder path: "));
            createFolder(folderPath);
            console.log(chalk.blackBright("Folder created"));
            break;

        case "2":
            const filePath = await rl.question(chalk.blue("File path: "));
            const initialContent = await rl.question(chalk.blackBright("Initial content"));
            await createFile(filePath,initialContent)
            console.log(chalk.blackBright("File created"));
            break;

        case "3":
            const appendFilePath = await rl.question(chalk.blue("File path: "));
            const content = await rl.question(chalk.blackBright("content"));
            await addContent(appendFilePath,content);
            console.log(chalk.blackBright("Content added"));
            break;

        case "4":
            const readFilePath = await rl.question(chalk.blue("File path: "));
            // const readContent = await rl.question(chalk.blackBright("content"));
            const text=await readContent(readFilePath);
            console.log(chalk.blackBright("File read successfully"));
            break;

        case "5":
            const deleteFilePath = await rl.question(chalk.blue("File path: "));
            // const content = await rl.question(chalk.blackBright(" content"));
            await deleteFile(deleteFilePath);
            console.log(chalk.blackBright("Delete file"));
            break;

        case "6":
            const deleteFolderPath = await rl.question(chalk.blue("Folder path: "));
            // const content = await rl.question(chalk.blackBright(" content"));
            await deleteFolder(deleteFolderPath);
            break;

        case "7":
            const listItem = await rl.question(chalk.blue("List items path: "));
            const items = await listItems(listItem || "./");
            items.forEach(item=>{
                const icon = item.type === "folder" ? "📂" : "🗄️";
                console.log(`${icon} ${chalk.yellow(item.name)}`)
            })
            break;
        case "8":
            await rl.close();
            return;
        
    }
    await rl.question(chalk.green("\nPress enter to continue.........."))
    menu()
}


menu()