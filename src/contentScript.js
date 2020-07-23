document.addEventListener('DOMContentLoaded', function () {
  // injectCustomHTML();
  injectCustomJS();
});

function injectCustomHTML() {
  // $("html").attr("lang", "zh-CN");
  // $("head").html('<head><meta charset="utf-8"><link rel="shortcut icon" href="" /><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>LogList</title></head>');

  // $("[rel='shortcut icon']").attr("href", chrome.extension.getURL("images/icon_16px.png"));
}

function injectCustomJS(jsPath) {
  jsPath = jsPath || 'inject.js';
  var temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function () {
      this.remove();//执行完移除
  };
  document.body.appendChild(temp);
}