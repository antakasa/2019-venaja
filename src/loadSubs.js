var fs = require('fs'),
  path = require('path');

const fsPromises = require('fs').promises;

function fromDir(startPath, filter) {
  //console.log('Starting from dir '+startPath+'/');

  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return;
  }

  const subsPaths = [];
  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      subsPaths.push(filename);
    }
  }
  return subsPaths;
}

const subs = fromDir('./public/uploads', '.vtt');

let subsJSON = {};

const func = filenames => {
  return Promise.all(
    filenames.map(f => fsPromises.readFile('./' + f, 'utf-8')),
  );
};

func(subs)
  .then(res => {
    console.log('all read', res.length);
    let data = res.map((e, i) => {
      return {[subs[i]]: res[i]};
    });

    console.log(data);
  })
  .catch(console.log);
