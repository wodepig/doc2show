import fs from 'fs'
import path from 'path'
import stream from 'stream'
let matcher;
let isTest = false
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


// 获取路径里面的md文件,转换图片地址到public下面
function replace2localPath(dir:string) {
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
// 获取路径里面的md文件,下载图片地址到public下面
async function down2localPath(dir:string) {
    let paths  = fs.readdirSync(dir)
    for (const item of paths) {
        const itemDir = path.join(dir,item)
        if ( fs.statSync(itemDir).isDirectory()){
           await down2localPath(itemDir)
        }
        if (fs.statSync(itemDir).isFile()){
            if (path.extname(itemDir) === '.md'){
                // console.log(item ,'是文件')
                let fileContent = fs.readFileSync(itemDir,{encoding: 'utf-8'})
                while ((matcher = pattern.exec(fileContent)) !== null) {


                    let needRep = matcher[2]
                    if (needRep.startsWith('http')){
                        console.log(needRep)
                        // const fileName =  down2Path(needRep,'D:\\webProjects\\doc2show\\docs\\notes\\ModernWebLayout\\img')
                        // fileContent = fileContent.replace(needRep,'./img/' + fileName)
                    }


                    if (isTest){
                        break
                    }

                }
                // fs.writeFileSync(itemDir,fileContent,{encoding:'utf-8'})
            }
    }

}}
     // down2localPath('D:\\webProjects\\doc2show\\docs\\notes\\ModernWebLayout');

 function down2Path(url:string, pathDir:string) {
    const fileName = path.parse(url).name + '.png' ;
    fetch(url).then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const dest = fs.createWriteStream(path.join(pathDir,fileName));
        if (!res.body){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const pipeline = stream.pipeline(res.body, dest, (err) => {
            if (err) {
                console.error('Pipeline failed.', err);
            } else {
                console.log('Image downloaded successfully');
            }
        });
    })
 return fileName

}
  const fileName = down2Path('https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8bf461b8f46743b3a42e2ef4811f90e6~tplv-k3u1fbpfcp-zoom-1.image','./')
console.log(fileName)