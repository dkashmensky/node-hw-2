const fs = require('fs');

module.exports.getNextId = dataArray => {
  if(dataArray.length) {
    const sortedArray = dataArray.sort((a, b) => b.id - a.id);
    return sortedArray[0].id + 1;
  }
  
  return 1;
};

module.exports.getFile = path => {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
};

module.exports.putFile = (data, path) => {
  fs.writeFileSync(path, JSON.stringify(data), 'utf8');
};
