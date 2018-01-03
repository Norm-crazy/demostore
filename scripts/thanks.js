//Firebase pull orders
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://fir-store-d237a.firebaseio.com/Orders.json", false);
xhr.send();
var ordersList = JSON.parse(xhr.response);
console.log(xhr.status);
console.log(ordersList);

var order = ordersList[ordersList.length -1];
var custName = order["Name"];
var custEmail = order["Email"];
var orderId = ordersList.length -1;
var items = order["Items"];
var subtotal = order["Subtotal"];
var tax = order["Tax"];
var total = order["Total"];

$(document).ready(function(){
  $('#name').html(custName);
  $('#email').html(custEmail);
  $('#orderid').html(orderId);
  $('#subtotal').html(" $" + subtotal);
  $('#tax').html(" $" + tax);
  $('#total').html(" $" + total);

  jQuery.each(items, function(key, value){
    $('#items').append("<p class='items-text'>" + key + " X " + value + "</p>");
  });
});
