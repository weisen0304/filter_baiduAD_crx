window.onload = function() {
  filterAD();
};
// 监听插入DOM
document.addEventListener('DOMNodeInserted', function(e) {
  if (e.target.id === '1') {
    e.target.style.display = 'none';
    console.log(`正在过滤动态结果型广告...`);
  }
  return;
});
(function() {
  console.log('开始监听请求');
  var proxied = window.XMLHttpRequest.prototype.send;
  window.XMLHttpRequest.prototype.send = function() {
    //Here is where you can add any code to process the request.
    //If you want to pass the Ajax request object, pass the 'pointer' below
    var _this = this;
    var intervalId = window.setInterval(function() {
      if (_this.readyState != 4) {
        return;
      }
      try {
        if (_this.responseText.includes('content_script')) {
          filterAD();
        }
      } catch (e) {
        console.log('报错=>', e);
        clearInterval(intervalId);
      }
      //Here is where you can add any code to process the response.
      //If you want to pass the Ajax request object, pass the 'pointer' below
      clearInterval(intervalId);
    }, 1); //I found a delay of 1 to be sufficient, modify it as you need.
    return proxied.apply(this, [].slice.call(arguments));
  };
})();

function filterAD() {
  console.log('百度一下，查询过滤广告');
  var fadDom = document.querySelector('.EC_ppim_new_gap_bottom');
  var contentRight = document.getElementById('content_right');
  var fadClass = '';

  // 过滤插入型广告
  if (fadDom || contentRight) {
    if (fadDom) {
      var fadClassList = fadDom.classList;

      if (fadClassList.length) {
        fadClass = '.' + fadClassList[0];
      }
    } else {
      if (contentRight.querySelector('.ec_tuiguang_link')) {
        fadClass = '.' + contentRight.firstElementChild.classList[0];
      }
    }

    if (fadClass) {
      var adDoms = document.querySelectorAll(fadClass) || [];

      for (var key in adDoms) {
        if (adDoms[key] instanceof Element) {
          adDoms[key].style.display = 'none';
        }
      }

      console.log(`当前已过滤插入型广告数量为${adDoms.length}`);
    }
  }

  // 过滤推广型广告
  var crtd = document.querySelector('#content_right > table > tbody > tr > td');
  if (crtd.lastElementChild.className === '') {
    crtd.lastElementChild.style.display = 'none';
    console.log(`当前已过滤推广型广告数量为1`);
  }

  // 过滤品牌型广告
  var lr = document.querySelector('#content_left');
  if (lr.firstElementChild.className === '' && lr.firstElementChild.nodeName === 'DIV') {
    var lrlsDoms = document.querySelector('.c-border.ec-pl-container').childNodes;
    if (lrlsDoms) {
      for (var key in lrlsDoms) {
        if (lrlsDoms[key] instanceof Element) {
          document.querySelector('.ec-pc_brand_tip-sign').style.display = 'none';
          document.querySelector('.c-icon.ec-pc_brand_tip-baozhang-icon').style.display = 'none';
          document.querySelector('.ec-pc_brand_tip-devider').style.display = 'none';
          document.querySelector('.ec-pc_brand_tip-text').style.display = 'none';
        }
      }
    }
  }

  // 过滤结果广告
  var resultDoms = document.querySelectorAll('#\\31 ');
  if (resultDoms) {
    for (var key in resultDoms) {
      if (resultDoms[key] instanceof Element) {
        if (resultDoms[key].querySelector('.ec_tuiguang_pplink')) {
          resultDoms[key].style.display = 'none';
        }
      }
    }
    console.log(`当前已过滤结果型广告数量为${resultDoms.length}`);
  }
}
