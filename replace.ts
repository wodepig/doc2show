import fs from 'fs'
import path from 'path'
let matcher;
function test() {
    const  dir = 'D:\\webProjects\\doc2show\\docs\\notes'
    startDir(dir)
}
const pattern = /!\[(.*?)\]\((.*?)\)/mg;

function startDir(dir:string) {
    let paths  = fs.readdirSync(dir)
    paths.forEach(item => {

        const itemDir = path.join(dir,item)
        if ( fs.statSync(itemDir).isDirectory()){
            // console.log(item ,'是目录')
            startDir(itemDir)
        }
        if (fs.statSync(itemDir).isFile()){
            if (path.extname(itemDir) === '.md'){
                console.log(item ,'是文件')
                let fileContent = fs.readFileSync(itemDir,{encoding: 'utf-8'})
                while ((matcher = pattern.exec(fileContent)) !== null) {
                    let needRep = matcher[0]
                    // console.log(needRep)
                    let over =  needRep.replaceAll('\\','/').replace('.image','.png').replace('(img','(/img')
                    // console.log(over)
                    fileContent = fileContent.replace(needRep,over)
                    // console.log(matcher[0]);
                }
                fs.writeFileSync(itemDir,fileContent,{encoding:'utf-8'})
                // fs.renameSync(itemDir,path.join(dir,path.parse(itemDir).name + '.png'))
            }

        }
    })
}
console.log(test())
