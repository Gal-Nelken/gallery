'use strict'

$(document).ready(init);
$('.submit-btn').click(onSubmit);
$('.contact-link').click(openCanvas);



function init() {
  renderProtfolio();
  renderModal();
}

function renderProtfolio() {
  var projs = getProjs();
  var strHTMLs = projs.map((proj) => {
    return `
        <div class="col-md-4 col-sm-6 portfolio-item}">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${proj.name}">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/portfolio/${proj.name}.jpg" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${proj.title}</h4>
            <p class="text-muted">${proj.intro}</p>
          </div>
        </div>
    `
  })
  $('.portfolio-items').html(strHTMLs.join(''));
}

function renderModal() {
  var projs = getProjs();
  var strHTMLs = projs.map((proj) => {
    return `
  <div class="portfolio-modal modal fade" id="portfolioModal${proj.name}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${proj.title}</h2>
                <p class="item-intro text-muted"></p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.name}.jpg" alt="">
                <p>${proj.desc}</p>
                <ul class="list-inline">
                  <li>Date: ${proj.publishedAt}</li>
                  <li>Client: Cooding Academy</li>
                  <li>Category: Illustration</li>
                  <a href="${proj.url}/index.html"  target="_blank">Try it Out</a>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                  <i class="fa fa-times"></i>
                  Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
  })
  $('.portfolio-modals').html(strHTMLs.join(''));
}



function onSubmit() {
  var msgSubject = $('#contact-subject').val();
  var msgBody = $('#contact-body').val();
  var url = getUrl(msgSubject, msgBody);
  $('#contact-subject').val('');
  $('#contact-body').val('');
  window.open(url, '_newtab');
  openCanvas()
}

