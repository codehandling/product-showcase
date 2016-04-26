
$.fn.productShowcase=function(options){
	
	var $productShowcase=this;
	
	//Click Handler for Icon	
	$productShowcase.find(".ps-icon").click(function(){
		
		//Show Layer
		icon_id = $(this).attr("id");
		layer_id = icon_id.replace("_i_","_l_");

		$productShowcase.find("img:visible").fadeOut(function() {
			$productShowcase.find("#"+layer_id).fadeIn();	
		});


		//Check if Text Highlight is needed
		textHighlight=$(this).data("text-highlight");
		
		layer_align=$(this).data('align');
		$productShowcase.find("#ps_layer_title_wrapper,#ps_layer_desc_wrapper,#ps_layer_button_wrapper").removeClass().addClass("ps-"+layer_align);

		//Show Layer Title
		var layer_title=$(this).data('title');
		console.log("layer_title: "+layer_title);

		$productShowcase.find("#ps_layer_title_wrapper").fadeOut(function() {
			// Animation complete.
			//console.log($(this));
			if(null!=layer_title) {
				$layerTitle = $(this).find("#ps_layer_title");
				$layerTitle.html(layer_title);
				$(this).fadeIn();
				if(textHighlight) {
					$layerTitle.addClass("ps-highlight");
				} else {
					$layerTitle.removeClass("ps-highlight");
				}
			}
	  	});

		//Show Layer Description
		var layer_desc=$(this).data('description');
		console.log("layer_desc: "+layer_desc);

		$productShowcase.find("#ps_layer_desc_wrapper").fadeOut(function() {
			// Animation complete.
			//console.log($(this));
			if(null!=layer_desc) {
				
				$layerDesc = $(this).find("#ps_layer_desc");
				$layerDesc.html(layer_desc);
				$(this).fadeIn();
				if(textHighlight) {
					$layerDesc.addClass("ps-highlight");
				} else {
					$layerDesc.removeClass("ps-highlight");
				}

			}
	  	});

		//Show Layer Buttons
		var layer_button_text=$(this).data('button-text');
		var layer_button_link=$(this).data('button-link');
		console.log("layer_button: "+layer_button_text);

		$productShowcase.find("#ps_layer_button_wrapper").fadeOut(function() {
			// Animation complete.
			//console.log($(this));
			if(null!=layer_button_text) {

				$productShowcase.find("#ps_layer_button").html(layer_button_text);

				if(null!=layer_button_link) {
					$productShowcase.find("#ps_layer_button_link").attr("href",layer_button_link);
				} else {
					$productShowcase.find("#ps_layer_button_link").attr("href","");
				}
				
				$(this).fadeIn();

			}
	  	});

		
		//Update Icon
		$productShowcase.find(".ps-icon").removeClass("selected");
		$(this).addClass("selected");
	});


	var ps_count = 1;
	var $firstLayer = null;

	$productShowcase.find(".ps-icon").each(function(i,v){

		//Show All Icons & Images
		icon=$(v).data("icon");
		image=$(v).data('image');

		$(v).attr("id","ps_i_"+ps_count);

		$(v).css("background-image","url("+icon+")");
		$productShowcase.append("<img class='ps-layer' id='ps_l_"+ps_count+"' src='"+image+"'>");

		ps_count++;

		//Find Selected Image
		selected=$(v).data("selected");
		console.log(selected);

		if(selected){
			$firstLayer = $(v);
		}

		//$productShowcase.append("<img class='loader-image' src='"+$(v).data("image")+"'>");

	});	


	//Adding Layer Title and Description
	$productShowcase.find(".ps-icon").wrapAll("<div class='ps-icon-wrapper' />").wrapAll("<div class='ps-icon-box' />");
	$productShowcase.append("<div id='ps_layer_title_wrapper'><div id='ps_layer_title'></div></div>");	
	$productShowcase.append("<div id='ps_layer_desc_wrapper'><div id='ps_layer_desc'></div></div>");	
	$productShowcase.append("<div id='ps_layer_button_wrapper'><a id='ps_layer_button_link' href='' target='_blank'><button id='ps_layer_button'></button></a></div>");	

	/*$productShowcase.imagesLoaded().always(function() {
		$productShowcase.find(".loader-image").hide();
	
	});*/
	

	$productShowcase.css("width" , options.width);
	$productShowcase.css("max-height" , options.maxHeight);

	//Load the first slide
	$firstLayer.click();


	//Set Icon sizes
	var iconMargin,iconWidth,sliderSize;

	$productShowcase.find(".ps-icon").css("width",options.iconSize).css("height",options.iconSize);



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

	$("head").append("<style class='ps-added-styles'>"+custom_styles+"</style>");

	
};