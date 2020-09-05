var price = 0;
// hide cart content when there's no product in it
$(".button").hide();
$(".item").hide();
$(".remove").hide();


// function to add product to the cart and display it there
  $('.buy').click(function(){
        var $input = $(".input");
        name = $($(this).siblings()[0]).html();
        var itemPrice = parseInt($($(this).siblings()[1].children[0]).html());
        price += itemPrice;  // store initial cost
        $("ul.dropdown-menu").prepend(
          `<li data="${this.id}" class="ml-2 item">  
            <a href="#">
            <span class="product">${name}</span><span id="${itemPrice}" class="selectedPrice">₹ ${itemPrice}</span> <img class="selectedImage" src="${$(this).parent().siblings()[0].children[0].src}">
            </a>
            <div class="number">
              <span class="minus">-</span>
              <input type="text" value="1" name="numberOfProducts" class="input">
              <span class="plus">+</span>
            </div>         
         </li>`
        );
    
       $("#total").text("Total cost: ₹");                 // displays "total cost" in the cart
       $("#cost").text(price);                             // displays cost in the cart
       
       // unhides/hides everything that was previously unhidden/hidden by pressing remove
       $(".empty").hide();
      
       $(".item").show();

        // shows total cost 
       $("#cost").show();
       $("#total").show();
       $(".button").show();
       
       $(this).hide(); //hide buy now on card
       
       $($(this).siblings()[2]).show(); //shows remove button on card


       $('.btn-cart').removeClass("bounce2").addClass("bounce");
  });
  
  //function to remove product from the cart
  $('.remove').click(function(){
    var items = $(".item");
    var itemId = this.id;
    for(const item of items){
      if(itemId == item.attributes[0].value){
        var rmPrice = Number($($($(item).children()[1])).children("input").val());
        item.remove();
      }
    }
    rmPrice *= Number($($(this).siblings()[1].children[0]).html());
    price -= rmPrice;
    $("#cost").text(price);
      if(items.length==1){
        //hides/unhides
        $(".empty").show();      
        $("#cost").hide();
        $("#total").hide();
        $(".button").hide();
      }

      $($(this).siblings()[2]).show();
      $(this).hide();
      $('.btn-cart').removeClass("bounce").addClass("bounce2");
      
  });

// choosing number of products to be bought (+/-)
$("ul.dropdown-menu").on("click", ".minus", function(){
  var basePrice = Number($($($(this).parent()).siblings()[0]).children()[1].id);
  if($($(this).siblings()[0]).val()>1){
    price -= basePrice;
    $("#cost").text(price);
    $($(this).siblings()[0]).val(Number($($(this).siblings()[0]).val())-1);
  }
  // alert(  $($(this).siblings()[0]).val());
  return false;
});
$("ul.dropdown-menu").on("click", ".plus", function(){
  var basePrice = Number($($($(this).parent()).siblings()[0]).children()[1].id);
  price += basePrice;
  $("#cost").text(price);
  $($(this).siblings()[1]).val(Number($($(this).siblings()[1]).val())+1);
  return false;
});

  //handling donation part
  $(".denomination").click(function(event) {
      $(".denomination").removeClass("selected").prop('checked', false);
      $(".denomination-other input").removeClass("selected").val('');
      $(this).addClass("selected");
      $(this).children(":first").prop('checked', true);
      // $(".buttonDonate").text('Donate ₹' + $(this).children(":first").val())
      $(".buttonDonate").html(`Donate ₹<span>${$(this).children(":first").val()}</span>`);
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
    // $(".buttonDonate").text('Donate ₹' + $(this).val() + key );
    $(".buttonDonate").html(`Donate ₹<span>${$(this).val() + key}</span>`);
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
    $('.icon2').click(function(){ 
      $('.inside').removeClass('ins');  
    }); 
    $('.icon').click(function(){ 
      $(this).closest('.inside').addClass('ins');  
    }); 

    //handle cart when more than 3 products are added
    $('.btn-cart').click(function(){ 
      if($('.dropdown ul li').length >2){
        // $('.dropdown-menu').css("top", "100px");
        $('.dropdown-menu').addClass('margin');  
      }
      else{
        $('.dropdown-menu').removeClass('margin');  
      }
    });
