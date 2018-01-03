var xhr = new XMLHttpRequest();
xhr.open("GET", "https://fir-store-d237a.firebaseio.com/Likes.json", false);
xhr.send();
var Likes = JSON.parse(xhr.response);
console.log(xhr.status);
console.log(Likes);

var Count = Likes;
$('.like-count').html("Likes:" + Likes);

$( document ).ready(function() {
    $('#likes_test_button').on('click', function(){
      Count += 1;
      $('.like-count').html("Likes:" + Count);
      $(this).attr("disabled", true);
      storeLike();
  });

  $(window).resize(function(){
    if ($(window).width() < 770) {
      $('#navbar').removeClass('navbar-left')
      $('#navbar').addClass('navbar-top')
    } else {
      $('#navbar').removeClass('navbar-top')
      $('#navbar').addClass('navbar-left')
    }
  });

  //This is for a show - one click only//
  $('.hide-text').hide();
    $('.show-button').on('click',function(){
    $('.hide-text').show();
  });

  //This will togggle the text to show as many times as liked//
  $('.toggle-text').hide();
    $('.toggle-button').on('click',function(){
    $('.toggle-text').toggle();
  });

  $('.console-text').hide();
  $('.console-button').click(function(){
  $('.console-text').show();
  console.log("You should be seeing this text, this is a console.log function.");
  });

  $('.alert-button').click(function(){
  alert('This is an alert');
  });

});

function storeLike () {

  //adding to Firebase
  var data = {
    "Likes" : Count
  };

  var json = JSON.stringify(data);

  var xhrNew = new XMLHttpRequest();
  xhrNew.open("PATCH", "https://fir-store-d237a.firebaseio.com/.json", true);
  xhrNew.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhrNew.send(json);
  setTimeout(function(){location.reload();}, 2000);
};
