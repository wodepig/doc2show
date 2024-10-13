const fs = require('fs');
const path = require('path');
// 从网络中下载图片到本地
async function downloadImage(imageId) {
    // 使用示例
    const url = 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/'+imageId+'.image';
    const localFilePath = path.join(__dirname, 'docs/notes/ModernWebLayout/img', imageId + '.png');
    // 确保目标目录存在
    fs.mkdirSync(path.dirname(localFilePath), { recursive: true });
    const filePath = localFilePath
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch image from ${url}, status: ${response.status}`);
        }

        const buffer = await response.arrayBuffer();
        fs.writeFile(filePath, Buffer.from(buffer), (err) => {
            if (err) {
                console.error('Error writing file', err);
            } else {
                console.log(`Image successfully downloaded to ${filePath}`);
            }
        });
    } catch (error) {
        console.error('Error downloading image:', error);
    }
}





const ids = [
    '70370e1aae6943518603934c3eac46e6~tplv-k3u1fbpfcp-zoom-1',
    '4378590856b44862b5a99a56ea84ac55~tplv-k3u1fbpfcp-zoom-1',
    '5c0127ba822b4d64bb8d7337cb36c6c6~tplv-k3u1fbpfcp-zoom-1',
    'cebbaa0a1e1046a9bcb6b285159a7b2c~tplv-k3u1fbpfcp-zoom-1',
    '4697d4708c1a43588dcb9664369358e1~tplv-k3u1fbpfcp-zoom-1',
    '28106bb1261a4d01baf8916203ffd555~tplv-k3u1fbpfcp-zoom-1',
    '81cc8e011080481e8a56d298a1ac98a9~tplv-k3u1fbpfcp-zoom-1',
    'af3030dfa54c4ba1a37fef7bc8677225~tplv-k3u1fbpfcp-zoom-1',
    'ba218064b35942cb8b7288810340a951~tplv-k3u1fbpfcp-zoom-1',
    'cc3944f7331f4f1cb87fa074bfa849c6~tplv-k3u1fbpfcp-zoom-1',
    'd86190894c934b82bd9ba9ee1cfbb632~tplv-k3u1fbpfcp-zoom-1',
    'dc2891bc68f746418016f0b6d88c8c68~tplv-k3u1fbpfcp-zoom-1',
    '1dfc472f412d4d14acbfd681dd172e32~tplv-k3u1fbpfcp-zoom-1',
    '0990112159dc40c9bb61bf62fa15b869~tplv-k3u1fbpfcp-zoom-1',
    'd21f9de878af480cb3895bc65fa6a7e0~tplv-k3u1fbpfcp-zoom-1',
    'd0b368a2fb244036879fee897cb936c9~tplv-k3u1fbpfcp-zoom-1',
    'a4ab44a435dc4162b1c23ee979cd4500~tplv-k3u1fbpfcp-zoom-1',
    '10eff151fd6b4b148fe04ac06a03359d~tplv-k3u1fbpfcp-zoom-1',
    '3bec8eb18ddd41e4ac445256f7b4f74b~tplv-k3u1fbpfcp-zoom-1',
    '462f507ef4274f40989e10d2e0517d53~tplv-k3u1fbpfcp-zoom-1',
    '2567d2f9d2e74096a28b2df44674d57c~tplv-k3u1fbpfcp-zoom-1',
    '930538e34f7545d09a1739b67286f50f~tplv-k3u1fbpfcp-zoom-1',
    'baa59f94d8b748e3a604c0072ff0336e~tplv-k3u1fbpfcp-zoom-1',
    'e4145414d8504815b4de4d00bedc2d50~tplv-k3u1fbpfcp-zoom-1',
    '3e162a18c53b4cbe9ef8a8ed965443dd~tplv-k3u1fbpfcp-zoom-1',
    'd80930e6e2a54a15a4b7308890b9e6b4~tplv-k3u1fbpfcp-zoom-1',
    '3f16ef6be429487a972fa41b9a2a3b50~tplv-k3u1fbpfcp-zoom-1',
    '6b3f8fde8e8e46889eae58fe90e78045~tplv-k3u1fbpfcp-zoom-1',
    '257e799c91704c79a254820a8fc2809e~tplv-k3u1fbpfcp-zoom-1',
    '385e45217ac74f3db917ab12f892ceb9~tplv-k3u1fbpfcp-zoom-1',
    '6a8899d60fb547bfac5610fb1fe8fa94~tplv-k3u1fbpfcp-zoom-1',
    '57d642bbcc9a419e9b46a02578639404~tplv-k3u1fbpfcp-zoom-1',
    'f2ae56cb1f094ce9aa2fdc00702d637c~tplv-k3u1fbpfcp-zoom-1',
    '0aea3e5ca7ac4c7884b7065a07b7e0cd~tplv-k3u1fbpfcp-zoom-1',
    '09cd832e91754c4796acceee1ccbf2d2~tplv-k3u1fbpfcp-zoom-1',
    '49d2cdbfd9744314bdcda84de2cf784d~tplv-k3u1fbpfcp-zoom-1',
    '067ee94236174271a8a43b1a9ce3d048~tplv-k3u1fbpfcp-zoom-1',
    'ee52974e06a842f492e11296d3ae2d49~tplv-k3u1fbpfcp-zoom-1',
    'f2c6b48a214741d48c9af60224abd9ba~tplv-k3u1fbpfcp-zoom-1',
    '0ba60fdbccf74602b673d911cedd6b0f~tplv-k3u1fbpfcp-zoom-1',
    '534b72f30b5e4b2faafcbe0ce43b9729~tplv-k3u1fbpfcp-zoom-1',
    '4b1a8aba8ebf4a4392173e8eec4dd135~tplv-k3u1fbpfcp-zoom-1',
    '8d0b76ec9339430fa682b04df07c8b50~tplv-k3u1fbpfcp-zoom-1',
    '86c4daabe07142919800d064ba390890~tplv-k3u1fbpfcp-zoom-1',
    '664a411fd53c438e8aeec82bfb44cb39~tplv-k3u1fbpfcp-zoom-1',
    '930d4d2c38d94c2ebf890ce3b3ee04c2~tplv-k3u1fbpfcp-zoom-1',
    '6172134e4197409ba011d0ac1c36b0b2~tplv-k3u1fbpfcp-zoom-1',
    'c117aba875ab4ba3882fa0513036ddbc~tplv-k3u1fbpfcp-zoom-1',
    'fe2c27a7415e4d3e9f91f9a1c57552d1~tplv-k3u1fbpfcp-zoom-1',
    '30f5567eb681461496b577dc0e3aa68b~tplv-k3u1fbpfcp-zoom-1',
    '78bf0d20d9f34e86a26fd0df7e80b591~tplv-k3u1fbpfcp-zoom-1',
    'db9a95d633764efaa3d0c93ea4e26a88~tplv-k3u1fbpfcp-zoom-1',
    '34cb5e3b6f4e4c168eb428bb482e6a29~tplv-k3u1fbpfcp-zoom-1',
    '41dde3c6c6cc48ae984eb00016d85976~tplv-k3u1fbpfcp-zoom-1',
    'cea8cad3360445bd95a54af7e2d011ca~tplv-k3u1fbpfcp-zoom-1',
    'e666b5ed917c47189f9815c02d0f3950~tplv-k3u1fbpfcp-zoom-1',
    'ed25203aec9044bab5962863af6033cf~tplv-k3u1fbpfcp-zoom-1',
    '8520402c0a9d45749c76a20fc8ce791e~tplv-k3u1fbpfcp-zoom-1',
    'a049e0660b06465a8d50e8badaa5d0b2~tplv-k3u1fbpfcp-zoom-1',
    'ed9e41f698734e13ab414b1d9abce2e9~tplv-k3u1fbpfcp-zoom-1',
    'f32211f443d64fb6ae129e7fdb2f88bc~tplv-k3u1fbpfcp-zoom-1',

]
async function ddd (){
    for (let id of ids) {
        await downloadImage(id);
    }
}

ddd ()
