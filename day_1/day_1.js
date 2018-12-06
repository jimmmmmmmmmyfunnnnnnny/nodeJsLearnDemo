///////////////////////////////
// Demo1


// var http = require('http');

// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type':'text/plain'});

//     res.end("is that true");
// }).listen(8888);

// console.log('Sever runing at home');

///////////////////////////////
// Demo2


// var express = require('express');
// var app = express();

// app.get('/', function(req, res){
//     res.send('hello world iii');
// });

// app.listen(3000, function(){
//     console.log('app is listening at port 3000');
// });

/////////////////
// 浏览器传入参数 使用utility转换成md5
//

// var express = require('express');
// var utility = require('utility');

// var app = express();

// app.get('/', function(req, res){
//     var q = req.query.q;
//     let a = typeof(q);
//     if (q!== undefined && typeof(q)=="string"){
//         console.log("q =",q)
//         var md5 = utility.md5(q);
//         res.send(md5);
//     }else{
//         console.log("unknow erro");
//     }
// });

// app.listen(8888, function(req, res){
//     console.log('app is running at port 8888');
// });

///////////////////////////////
//爬虫
var express = require('express');
var superagent =  require('superagent');
var cheerio = require('cheerio')

var app = express();
app.get('/',function(req,res,next){
    superagent.get('https://cnodejs.org/').end(function(err, sres){
        if(err){
            return next(err);
        }

        var $ = cheerio.load(sres.text);
        var items = [];
        $('#topic_list .topic_title').each(function(idx, element){
            var $element = $(element);
            items.push({
                title:$element.attr('title'),
                href:$element.attr('href')
            });
            
        });
        res.send(items);
    });
});

app.listen(8888, function(req, res){
    console.log('app is running at port 8888');
});