# file-zip
The file folder compression, decompression of the compressed package

## Installation:

```sh
npm install file-zip --save
```
## Usage:
```javascript
var zip = require('file-zip');
/*compressed folder*/
zip.zipFolder(['./folder1','./folder2'],'out.zip',function(err){
    if(err){
        console.log('zip error',err)
    }else{
        console.log('zip success');
    }
})
/*compressed file*/
zip.zipFile(['./file1.txt','./file2.txt'],'out.zip',function(err){
    if(err){
        console.log('zip error',err)
    }else{
        console.log('zip success');
    }
})
/*decompression*/
zip.unzip('out.zip','dist',function(err){
    if(err){
            console.log('unzip error',err)
        }else{
            console.log('unzip success');
        }
})
```

## API:
__zipFolder(path,name,callback)__
* `path` string or array, compressed folder path
* `name` string,output compressed file path
* `callback` function,callback function after completion of the event

__zipFile(path,name,callback)__
* `path` string or array, compressed file path
* `name` string,output compressed file path
* `callback` function,callback function after completion of the event

__unzip(name,dist,callback)__
* `name` string, file path to be unzipped
* `dist` string,output file path
* `callback` function,callback function after completion of the event



