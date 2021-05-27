"use strict";

var sql = require('mssql'); // sql 配置文件


var config = {
  user: 'sa',
  password: 'Cfl2828',
  server: '10.86.0.252',
  database: 'U_2012'
}; // 返回连接对象

function connect_sql() {
  return regeneratorRuntime.async(function connect_sql$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          return _context.abrupt("return", new sql.Request());

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 9:
          return _context.abrupt("return", null);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

module.exports = connect_sql();