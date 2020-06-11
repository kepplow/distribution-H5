var WBT = function (obj) {
  /*
    websocket接口地址
    1、http请求还是https请求 前缀不一样
    2、ip地址host
    3、端口号
  */

  const config = obj || {};
  const protocol = (window.location.protocol === "https") ? 'wss://' : 'ws://';
  const host = window.location.host;
  const port = '8087';

  // 接口地址url
  this.url = config.ip || protocol + host + port;
  // socket对象
  this.socket;
  // 心跳状态，为false时不能操作 等待重连
  this.isHeartflag = false;
  // 重连状态，避免不间断的重连操作
  this.isReconnect = false;
  // 作为get获取数据的回调对象存储
  this.messageList = {};
  // 初始化websocket连接
  this.initWs()
}

// 初始化
WBT.prototype.initWs = function () {
  window.WebSocket = window.WebSocket || window.MozWebSocket;
  // 检测浏览器支持
  if (!window.WebSocket) {
    console.error('错误: 浏览器不支持websocket');
    return;
  }
  var that = this;
  this.socket = new WebSocket(this.url, "default-protocol"); // 创建连接，并注册响应函数

  this.socket.onopen = function (e) {
    console.log('连接成功');
  };

  this.socket.onmessage = function (e) {
    // 解密消息
    const message = JSON.parse(dec(e));
    const code = message.code;
    // 执行回调
    if (that.messageList[code]) {
      that.messageList[code](message);
    } else {
      console.log("找到相应函数(code：" + code + ")")
    }
  };
  this.socket.onclose = function (e) {
    console.log('连接已关闭', e)
    that.socket = null;
  }
  this.socket.onerror = function (e) {
    console.log("异常警告：", e);
  }
  return this;
}

// 发送消息后回调或返回promise
WBT.prototype.sendMsg = function (obj, callback) {
  const code = obj.code;
  let that = this;

  // 返回一个promise
  return new Promise((resolve, reject) => {
    // 存储事件
    this.messageList[code] = (message => {
      try {
        if (callback) { // 如果有回调就执行
          callback(message);
        }
        resolve(message);
      } catch (error) {
        reject(error);
      }
    });
    console.log('事件已储存', this);
    waitForSocketConnection(that.socket, function () {
      console.log("message sent!!!");
      that.socket.send(enc(JSON.stringify(obj)));
    });

  });
}

/**
 * 加密
 */
function enc(str) {
  let c = String.fromCharCode(str.charCodeAt(0) + str.length);
  for (let i = 1; i < str.length; i++) {
    c += String.fromCharCode(str.charCodeAt(i) + str.charCodeAt(i - 1));
  }
  return stringToHex(c);
}
/**
 * 字符串转化为十六进制
 * @param str
 * @returns {string}
 */
function stringToHex(str) {
  let val = "";
  for (let i = 0; i < str.length; i++) {
    if (val == "") val = str.charCodeAt(i).toString(16);
    else val += "," + str.charCodeAt(i).toString(16);
  }
  return val;
}
/**
 * 解密
 */
function dec(hex) {
  let str = hexToString(hex);
  let c = String.fromCharCode(str.charCodeAt(0) - str.length);
  for (let i = 1; i < str.length; i++) {
    c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}
/**
 * 十六进制转化为字符串
 * @param str
 * @returns {string}
 */
function hexToString(str) {
  let val = "";
  let arr = str.data.split(",");
  for (let i = 0; i < arr.length; i++) {
    val += String.fromCharCode(parseInt(arr[i], 16));
  }
  return val;
}

function waitForSocketConnection(socket, callback) {
  setTimeout(
    function () {
      if (socket.readyState === 1) {
        console.log("Connection is made")
        if (callback != null) {
          callback();
        }
        return;

      } else {
        console.log("wait for connection...")
        waitForSocketConnection(socket, callback);
      }

    }, 5); // wait 5 milisecond for the connection...
}
export default WBT;
