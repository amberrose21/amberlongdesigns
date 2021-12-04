var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };

$(window).load(() => {
  windowLoaded();
});

const windowLoaded = () => {
  $('.preloader')
    .delay(400)
    .fadeOut('slow');

  const popUpElem = $('.popUp');
  const mainElem = $('main');
  let popUpState = false;
  const closePopUpBtn = $('#cancelBtn');

  const projectElem = $('.project-item');
  //   Hiding the popUp element for now. and show it only when a 'project' is clicked.
  $(popUpElem).hide(1);

  mainElem.on('click', e => {
    if ($(e.target).closest('.project-item').length > 0) {
      // check if popUp is already 'up'
      if (popUpState === false) {
        // Now set popUp state to true so it can be taken the F out!
        popUpState = true;
        if ($(window).width() >= 768) {
          // blur the shiit outta the main element and make it unscrollable. ONLY ON TAB AND DESKTOPS
          $('.projects').css('filter', 'blur(7px)');
        } else {
          // if been viewed on mobile just take away all element except popUp.
          $('.projects').css('display', 'none');
          $('footer').css('display', 'none');
          $('.intro').css('display', 'none');
          $('.contact').css('display', 'none');
        }

        // now the scroll is only disabled for smaller-screen size devices
        if ($(window).width() > 768) {
          $('body').css('overflow', 'hidden');
        }

        // now display the popUp like it's a grammy!
        $(popUpElem).show(400);

        //   below is the data of the project clicked.
        const projectHeading = $(e.target)
          .closest('.project-figure')
          .children('figcaption')
          .children('h2')
          .text();

        const projectDesc = $(e.target)
          .closest('.project-figure')
          .children('figcaption')
          .children('.popUpdesc')
          .text();

        const projectImg = $(e.target)
          .closest('.project-figure')
          .children('img')
          .attr('src');

        const projetGithubRepo = $(e.target)
          .closest('.project-figure')
          .children('figcaption')
          .children('#githubRepo')
          .attr('href');

        const projectLivePreview = $(e.target)
          .closest('.project-figure')
          .children('figcaption')
          .children('#livePreview')
          .attr('href');

        //  END OF data of the project clicked.
        // setting the PARAGRAPH of the popUp to match that of the project clicked.
        $(popUpElem)
          .children('#popUpText')
          .children('p')
          .text(`${projectDesc}`);

        // setting the HEADING of the popUp to match that of the project clicked.
        $(popUpElem)
          .children('#popUpText')
          .children('h1')
          .text(`${projectHeading}`);

        // Setting the image here.
        $(popUpElem)
          .children('.popUpImg')
          .css('backgroundImage', `url(${projectImg})`);

        // setting up the github linking here
        $(popUpElem)
          .children('#popUpText')
          .children('div')
          .children('#githubLink')
          .attr('href', `${projetGithubRepo}`);

        // setting the preview link here.
        $(popUpElem)
          .children('#popUpText')
          .children('div')
          .children('#previewLink')
          .attr('href', `${projectLivePreview}`);
      }
    }
  });

  $(closePopUpBtn).on('click', () => {
    if (popUpState === true) {
      $(popUpElem).fadeOut(500);

      //   Unblur the main element and take off overflow: hidden
    }
    if ($(window).width() >= 768) {
      // blur the shiit outta the main element and make it unscrollable. ONLY ON TAB AND DESKTOPS
      $('.projects').css('filter', 'blur(0px)');
      $('body').css('overflow', 'scroll');
    } else {
      // if been viewed on mobile just take away all element except popUp.
      $('.projects').css('display', 'block');
      $('footer').css('display', 'block');
      $('.intro').css('display', 'block');
      $('.contact').css('display', 'block');
    }
    // set popUpState back to false so it could work accoridingly.
    popUpState = false;
  });
};
// Automatic Slideshow - change image every 4 seconds
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 4000);    
}

// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}