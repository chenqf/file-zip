/**
 * Created by chenqifeng on 2017/3/1.
 */

var filesZip = require('../index');

filesZip.zipFolder(['./t1','./t2'],'t.zip',function(err){
    if(!err){
        console.log('zip success')
    }
});