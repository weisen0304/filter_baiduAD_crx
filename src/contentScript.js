window.onload = function() {
  filterAD();
};

document.querySelector('#su').addEventListener('click', function() {
  console.log('百度一下，查询过滤广告');
  filterAD();
});

function filterAD() {
  setTimeout(() => {
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
        console.log(fadClass);
        var adDoms = document.querySelectorAll(fadClass) || [];

        for (var key in adDoms) {
          if (adDoms[key] instanceof Element) {
            adDoms[key].style.display = 'none';
          }
        }

        console.log(`当前已过滤插入型广告数量为${adDoms.length}`);
      }
    }
  }, 1000);

  setTimeout(() => {
    // 过滤推广型广告
    var crtd = document.querySelector('#content_right > table > tbody > tr > td');
    if (crtd.lastElementChild.className === '') {
      crtd.lastElementChild.style.display = 'none';
      console.log(`当前已过滤推广型广告数量为1`);
    }

    // 过滤品牌型广告
    var lr = document.querySelector('#content_left');
    if (lr.firstElementChild.className === '') {
      var lrlsDoms = document.querySelector('.c-border.ec-pl-container').childNodes;
      if (lrlsDoms) {
        for (var key in lrlsDoms) {
          if (lrlsDoms[key] instanceof Element && key == '0') {
            lrlsDoms[key].querySelector('.ec-pc_brand_tip-sign').style.display = 'none';
            lrlsDoms[key].querySelector('.c-icon.ec-pc_brand_tip-baozhang-icon').style.display = 'none';
            lrlsDoms[key].querySelector('.ec-pc_brand_tip-devider').style.display = 'none';
            lrlsDoms[key].querySelector('.ec-pc_brand_tip-text').style.display = 'none';
          } else if (lrlsDoms[key] instanceof Element) {
            console.log(lrlsDoms[key]);
            lrlsDoms[key].style.display = 'none';
          }
        }
      }
    }
  }, 2000);

  setInterval(() => {
    // 过滤结果广告
    var resultDoms = document.querySelectorAll('#\\31 ');
    if (resultDoms) {
      for (var key in resultDoms) {
        if (resultDoms[key] instanceof Element) {
          resultDoms[key].style.display = 'none';
        }
      }
      console.log(`当前已过滤结果型广告数量为${resultDoms.length}`);
    }
  }, 2000);
}
