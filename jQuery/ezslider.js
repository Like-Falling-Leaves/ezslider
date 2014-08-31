module.exports = {
  init: initSlider,
  set: switchItem,
  get: getCurrentItem
};

function addDefaultStyles() {
  return ezStyles.create({
    id: 'ezslider-styles',
    styles: [
      ['.slider', 'overflow: hidden; white-space: nowrap; position: relative;'],
      ['.item', 'display: inline-block; width: 100%; vertical-align: top; white-space: normal;']
    ]
  });
}

var $ = window.jQuery || window.$;
function addPlugin() {
  $(function () {
    $.fn.ezslider = function (options) {
      var ret = this;
      var args = arguments;
      this.each(function () {
        var data = $(this).data('ezslider');
        if (data) ret = processCommand($(this), data.options, args);
        else if (typeof (options) == 'string') throw new Error('ezslider not initialized');
        else {
          $(this).data('ezslider', {viewport: $(this), options: options});
          initSlider($(this), options);
        }
      });
      return ret;
    };
  });

  function processCommand(viewport, options, args) {
    if (args[0] == 'set') return switchItem(viewport, options, args[1]);
    else if (args[0] == 'get') return getCurrentItem(viewport, options);
    else throw new Error('Unknown command to ezslider: ' + args[0]);
  }
}

function initSlider(viewport, options) {
  options = options || [];
  if (!options.noStyles) addDefaultStyles();
  var hammertime = new Hammer(viewport[0], {});
  var itemSel = options.itemSelector || '.item';

  hammertime.on('swipe', swipe)
    .on('panstart', function () { viewport.data('deltaX', 0); })
    .on('pan', pan)
    .on('panend', fixupIfNeeded);
  viewport.on('switch-to-item', function (ev, data) { switchToItem(viewport, options, data); });

  if (options.bullets && viewport.ezsliderBullets) viewport.ezsliderBullets(options.bullets);
  function swipe(ev) {
    if (viewport.find(itemSel).first().is(':animated')) return;
    var current = getCurrentItem(viewport, options);
    if (ev.direction == Hammer.DIRECTION_LEFT) return switchItem(viewport, options, current.index + 1);
    if (ev.direction == Hammer.DIRECTION_RIGHT) return switchItem(viewport, options, current.index);
  }

  function pan(ev) {
    if (viewport.find(itemSel).first().is(':animated')) return;
    if (isNaN(parseInt(viewport.data('deltaX')))) return;
    var first = viewport.find(itemSel).first();
    var margin = parseInt(first.css('margin-left'));
    var deltaX = viewport.data('deltaX') || 0;
    first.css({marginLeft: margin + ev.deltaX - deltaX});
    viewport.data('deltaX', ev.deltaX).trigger('panned')
    if (options.onPanned) options.onPanned();
  }

  function fixupIfNeeded() {
    if (viewport.find(itemSel).first().is(':animated')) return;
    var current = getCurrentItem(viewport, options);
    var deltaX = viewport.data('deltaX');
    if (deltaX === 0 || isNaN(parseInt(deltaX))) return;
    var index = (current.left[0] || current.right[0]).index;
    if (deltaX < 0) index = (current.right[0] || current.left[0]).index;
    switchItem(viewport, options, index);
  }
}

function switchItem(viewport, options, index) {
  viewport.data('deltaX', null);
  var offset = viewport.offset();
  var items = viewport.find(options.itemSelector || '.item');
  if (index < 0) index = 0;
  else if (index >= items.length) index = items.length - 1;
  var first = items.first();
  var item = items.get(index);
  if (!item) return;
  item = $(item);
  var margin  = parseInt(first.css('margin-left'));
  var marginLeftJustify = offset.left - item.offset().left;
  if (marginLeftJustify >= 0) margin += marginLeftJustify;
  else margin += marginLeftJustify + viewport.outerWidth() - item.outerWidth();
  first.animate({marginLeft: (margin * 100/first.outerWidth()) + '%'}, notify);
  function notify() { 
    var current = getCurrentItem(viewport, options);
    viewport.trigger('switched-to-item', [current]);
    if (options.onSet) return options.onSet(current);
  }
}

function getCurrentItem(viewport, options) {
  var offset = viewport.offset();
  var left = offset.left, right = offset.left + viewport.outerWidth();
  var ret = {left: [], full: [], right: []};

  viewport.find(options.itemSelector || '.item').each(function (index) {
    if (!$(this).is(':visible')) return;
    var _left = $(this).offset().left, width = $(this).outerWidth(), _right = _left + width;
    if (_left >= left && _right <= right) ret.full.push({index: index, elt: this});
    else if (_left >= left && _left <= right) ret.right.push({index: index, elt: this, coverage: (right - _left) * 100 /width})
    else if (_right >= left && _right <= right) ret.left.push({index: index, elt: this, coverage: (_right - left) * 100 / width});
  });
  if (ret.full[0]) ret.index = ret.full[0].index;
  else if (ret.left[0]) ret.index = ret.left[0].index;
  else if (ret.right[0]) ret.index = ret.right[0].index;
  return ret;
}

addPlugin();
