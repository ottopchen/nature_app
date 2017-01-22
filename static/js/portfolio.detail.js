/**
	STUDIO POINT - Parallax Responsive Retina Ready
 	Copyright (c) 2013, Subramanian 

	Author: Subramanian
    Profile: themeforest.net/user/FMedia/
	
    Version: 1.0.0
	Release Date: February 2013
	
	Built using: jQuery 		version:1.6.2	http://jquery.com/
								jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
	
**/

(function( $ ){	

	function detailPage(selector, params){
		// default variables
		var defaults = $.extend({}, { 
			filter 		: "#options",
			buttonColor : ""

		} , params);
		
			var self = this;
			self.curSlide = 0;
			self.mainCont = $(selector);
			self.selEle = self.mainCont.find(".isotope_items");
			self.filter = $(defaults.filter);
			self.buttonColor = defaults.buttonColor;
			
			self.selEle.parent().prepend('<div class="projDetailLoad" ></div>')
			self.backPage  = self.selEle.parent().children(":first-child");
			self.backPage.css({"height":"0px", "overflow":"hidden"});
			self.initPortfolioSlider();
	}
	
	
		
	detailPage.prototype = {
		
		// initPortfolioSlider function is used to create a portfolio and news items
 		
		initPortfolioSlider : function(){
			
			var self = this;
			self.backPage.hide();
			
			self.filterArry = [];
			self.filterEle = [];
			
			self.filter.find("a").each(function(){
				value = $(this).attr('data-option-value');
				var gh = value.split('.')
				self.filterArry.push(gh[1]);
				self.filterEle.push($(this));
				var sArry = [];
				self.filterEle[self.filterEle.length-1].data("sArry", sArry);
				self.filterEle[self.filterEle.length-1].data("jjj", -1)
			});
			
			self.selEle.each(function(){
				var ff2 = $(this);
				var sArry = [];
				var iii = 0;
				ff2.data("slides",$(this).find('.item').length);
				
				$(this).find('.item').each(function(){
					
					for(var hs = 0; hs < self.filterArry.length; hs++){
						if( $(this).hasClass(self.filterArry[hs])) {
							self.filterEle[hs].data("sArry").push($(this));
							self.filterEle[hs].data("jjj", self.filterEle[hs].data("jjj")+1);
							$(this).data("jjj", self.filterEle[hs].data("jjj") );
						}
					}
				
					sArry.push($(this));
					$(this).data("iii",iii++);
					$(this).find('.flexSlideshow').addClass('flexslider');
					$(this).data("details",$(this).find(".fullDetails"));
					$(this).find(".fullDetails").remove();
				});
				ff2.data("sArry",sArry);
			});

			
			self.cItem=0;
			
			
			self.filter.find("a").each(function(){
				$(this).click(function() {
					self.backPage.animate({"height":0}, 500, "easeInOutQuart",function(){
						self.removeBackCon();
					});
				
				});
			})
			
			self.backPage.prepend('<div class="row itemNav"></div>');
			self.navv = self.backPage.children(":first-child");
			
			if(self.buttonColor == ""){
				self.navv.prepend('<div class="alignRight sliderNumber">1/10</div>');
			}else{
				self.navv.prepend('<div class="alignRight sliderNumber '+String(self.buttonColor)+'">1/10</div>');
			}
			
			self.n_sli = self.navv.children(":first-child");
			
			if(self.buttonColor == ""){
				self.navv.prepend('<a class="alignRight previous_button"></a>');
			}else{
				self.navv.prepend('<a class="alignRight previous_button '+String(self.buttonColor)+'"></a>');
			}
			self.p_Btn = self.navv.children(":first-child");
			
			
			if(self.buttonColor == ""){
				self.navv.prepend(' <a class="alignRight next_button" ></a');
			}else{
				self.navv.prepend('<a class="alignRight next_button '+String(self.buttonColor)+'"></a>');
			}
			self.n_Btn = self.navv.children(":first-child");
			
			if(self.buttonColor == ""){
				self.navv.prepend(' <a class="alignRight close_button" ></a');
			}else{
				self.navv.prepend('<a class="alignRight close_button '+String(self.buttonColor)+'"></a>');
			}
			
			self.c_Btn = self.navv.children(":first-child");

			
			self.n_Btn.click(function() {
				self.curSlide = self.curSlide+1 < self.curFmSlider.length ? self.curSlide+1 : 0;
				self.showDetailPage(self.curFmSlider[self.curSlide]);

			});
			
			self.p_Btn.click(function() {
				self.curSlide = self.curSlide-1 > -1 ? self.curSlide-1 : self.curFmSlider.length-1;
				self.showDetailPage(self.curFmSlider[self.curSlide]);
			});
			
			self.c_Btn.click(function() {
				var posT = 0;
				var ddm = $(window).width() < 768 ? 45 : 68;
				posT = parseInt(self.filter.position().top)-ddm;
				$("body, html").animate({ scrollTop: posT }, 500, "easeInOutQuart");
				self.backPage.animate({"height":0}, 500, "easeInOutQuart",function(){
					self.removeBackCon();
				});
			});

			
			self.selEle.find(".item .detail_btn").click(function() {
				
				var posT = 0;
				var ddm = $(window).width() < 768 ? 45 : 68;
				posT = parseInt(self.mainCont.position().top)-ddm;
				$("body, html").animate({ scrollTop: posT }, 500, "easeInOutQuart");
				
				self.cItem = 0;
				
				for(var hs = 0; hs < self.filterEle.length; hs++){
					if( (self.filterEle[hs]).hasClass('selected')) {
						self.cItem = hs;
					}
				}
				var ppp = isNaN($(this).parent().data("iii")) ? $(this).parent().parent() : $(this).parent();
				
				if(self.cItem == 0){
					self.curFmSlider = self.selEle.data("sArry");
					self.curSlide = ppp.data("iii");
				}else{
					self.curFmSlider = self.filterEle[self.cItem].data("sArry");
					self.curSlide = ppp.data("jjj");
				}
			
				self.showDetailPage(ppp);
			});
				
		},
		

// Remove the content that load inside the projDetailLoad div
		removeBackCon : function(){
			var self = this;
			
			try{
				self.backPage.find(".slider_loading").each(function(){
					try{ $(this).remove();  } catch (e) { }
				});
			} catch (e) { }
			
			try{	
				for(var ss=0; ss < self.sliderArr.length; ss++){
					self.sliderArr[ss].pause();
					self.sliderArr[ss].destroy();
				}
				self.sliderArr=[];	
			} catch (e) { }
			
			
			try{
				self.backPage.find('.flexSlideshow').each(function(){
					try{ $(this).flexslider("remove") } catch (e) { }

				});
				
				self.backPage.find('.flexSlideshow').each(function(){
					try{ $(this).flexslider.remove()} catch (e) { };
				});
				
			} catch (e) { }
			
			try{ 
				self.backPage.find("img").each(function(){
					try{ $(this).remove(); } catch (e) { }
				});
			} catch (e) { }
			
			try{ self.backPage.find(".projConWarp").remove();  } catch (e) { }

		},
		

// Show the details page		
		showDetailPage : function(el){

				var self = this;
				var pr = el;
				
				self.n_sli.text((self.curSlide+1)+"/"+(self.curFmSlider.length));
				if(!pr){ return; }
				
				// Remove the flex slider and content before load the new content
				if(pr.data("details").length == 0){
					self.backPage.stop();

					try { 
						for(var ss=0; ss < self.sliderArr.length; ss++){
							self.sliderArr[ss].pause();
						}
					} catch (e) { }
					
					self.backPage.animate({"height": "0px"}, 500, "easeInOutQuart", function(){ 
						self.removeBackCon();
						});
					return;
				}

				
				self.backPage.show();
				
				// reset the detail page size 
				
				self.backPage.stop();

				self.backPage.css({"height": self.backPage.height(), "overflow":"hidden"});
				
				var spp = self.backPage.height()<50 ? 0 : 500;
				var dCon = self.backPage.find(".projConWarp");

				self.backPage.children(":last-child").animate({"opacity": "0"}, spp, "easeInOutQuart", function(){ 
					self.backPage.children(":first-child").css({"opacity": 1});
				
					// Remove the previous page if it not remove completely
					self.removeBackCon();
					
					// load the lazyload image
					if(pr.data("details").length>0){
						self.backPage.append('<div style="position:releative;" class="projConWarp"></div>');
						pr.data("details").clone().appendTo(self.backPage.children(":last-child"));
						self.backPage.children(":last-child").children(":last-child").css({"height":"auto", "width":"auto"})
						self.backPage.children(":last-child").children(":last-child").find(" a.lazyload").each(function(){
							var img = !self.mobileDevice ? $(this).attr("href") : ($(this).attr("data-src-small")? $(this).attr("data-src-small")  :$(this).attr("href"));
							var cc = $(this).attr('class');
							$(this).replaceWith('<img class="'+cc+'" data-src="'+img+'"/>');
							$(this).removeClass('lazyload');
						});
					}
						
					self.detailNoMar = pr.data("details").hasClass("noMargin");
					
					self.intVideoObject(self.backPage);
					
					
					// Add loading bar for each image and fadein the image after image completely load
					self.backPage.children(":last-child").find("img").each(function(){	
							$(this).hide();
							var imSrc = $(this).attr("data-src") ? $(this).attr("data-src") : $(this).attr("src");
							var fxx = $(this).parent();
							if(!fxx.parent().hasClass("slides")){
								fxx.append('<div class="slider_loading" ></div>');
								if(self.selEle.hasClass("darkStyle")){
									fxx.children(":last-child").addClass("black")
								}
								fxx.children(":last-child").css({"top":fxx.height()/2-15, "left":fxx.width()/2-15 });
							}
							$(this).attr('src', imSrc).load(function() {
								$(this).fadeIn(1000);
								$(this).parent().find(".slider_loading").remove();
							})
							.each(function() {
							 if(this.complete) $(this).trigger('load');
							});

					});						
					
					// Store the flex slider in array
					self.sliderArr = [];
					self.backPage.find('.flexSlideshow').each(function(){
						var ffx = $(this);
						ffx.append('<div class="slider_loading" ></div>');
						if(self.selEle.hasClass("darkStyle")){
							ffx.children(":last-child").addClass("black")
						}
						ffx.children(":last-child").css({"top":ffx.height()/2-15, "left":ffx.width()/2-15 });
						ffx.flexslider({
							slideshow: true,
							slideshowSpeed: self.flxDelay,
							start: function(slider){
								var vv = false;
								ffx.parent().parent().find(".projImgs").each(function(){
									vv = true;
								});
								if(!vv){ ffx.find(".slider_loading").remove(); }
								self.sliderArr.push(slider);
							}
						});
					});
					
					
					self.backPage.css({"height": self.backPage.outerHeight()});
					
					self.backPage.children(":last-child").animate({"opacity":1}, 200, "easeInOutQuart")
					
					// Show the full detail page					
						
						var hhh = self.backPage.children(":first-child").outerHeight()+self.backPage.children(":last-child").outerHeight()+30;
						self.backPage.animate({"height": hhh}, 500, "easeInOutQuart", function(){
							self.backPage.css({"height": "auto"})
							
							self.backPage.find('.addVideo').each(function(){
								if(!$(this).data("added")){
									var vid = $(this);
									var W = vid.attr('data-width') ? vid.attr('data-width') : "100%";
									var H = vid.attr('data-height') ? vid.attr('data-height') : "100%";
									var A = vid.attr('data-autoplay') == "true" && !self.mobileDevice? true : false;
									if(H == "100%"){
										vid.css({"height":"100%"})
									}
									vid.prepend('<div class="vid"></div>');
									vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A);
								}
							});
						});
				
				});
		},
		
		// Initialize video cover image
		intVideoObject : function(obj){
			var self = this;
			obj.find('.addVideo').each(function(){		
				var addCover = false;							
				$(this).find('.video_hover').each(function(){
									
					addCover = true;			
					$(this).hover(function() {
						$(this).stop().animate({opacity:0}, 200);
					}, function() {
						$(this).stop().animate({opacity:1}, 200);
					});
									
					var vid = $(this).parent();
					vid.data("added", true);
									
					vid.click(function(){
						$("body").find('.addVideo').each(function(){
							$(this).find('.vid').remove();
				
							if(!$(this).data("added")){

								var vid = $(this);
								var W = vid.attr('data-width') ? vid.attr('data-width') : "100%";
								var H = vid.attr('data-height') ? vid.attr('data-height') : "100%";
								var A = vid.attr('data-autoplay') == "true" && !self.mobileDevice? true : false;
								vid.prepend('<div class="vid" ></div>');
								vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A);
							}
											
							$(this).find('img').fadeIn();
							$(this).find('.video_hover').fadeIn();
							$(this).find('.video_hover').css({"z-index":"5"});
						});
										
						$(this).prepend('<div class="vid" ></div>');
						$(this).find('.video_hover').css({"z-index":"-1"});
						$(this).find('img').fadeOut(100,function(){
							var vid = $(this).parent();
							vid.children(':first-child').embedPlayer(vid.attr('data-url'), vid.width()+"px", vid.height()+"px", vid.width(), false);
						});			
					});
				});	
							
			});
			
		}
		
	};
	

	/*  Initizlize and create the slider plug-in */
	$.fn.detailPage = function(params) {
		var $fm = $(this);
		var instance = $fm.data('GBInstance');
		if (!instance) {
			if (typeof params === 'object' || !params){
				return $fm.data('GBInstance',  new detailPage($fm, params));	
			}
		} else {
			if (instance[params]) {					
				return instance[params].apply(instance, Array.prototype.slice.call(arguments, 1));
			}
		}
	};
	
	
})( jQuery );
