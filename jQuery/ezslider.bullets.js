module.exports = {
  init: addBullets,
  destroy: removeBullets
};

function addDefaultStyles() {
  return ezStyles.create({
    id: 'slider-bullets-styles',
    styles: [
      ['.bullet:before, .bullet::before', 'content: "◦";  padding: 5px; cursor: pointer;'],
      ['.bullet.selected:before, .bullet.selected::before', 'content: "•";'],
      ['.bullet.selected', 'font-size: 30px;'],
      ['.bullet', 'vertical-align: middle;'],
      ['.bullets', 'position: absolute; bottom: 10%; left: 0; height: 20px; line-height: 20px; font-size: 20px; '],
      ['.bullets', 'width: 100%; overflow: hidden; white-space: nowrap; text-align: center; color: black;']
    ]
  });
}

var $ = window.jQuery || window.$;
function addPlugin() {
  $(function () {
    $.fn.ezsliderBullets = function (options) {
      var ret = this;
      var args = arguments;
      this.each(function () {
        var data = $(this).data('slider.bullets');
        if (data) ret = processCommand($(this), data.options, args);
        else if (typeof (options) == 'string') throw new Error('slider bullets not initialized');
        else {
          $(this).data('slider.bullets', {viewport: $(this), options: options});
          addBullets($(this), options);
        }
      });
      return ret;
    }
  });
  
  function processCommand(viewport, options, args) {
    if (args[0] == 'destroy') return removeBullets(viewport, options);
    else throw new Error('Unknown command to slider: ' + args[0]);
  }
}

function addBullets(viewport, options) {
  options = options || {};
  if (!options.noStyles) addDefaultStyles();
  viewport.append(getBullets()).on('switched-to-item.slider-bullets', onSwitched);
  onSwitched(null, viewport.ezslider('get'));
  function getBullets() {
    return $('<div>', {'class': 'bullets'})
      .on('tap.slider-bullets click.slider-bullets', onClick)
      .append(viewport.find(options.itemSelector || '.item').map(getBullet).get());
  }

  function getBullet(index) {
    if (!$(this).is(':visible')) return;
    return $('<span>', {'class': 'bullet', text: '', 'data-index': index.toString()}); 
  }

  function onClick(ee) {
    var index = parseInt($(ee.target).closest('.bullet').attr('data-index'));
    viewport.ezslider('set', index);
  }

  function onSwitched(ee, current) {
    $(viewport.find('.bullets').find('.bullet').removeClass('selected').get(current.index)).addClass('selected');
  }
}

function removeBullets(viewport, options) {
  return viewport.find('.bullets').remove();
}

addPlugin();
