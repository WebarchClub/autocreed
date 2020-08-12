var $input = $(".input");
var price;
// hide cart content when there's no product in it
$(".button").hide();
$("#item").hide();
$(".remove").hide();


// function to add product to the cart and display it there
  $('.buy').click(function(){
        name = $($(this).siblings()[0]).html();   
        price = parseInt($($(this).siblings()[1].children[0]).html());  // store initial cost
       $(".product").text(name);                       // displays product name in the cart
       $(".selectedPrice").text("₹"+ price);             // displays product price in the cart
    
       $("#total").text("Total cost: ₹");                 // displays "total cost" in the cart
       $("#cost").text(price);                             // displays cost in the cart
       $(".selectedImage").attr("src", $(this).parent().siblings()[0].children[0].src);    // adds image in the cart
       
       // unhides/hides everything that was previously unhidden/hidden by pressing remove
       $(".empty").hide();
      
       $("#item").show();

        // shows total cost 
       $("#cost").show();
       $("#total").show();
       $(".button").show();
       
       $(this).hide(); //hide buy now on card
       
       $($(this).siblings()[2]).show(); //shows remove button on card

       $input.val("1"); //sets value of number of products to 1


       $('.btn-cart').removeClass("bounce").addClass("bounce");
  });

  //function to remove product from the cart
  $('.remove').click(function(){
      //hides/unhides
      $(".empty").show();

      $("#item").hide(); // hides everything in the cart
      
      $("#cost").hide();
      $("#total").hide();
      $(".button").hide();

      $($(this).siblings()[2]).show();
      $(this).hide();
      $('.btn-cart').removeClass("bounce2").addClass("bounce2");
      
  });
  // choosing number of products to be bought (+/-)
  $('.minus').click(function () {
    $input.val(Number($input.val())-1);
    $("#cost").text(price*Number($input.val()));
    return false;
});

$('.plus').click(function () {
    $input.val(Number($input.val())+1);
    $("#cost").text(price*Number($input.val()));

    return false;
});

  //handling donation part
  $(".denomination").click(function(event) {
      $(".denomination").removeClass("selected").prop('checked', false);
      $(".denomination-other input").removeClass("selected").val('');
      $(this).addClass("selected");
      $(this).children(":first").prop('checked', true);
      $(".buttonDonate").text('Donate ₹' + $(this).children(":first").val())
  });

  $(".denomination-other input").on('keypress', function (event) {
    
    var regex = new RegExp("^[0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
    
    $(".denomination").removeClass("selected").prop('checked', false);
    $(this).addClass("selected");
    $(".buttonDonate").text('Donate ₹' + $(this).val() + key );
  });

  
    // click counter (no. of products in the shopping cart)
    $('.buy').click(function() {
      $('#clickme').html(function(i, val) { return val*1+1 });
      
    });
    $('.remove').click(function() {
      $('#clickme').html(function(i, val) { return val*1-1 });
    });

   
    $('.donate-sm').click(function(){
      // $('.donate').show();
      $('.donate').css("right", 0);
    });
    $('.closedonation').click(function(){
            // $('.donate').hide();
        $('.donate').css("right", "-100%");
    });
