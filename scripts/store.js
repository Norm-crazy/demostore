//Firebase data pull
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://fir-store-d237a.firebaseio.com/Items.json", false);
xhr.send();
var itemList = JSON.parse(xhr.response);
console.log(xhr.status);
console.log(itemList);

var xhr2 = new XMLHttpRequest();
xhr2.open("GET", "https://fir-store-d237a.firebaseio.com/Orders.json", false);
xhr2.send();
var ordersList = JSON.parse(xhr2.response);
console.log(xhr2.status);
console.log(ordersList);
//cart details
var ff8Subtotal = 0;
var haloSubtotal = 0;
var mgsSubtotal = 0;
var mgs4Subtotal = 0;
var dr3Subtotal = 0;
var gowSubtotal = 0;
var subtotalCart = 0;
var taxCart = 0;
var totalCart = 0;
var itemCart = {};
var ff8Quantity = 0;
var mgs4Quantity = 0;
var mgsQuantity = 0;
var haloQuantity = 0;
var gowQuantity = 0;
var dr3Quantity = 0;
var totalItemCount = 0;
var charge = 0;
function shoppingCart (){
  //parseFloat will turn the string into number
  subtotalCart = parseFloat(Number(ff8Subtotal + gowSubtotal + dr3Subtotal + mgsSubtotal + mgs4Subtotal + haloSubtotal).toFixed(2));
  taxCart = parseFloat(Number(subtotalCart * 0.0825).toFixed(2));
  totalCart = parseFloat(Number(subtotalCart + taxCart).toFixed(2));
  totalItemCount = ff8Quantity + mgsQuantity + mgs4Quantity + haloQuantity + dr3Quantity + gowQuantity;
  charge = "$" + totalCart;
    if (ff8Quantity > 0) {
      itemCart.ff8 = ff8Quantity;
      $('#cart-input-item-ff8').html(ff8Quantity + " X Final Fantasy 8");
    }
    if (mgsQuantity > 0) {
      itemCart.mgs = mgsQuantity;
      $('#cart-input-item-mgs').html(mgsQuantity + " X Metal Gear Solid");
    }
    if (mgs4Quantity > 0) {
      itemCart.mgs4 = mgs4Quantity;
      $('#cart-input-item-mgs4').html(mgs4Quantity + " X Metal Gear Solid 4");
    }
    if (haloQuantity > 0) {
      itemCart.halo = haloQuantity;
      $('#cart-input-item-halo').html(haloQuantity + " X Halo");
    }
    if (dr3Quantity > 0) {
      itemCart.dr3 = dr3Quantity;
      $('#cart-input-item-dr3').html(dr3Quantity + " X Dead Rising 3");
    }
    if (gowQuantity > 0) {
      itemCart.gow = gowQuantity;
      $('#cart-input-item-gow').html(gowQuantity + " X Gears of War");
    }
    $('#cart-input-sub').html(" $" + subtotalCart);
    $('#cart-input-tax').html(" $" + taxCart);
    $('#cart-input-total').html(" $" + totalCart);
    $('#total-item-count').html("(" + totalItemCount + ")");
}

$(document).ready(function() {
  /*Shopping Cart*/
  $('#button-cart').on('click', function(){
    $('.cart-window').toggle();
  });
  $('#payment-form').submit(function(){
    custName = $("#example3-name").val();
    custEmail = $("#example3-email").val();
    chargToken = "Ch_" + Math.random().toString(36).substr(2);
    newOrder(custName, custEmail, chargToken);
  });
  //Playstation
  $('#ff8-cart').on('click', function(){
    ff8Quantity += 1;
    var ff8Price = itemList["FF8"]["Price"];
    ff8Subtotal = ff8Quantity * ff8Price;
    shoppingCart();
  });
  $('#MGS-cart').on('click', function(){
    mgsQuantity += 1;
    var MGSPrice = itemList["MGS1"]["Price"];
    mgsSubtotal = mgsQuantity * MGSPrice;
    shoppingCart();
  });
  $('#MGS4-cart').on('click', function(){
    mgs4Quantity += 1;
    var mgs4Price = itemList["MGS4"]["Price"];
    mgs4Subtotal = mgs4Quantity * mgs4Price;
    shoppingCart();
  });
  //Xbox
  $('#halo-cart').on('click', function(){
    haloQuantity += 1;
    var haloPrice = itemList["Halo"]["Price"];
    haloSubtotal = haloQuantity * haloPrice;
    shoppingCart();
  });
  $('#gears-cart').on('click', function(){
    gowQuantity += 1;
    var gowPrice = itemList["GOW"]["Price"];
    gowSubtotal = gowQuantity * gowPrice;
    shoppingCart();
  });
  $('#dr3-cart').on('click', function(){
    dr3Quantity += 1;
    var dr3Price = itemList["Deadr3"]["Price"];
    dr3Subtotal  = dr3Quantity * dr3Price;
    shoppingCart();
  });

//create order
  function newOrder (custName, custEmail, chargToken) {

    var orderNumber = ordersList.length;
  //adding to Firebase
    var data = {
      [orderNumber]: {
        "Items" : itemCart,
        "Subtotal" : subtotalCart,
        "Tax" : taxCart,
        "Total" : totalCart,
        "Charge Token" : chargToken,
        "Name" : custName,
        "Email" : custEmail
      }
    };

    var json = JSON.stringify(data);

    var xhrNew = new XMLHttpRequest();
    xhrNew.open("PATCH", "https://fir-store-d237a.firebaseio.com/Orders.json", true);
    xhrNew.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhrNew.send(json);

    setTimeout(function(){
      $('#thankyoupage a')[0].click();
    }, 2000);
  };
});
