function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var coords = "" + position.coords.latitude + "," + position.coords.longitude;
    document.getElementById('geocoor').value=''+coords+''; 
}

$(document).ready(function() {

	var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();

	$("#content").css('height',''+viewportHeight+'');

	function initialize() {

	    var acInputs = document.getElementsByClassName("autocomplete");
	    for (var i = 0; i < acInputs.length; i++) {

	        var autocomplete = new google.maps.places.Autocomplete(acInputs[i]);
	        autocomplete.inputId = acInputs[i].id;

	        google.maps.event.addListener(autocomplete, 'place_changed', function () {
	            document.getElementById("log").innerHTML = 'You used input with id ' + this.inputId;
	        });
	    }
	}

	initialize();

	$("#postform").submit(function(event) {
	    event.preventDefault();

        var address_from 	= $("#address_from").val();
        var geocoor 		= $("#geocoor").val();

        var address_to 		= $("#address_to").val();

		if (address_from == '' && geocoor == ''){
		    $("#address_from").addClass('require');
		} 
		else if(address_to == '') {
		    $("#address_to").addClass('require');
		}
		else {
		    var values = $(this).serialize();

		    $.ajax({
		        url: "http://hebikwindmee.nl/includes/render.php",
		        type: "post",
		        crossDomain: true,
		        cache: false,
				dataType: 'json',
		        data: values,
		        success: function(response){
		        	$('.data_speed').text(response.windspeed);
		        	$('.data_wind_d').text(response.winddirec_n);
		        	$('.data_wind').html(response.final);
		        	$('.windspeed').html(response.windspeed);
		        	$('.data_windpower').html(response.windkracht);
		        	$('.data_wind_type').html(response.wind_type);

		        	$(".wind_warn").addClass(response.wind_warn);
		        	$('.wind_warn').html(response.wind_warn_t);

		        	$(".info h1").addClass('result_page');
		        	$("#address, .subtitle").addClass('move');
		        	$(".millSpin").addClass(response.wind_class);

		        	$(".first_result").show();
		        },
		        error:function(){
		        	console.log("Fail");
		        }
		    });
		}
	});

	$(".open_submenu").click(function(event) {
		$(".submenu").toggle();
	});

	$("#other").click(function(event) {
		$(".first_result").hide();
	    $("#address, .subtitle, .wind_warn").removeClass('move');
		$(".info h1").removeClass('result_page');
	});

	$(".bottom a").click(function() {
    	$("html, body").animate({ scrollTop: $(".subcontent").offset().top }, 1500);
	});

	// Get Geolocation
	$('#geolocation').change(function() {
        if($(this).is(":checked")) {
        	$("#address_from").prop("disabled", true);
        	$("#label_geo").addClass("input_selected");
            getLocation();
        } else {
        	$("#address_from").prop("disabled", false);
        	$("#label_geo").removeClass("input_selected");
        }    
    });

    // Scroll
	 $(window).scroll(function() {    
	    var scroll = $(window).scrollTop();

	    if (scroll >= 100) {
	        $("#upheader").addClass("scroll_down");
	    } else {
	    	$("#upheader").removeClass("scroll_down");
	    }
	});   
});