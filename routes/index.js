var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function(app){
  require('./prize')(app)
  require('./member')(app)
  require('./wx')(app)
  require('./annual')(app)
  require('./oper_annual_member')(app)
}
