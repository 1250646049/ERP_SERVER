var sql = require('mssql');

// sql 配置文件
var config = {
  user: 'sa',
  password: 'Cfl2828',
  server: '192.168.0.252',
  database: 'Lihuaiyuan',
  requestTimeout: -1
}


// 返回连接对象

async function connect_sql() {

  try {
    await sql.connect(config)
    return new sql.Request()

  } catch (err) {
    sql.close()
    console.log(err)
  }
  return null;


}

 module.exports=connect_sql()
