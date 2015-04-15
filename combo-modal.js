(function($) {
	counterId = 1;
	
	$.fn.comboModal = function( options ) {
		
		$(this).each(function(){  
			var comboModalId = "#"+$(this).attr('id');
			
			options = $.extend({}, $.fn.comboModal.defaultOptions, options);
			var data = options.data;
			if(data.length>0){
				var id = "#jqueryComboModal"+counterId;
				$(comboModalId).append("<div id='jqueryComboModal"+counterId+"' class='jqueryComboModal'></div>");
				$(id).css("top",$(this).height()+1);
				$(id).css("min-width",$(this).outerWidth()-3);
				options.id = id;
				
				for(var i=0;i<data.length;i++) {
					$(options.id).append("<div class='comboItem' value='"+data[i].value+"'>"+data[i].label+"</div>");
				}
			}
			
			$(this).on('click',function(e){
				if($(options.id).hasClass('opened')==false) {
					$(options.id).addClass('opened')
					$(options.id).css("display","block");
				}
				else {
					$(options.id).removeClass('opened')
					$(options.id).css("display","none");
				}
			});
			
			$(document).mouseup(function (e){
			
					var container = $(comboModalId+" "+".jqueryComboModal");

					if (!container.is(e.target) 
							&& container.has(e.target).length === 0) 
					{
						container.removeClass('opened')
						container.hide();
					}
					
			});
			
			$(options.id+" .comboItem").on('click',function(event){
				var target = $(event.target);
				options.selected.label = target.html();
				options.selected.value = target.attr('value');
				$(comboModalId).data("selected",options.selected);
				$(comboModalId).find(".comboLabel").html(options.selected.label);
			});
			counterId++;
			
		});		

	};
			 
	$.fn.comboModal.defaultOptions = {
		data : new Array(),
		modalDiv : 
			"<div class='jqueryComboModal'>"+
			"</div>",
		selected : {},
		id : ""
	};
		
}(jQuery));