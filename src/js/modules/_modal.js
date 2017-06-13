function modal(element, options) {

  var self = {};

  self.options = {};

  self.options.removeDelay = 300;

  self.body = document.body;

  self.init = function() {
    self.defaultElement();
    self.element.addEventListener('click', function(e) {
      e.preventDefault();
      self.setup();
      self.checkGroup();
      self.isActive();
      self.load();
      self.scale();
      self.listenClose();
    });
  };

  self.defaultElement = function() {
    self.element = element;
    self.updateElement();
  };

  self.updateElement = function() {
    self.url = self.element.getAttribute('href');
    self.alt = self.element.getAttribute('data-alt');
    self.type = self.getType();
  };

  self.setup = function() {
    var div = document.createElement('div');
    div.innerHTML = '<div class="modal" tabindex="0"><div class="modal__overlay"></div><div class="modal__container"><div class="modal__content"></div></div><a class="modal__close" href="#">Close</a></div>';
    self.body.appendChild(div.firstChild);
    self.modal = document.querySelector('.modal');
    self.container = document.querySelector('.modal__container');
    self.content = document.querySelector('.modal__content');
    self.closeButton = document.querySelector('.modal__close');
    document.addEventListener('keydown', self.keydown);
    self.modal.focus();
  };

  self.isActive = function() {
    var x = self.modal.clientHeight;
    self.modal.classList.add('modal--active');
  };

  self.isLoading = function() {
    self.modal.classList.remove('modal--loaded');
    var x = self.modal.clientHeight;
    self.modal.classList.add('modal--loading');
  };

  self.isLoaded = function() {
    self.modal.classList.remove('modal--loading');
    var x = self.modal.clientHeight;
    self.modal.classList.add('modal--loaded');
  };

  self.load = function() {
    self.setContent('<div class="modal__status">Loading</div>', true);
    switch(self.type) {
      case 'youtube':
      self.loadYoutube();
      break;
      case 'vimeo':
      self.loadVimeo();
      break;
      case 'brightcove':
      self.loadBrightcove();
      break;
      case 'image':
      self.loadImage();
      break;
    }
  };

  self.setContent = function(content, loading) {
    self.content.innerHTML = content;
    if (loading === true) {
      self.isLoading();
    } else {
      self.isLoaded();
    }
  };

  self.getType = function() {
    if (self.url.indexOf('youtube.com') > -1) {
      self.format = 'video';
      return 'youtube';
    } else if (self.url.indexOf('vimeo.com') > -1) {
      self.format = 'video';
      return 'vimeo';
    } else if (self.url.indexOf('brightcove.net') > -1) {
      self.format = 'video';
      return 'brightcove';
    } else {
      self.format = 'image';
      return 'image';
    }
  };

  self.loadYoutube = function() {
    var id = self.url.split('v=')[1];
    var embed = '<iframe class="modal__embed" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>';
    self.setContent(self.markupVideo(embed));
  };

  self.loadVimeo = function() {
    var id = self.url.split('vimeo.com/')[1];
    var embed = '<iframe class="modal__embed" src="https://player.vimeo.com/video/' + id + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    self.setContent(self.markupVideo(embed));
  };

  self.loadBrightcove = function() {
    var embed = '<iframe class="modal__embed" src="' + self.url + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    self.setContent(self.markupVideo(embed));
  };

  self.loadImage = function() {
    var img = document.createElement('img');
    img.onload = function() {
      if (img.src.indexOf(self.url) > -1) {
        self.setContent('<img class="modal__item" src="' + self.url + '" alt="' + self.alt + '" />');
      }
    };
    img.onerror = function() {
      if (img.src.indexOf(self.url) > -1) {
        self.setContent('<div class="modal__status">Error loading resource</div>');
      }
    };
    img.src = self.url;
    img.alt = self.alt;
  };

  self.markupVideo = function(embed) {
    return '<div class="modal__item"><div class="modal__video">' + embed + '</div></div>';
  };

  self.checkGroup = function() {
    self.group = document.querySelectorAll('[data-modal-group="' + self.element.getAttribute('data-modal-group') + '"]');
    if (self.group.length > 1) {
      self.initGroup();
      self.setGroupIndex();
      self.listenGroup();
    }
  };

  self.initGroup = function() {
    var div = document.createElement('div');
    div.innerHTML = '<div class="modal__controls"><a class="modal__nav modal__nav--previous" href="#"><span class="hide">Previous</span><span class="modal__nav--icon"><span class="svgstore svgstore--ArrowLeft"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/svgstore.svg#ArrowLeft"></use></svg></span></span></a><a class="modal__nav modal__nav--next" href="#"><span class="hide">Next</span><span class="modal__nav--icon"><span class="svgstore svgstore--ArrowRight"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/svgstore.svg#ArrowRight"></use></svg></span></span></a></div>';
    self.container.appendChild(div.firstChild);
    self.controls = document.querySelector('.modal__controls');
    self.navPrevious = document.querySelector('.modal__nav--previous');
    self.navNext = document.querySelector('.modal__nav--next');
  };

  self.setGroupIndex = function() {
    for (var i = 0; i < self.group.length; i++) {
      if (self.group[i] == self.element) {
        self.index = i;
      }
    }
  };

  self.listenGroup = function() {
    self.navPrevious.addEventListener('click', function(e) {
      e.preventDefault();
      self.previous();
    });
    self.navNext.addEventListener('click', function(e) {
      e.preventDefault();
      self.next();
    });
  };

  self.previous = function() {
    if (self.group[self.index - 1]) {
      self.index--;
    } else {
      self.index = self.group.length - 1;
    }
    self.changeElement();
  };

  self.next = function() {
    if (self.group[self.index + 1]) {
      self.index++;
    } else {
      self.index = 0;
    }
    self.changeElement();
  };

  self.changeElement = function() {
    self.element = self.group[self.index];
    self.updateElement();
    self.load();
  };

  self.scale = function() {
    var height = window.innerHeight;
    var padding = parseInt(getComputedStyle(self.container).getPropertyValue('padding-top'), 10) + parseInt(getComputedStyle(self.container).getPropertyValue('padding-bottom'), 10);
    if (self.format == 'video') {
      self.content.firstChild.style.maxWidth = ((height - padding) * (16/9)) + 'px';
    } else {
      self.content.firstChild.style.maxHeight = (height - padding) + 'px';
    }
    self.scaleRun = requestAnimationFrame(self.scale);
  };

  self.listenClose = function() {
    self.modal.addEventListener('click', function(e) {
      if (self.controls) {
        if (!self.content.firstChild.contains(e.target) && !self.controls.contains(e.target)) {
          self.close();
        }
      } else {
        if (!self.content.firstChild.contains(e.target)) {
          self.close();
        }
      }
    });
    self.closeButton.addEventListener('click', function(e) {
      self.close();
      e.preventDefault();
      e.stopPropagation();
    });
  };

  self.close = function() {
    cancelAnimationFrame(self.scaleRun);
    self.modal.classList.remove('modal--active');
    self.modal.classList.remove('modal--loading');
    self.modal.classList.remove('modal--loaded');
    setTimeout(function() {
      self.modal.parentNode.removeChild(self.modal);
      self.defaultElement();
    }, self.options.removeDelay);
    document.removeEventListener('keydown', self.keydown);
    element.focus();
  };

  self.focusTrap = function(e) {
    if (e.shiftKey) {
      if (self.modal === document.activeElement) {
        e.preventDefault();
        self.closeButton.focus();
      }
    } else {
      if (self.closeButton === document.activeElement) {
        e.preventDefault();
        self.modal.focus();
      }
    }
  };

  self.keydown = function(e) {
    if (e.keyCode === 9) {
      self.focusTrap(e);
    } else if (e.keyCode === 27) {
      self.close();
    }
  };

  return self;

}

var targets = document.querySelectorAll('[data-modal]');
for (var i = 0; i < targets.length; i++) {
  var myModal = modal(targets[i]);
  myModal.init();
}


//


jQuery(function($) {
  var programModal = function(e) {

    var modal = $('.program__modal__wrapper');
    var close = $('.program__modal__close');

    if ($('.program-active').length) {
      modal.removeClass('program-active');
    }
    else {
      modal.addClass('program-active');
      modal.focus();
      modal.on('keydown', function(e) {
        if (e.keyCode === 9) { // Tab
          e.preventDefault();

          var focusAbleElements = modal.find('.button').add(close);
          var focusedElement = $(document.activeElement);
          var focusedElementIdx = focusAbleElements.index(focusedElement);

          if (focusedElementIdx === (focusAbleElements.length - 1)) {
            focusAbleElements[0].focus();
          }
          else {
            focusAbleElements[focusedElementIdx+1].focus();
          }

          return false;
        }
        else if (e.keyCode === 27) { // Esc
          e.preventDefault();

          modal.removeClass('program-active');

          return false;
        }
        else return true;
      });
    }
  }

  $('.open-program-modal').on('click', function(e) {
    programModal();
    e.preventDefault();
  });

  $('.program__modal__close').on('click', function(e) {
    $('.program__modal__wrapper').removeClass('program-active');
    e.preventDefault();
  });

});