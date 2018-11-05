/*
  接受客户端发送的消息，转发给所有客户端
 */
const Messages = require('../models/messages');
module.exports = function (server) {
  // 得到IO对象
  const io = require('socket.io')(server)
  // 监视连接(当有一个客户连接上时回调)
  // 服务器对象IO
  io.on('connection', function (socket) {
    console.log('soketio connected');
    //socket代表当前连接上的客户端对象
    // 绑定sendMsg监听, 接收客户端发送的消息
    socket.on('sendMsg', async function (data) {
      console.log('服务器接收到浏览器的消息', data)
      //定义chat_id
      const chat_id = [data.from, data.to].sort().join('-');
      //将客户端发送的消息保存在数据库中
      const result = await Messages.create({from: data.from, to: data.to, content: data.content, chat_id})
      // 向所有客户端发送消息(名称, 数据)
      io.emit('receiveMsg', {from: result.from, to: result.to, content: result.content, chat_id: result.chat_id, create_time: result.create_time, read: result.read});
      // 向当前连接上客户端发送消息(名称, 数据)
      // socket.emit('receiveMsg', data.name + '_' + data.date);
      console.log('服务器向浏览器发送消息', result)
    })
  })
}