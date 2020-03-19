const parser = require('mhtml-parser');
parser.loadFile(
  __dirname + '/game.mhtml',
  {
    charset: 'utf-8'
  },
  function(err, data) {
    if (err) throw err;
    console.log(data);
  }
);
