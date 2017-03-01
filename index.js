/**
 * Created by chenqifeng on 2017/3/1.
 */

var fs = require("fs"),
    filesTree = require('files-tree'),
    zip = require("node-native-zip"),
    decompress = require('decompress'),
    decompressUnzip = require('decompress-unzip');

/**
 * 压缩指定路径下的所有文件及文件夹
 * @param paths string or array 指定的压缩路径，可以是多个
 * @param name 压缩后的文件名及文件路径
 * @param callback 压缩成功后的回调函数
 */
exports.zipFolder = function (paths, name, callback) {
    paths = paramToArray(paths);
    name = name || Date.now() + '.zip';
    callback = callback || function () {
        };
    var list = [], files = [], archive = new zip();
    paths.forEach(function (i) {
        list = list.concat(filesTree.allFile(i));
    });
    list.forEach(function (item) {
        item.file && files.push({path: item.path, name: item.path.replace(/^(\.\/|\.|\/)/, '')})
    });

    archive.addFiles(files, function (err) {
        if (err) {
            callback(err)
        } else {
            var buff = archive.toBuffer();
            fs.writeFile(name, buff, callback);
        }
    });

};


/**
 * 压缩指定的文件
 * @param files string or array 指定的文件，可以是多个
 * @param name 压缩后的文件名及文件路径
 * @param callback 压缩成功后的回调函数
 */
exports.zipFile = function (files, name, callback) {
    files = paramToArray(files);
    name = name || Date.now() + '.zip';
    callback = callback || function () {
        };
    var state, i, error, list = [], archive = new zip();
    for (i = 0; i < files.length; i++) {
        state = fs.statSync(files[i]);
        if (state.isDirectory()) {
            error = new Error(files[i] + ' is a folder,is not a file');
            callback(error);
            break;
        } else {
            list.push({
                name: files[i].split('/')[files[i].split('/').length - 1],
                path: files[i]
            })
        }
    }
    if (error) {
        return;
    }
    archive.addFiles(list, function (err) {
        if (err) {
            callback(err)
        } else {
            var buff = archive.toBuffer();
            fs.writeFile(name, buff, callback);
        }
    });
};


exports.unzip = function (name, folderPath,callback) {
    folderPath = folderPath || './'
    callback = callback || function(){};
    decompress(name, folderPath, {
        plugins: [
            decompressUnzip()
        ]
    }).then(function(data){
        callback(null,data);
    }).catch(function(e){
        callback(e);
    })
};




function paramToArray(param) {
    if (Array.isArray(param)) {
        return param
    } else if (typeof param === 'string') {
        return [param]
    } else {
        return [];
    }
}