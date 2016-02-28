
$.fn.iconSlider=function(options){
	
	var $iconSlider=this;
	
	//Click Handler for Icon	
	$iconSlider.find(".is-icon").click(function(){
		
		//Show Layer
		icon_id = $(this).attr("id");
		layer_id = icon_id.replace("_i_","_l_");

		$iconSlider.find("img:visible").fadeOut(function() {
			$iconSlider.find("#"+layer_id).fadeIn();	
		});


		//Check if Text Highlight is needed
		textHighlight=$(this).data("text-highlight");
		

		//Show Layer Title
		var layer_title=$(this).data('title');
		console.log("layer_title: "+layer_title);

		$iconSlider.find("#is_layer_title_wrapper").fadeOut(function() {
			// Animation complete.
			//console.log($(this));
			if(null!=layer_title) {
				$layerTitle = $(this).find("#is_layer_title");
				$layerTitle.html(layer_title);
				$(this).fadeIn();
				if(textHighlight) {
					$layerTitle.addClass("is-highlight");
				} else {
					$layerTitle.removeClass("is-highlight");
				}
			}
	  	});

		//Show Layer Description
		var layer_desc=$(this).data('description');
		console.log("layer_desc: "+layer_desc);

		$iconSlider.find("#is_layer_desc_wrapper").fadeOut(function() {
			// Animation complete.
			//console.log($(this));
			if(null!=layer_desc) {
				
				$layerDesc = $(this).find("#is_layer_desc");
				$layerDesc.html(layer_desc);
				$(this).fadeIn();
				if(textHighlight) {
					$layerDesc.addClass("is-highlight");
				} else {
					$layerDesc.removeClass("is-highlight");
				}

			}
	  	});

		//Show Layer Buttons
		var layer_button_text=$(this).data('button-text');
		var layer_button_link=$(this).data('button-link');
		console.log("layer_button: "+layer_button_text);

		$iconSlider.find("#is_layer_button_wrapper").fadeOut(function() {
			// Animation complete.
			//console.log($(this));
			if(null!=layer_button_text) {

				$iconSlider.find("#is_layer_button").html(layer_button_text);

				if(null!=layer_button_link) {
					$iconSlider.find("#is_layer_button_link").attr("href",layer_button_link);
				} else {
					$iconSlider.find("#is_layer_button_link").attr("href","");
				}
				
				$(this).fadeIn();

			}
	  	});

		
		//Update Icon
		$iconSlider.find(".is-icon").removeClass("selected");
		$(this).addClass("selected");
	});


	var is_count = 1;
	var $firstLayer = null;

	$iconSlider.find(".is-icon").each(function(i,v){

		//Show All Icons & Images
		icon=$(v).data("icon");
		image=$(v).data('image');

		$(v).attr("id","is_i_"+is_count);

		$(v).css("background-image","url("+icon+")");
		$iconSlider.append("<img class='is-layer' id='is_l_"+is_count+"' src='"+image+"'>");

		is_count++;

		//Find Selected Image
		selected=$(v).data("selected");
		console.log(selected);

		if(selected){
			$firstLayer = $(v);
		}

		//$iconSlider.append("<img class='loader-image' src='"+$(v).data("image")+"'>");

	});	


	//Adding Layer Title and Description
	$iconSlider.find(".is-icon").wrapAll("<div class='is-icon-wrapper' />").wrapAll("<div class='is-icon-box' />");
	$iconSlider.append("<div id='is_layer_title_wrapper'><div id='is_layer_title'></div></div>");	
	$iconSlider.append("<div id='is_layer_desc_wrapper'><div id='is_layer_desc'></div></div>");	
	$iconSlider.append("<div id='is_layer_button_wrapper'><a id='is_layer_button_link' href='' target='_blank'><button id='is_layer_button'></button></a></div>");	

	/*$iconSlider.imagesLoaded().always(function() {
		$iconSlider.find(".loader-image").hide();
	
	});*/
	

	$iconSlider.css("width" , options.width);
	$iconSlider.css("max-height" , options.maxHeight);

	//Load the first slide
	$firstLayer.click();


	//Set Icon sizes
	var iconMargin,iconWidth,sliderSize;

	$iconSlider.find(".is-icon").css("width",options.iconSize).css("height",options.iconSize);



	//Set Pointer position on Icons
	if(options.iconSize.indexOf("px")!=-1) {
		iconWidth = options.iconSize.substring(0,options.iconSize.length);
	} else {
		iconWidth = options.iconSize;
	}

	iconWidth = parseInt(iconWidth,10);	

	console.log("iconWidth:"+iconWidth);

	var pointerLeft = (iconWidth / 2) - 5;

	var custom_styles = ".selected:after{left:"+pointerLeft+"px;}";

	$("head").append("<style class='icon-slider-added-styles'>"+custom_styles+"</style>");

	
};