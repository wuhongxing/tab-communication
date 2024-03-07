# tab-communication
标签页通信

## localStorage
没有兼容性问题
```js
// 监听
window.addEventListener('storage', (e) => {
  if (e.key === 'success') {
    console.log('收到通知', e.newValue, e.oldValue)
  }
})

// 发送
localStorage.setItem('success', Math.random())
```

## broadcastChannel
有兼容性问题，`Safari` 的兼容性较差，`15.4` 之后支持
```js
// 监听
const channel = new BroadcastChannel('success')
channel.onmessage = (e) => {
  if (e.target.name === 'success') {
    console.log('收到通知', e.data)
  }
}

// 发送
const channel1 = new BroadcastChannel('success')
channel1.postMessage(Math.random())
```

## serviceWorker
有兼容性问题，兼容性较差, 11.1 之后支持

注意点: service worker 会有缓存，调试时必须将所有页签关闭后重新打开
```js
// 监听
navigator.serviceWorker.register('./sw.js').then(() => {
  console.log('sw 注册成功')
})
navigator.serviceWorker.onmessage = (e) => {
  console.log('收到通知')
  console.log(e)
}

// 发送
navigator.serviceWorker.controller.postMessage(Math.random())
```

## websocket
需要服务端进行支持
```js
// 监听
const socket = new WebSocket('ws://localhost:8000');
socket.onopen = function () {

};
socket.onmessage = async function (e) {
  console.log('接收通知', await e.data.text());
};

// 发送
const socket1 = new WebSocket('ws://localhost:8000');
socket1.send(Math.random());
```

## sessionStorage、cookie、indexDB
监听需要轮循，无法保证实时性
```js
// 监听
let last;
setInterval(() => {
  recent = sessionStorage.getItem('success')
  if (last !== recent) {
    last = recent
    console.log('收到通知', recent)
  }
}, 1000);

// 发送
sessionStorage.setItem('success', Math.random())
```
