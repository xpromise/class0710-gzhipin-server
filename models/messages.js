//引入mongoose模块
const mongoose = require('mongoose');
//获取Schema
const Schema = mongoose.Schema;
//创建约束对象
const messagesSchema = new Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    default: Date.now
  },
  chat_id: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
})
//创建模型对象
const Messages = mongoose.model('Messages', messagesSchema);

//暴露出去
module.exports = Messages;