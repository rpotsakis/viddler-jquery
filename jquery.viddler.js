(function( $ ){

    var methods = {
      init : function( options ) { 
        // Create some defaults, extending them with any options that were provided
        var settings = $.extend( {
          'player_id'        : 'vplayer',
          'video_id'         : '',
          'poster'           : '',
          'start'            : '0',
          'width'            : '320',
          'height'           : '240',
          'bgcolor'          : '#000000',
          'wmode'            : 'opaque',
          'player_mode'      : 'mini', // full|simple|mini
          'embed_mode'       : 'inline', // inline|modal
          'autoplay'         : 'f',
          'loop'             : '0',
          'nologo'           : '0',
          'hd'               : '0',
          'initialVolume'    : '50', // 0-100
          'activecolor'      : '#ffffff', // hex color – Normal button ( not plus button ) clicked color
          'hovercolor'       : '#c0c0c0', // hex color – Normal button ( not plus button ) mouse hover color full, simple, mini
          'inactivecolor'    : '#c0c0c0', // hex color – Normal button ( not plus button ) idle color full, simple, mini
          'activepluscolor'  : '#ffffff', // hex color – Plus button clicked color full
          'hoverpluscolor'   : '#c0c0c0', // hex color – Plus button mouse hover color full
          'inactivepluscolor': '#ffffff', // hex color – Plus button idle color full
          'barcolor'         : '#c0c0c0' // hex color – Control bar color full, simple, mini
        }, options);

        var viddlerPlayer = $(this),
            playerId = $(this).prop('id'),
            videoId = settings.video_id,
            viddlerFlash = document.getElementById('viddlerVideo-'+videoId),
            flashSupport = false,
            flashVars = 'f=1&enablejsapi=1&openURL=90992647&autoplay='+settings.autoplay+'&loop='+settings.loop+'&nologo='+settings.logo+'&hd='+settings.hd;

        // Addon Flashvars
        flashVars += '&initialVolume=' + settings.initialVolume + '&activecolor=' + settings.activecolor + '&hovercolor=' + settings.hovercolor;
        flashVars += '&inactivecolor=' + settings.inactivecolor + '&activepluscolor=' + settings.activepluscolor + '&hoverpluscolor=' + settings.hoverpluscolor;
        flashVars += '&inactivepluscolor=' + settings.inactivepluscolor + '&barcolor=' + settings.barcolor;

        //IE only
        if("ActiveXObject" in window) {
            try{
                flashSupport = !!(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"));
            }catch(e){
                flashSupport = false;
            }
        //W3C, better support in legacy browser
        } else {
            flashSupport = !!navigator.mimeTypes['application/x-shockwave-flash'];
        }

        // Detect video tag support
        var videoTestEl = document.createElement( "video" ), mpeg4, h264, ogg, webm;
        if ( videoTestEl.canPlayType ) {
            // Check for MPEG-4 support
            mpeg4 = "" !== videoTestEl.canPlayType( 'video/mp4; codecs="mp4v.20.8"' );

            // Check for h264 support
            h264 = "" !== ( videoTestEl.canPlayType( 'video/mp4; codecs="avc1.42E01E"' )
                || videoTestEl.canPlayType( 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' ) );

            // Check for Ogg support
            ogg = "" !== videoTestEl.canPlayType( 'video/ogg; codecs="theora"' );

            // Check for Webm support
            webm = "" !== videoTestEl.canPlayType( 'video/webm; codecs="vp8, vorbis"' );
        }

        // Load Video
        if (viddlerPlayer) {
          
          // Setup video embed based on browser support
          if(flashSupport) {
            // Test if the browser is IE
            var userAgent = navigator.userAgent.toLowerCase();
            if (/msie/.test(userAgent)){
              // IE object embed
              var html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ' + 
                '" width="' + settings.width + '" height="'+ settings.height + '" ' + 'id="viddlerVideo-' + playerId + '" name="viddler-outer-' + playerId + '" tabindex="0">';
              html += '<param name="movie" value="//www.viddler.com/'+ settings.player_mode +'/'+ videoId +'/">';
              html += '<param name="allowfullscreen" value="true">';
              html += '<param name="allowScriptAccess" value="always">';
              html += '<param name="seamlesstabbing" value="true">';
              html += '<param name="wmode" value="' + settings.wmode + '">';
              html += '<param name="bgcolor" value="' + settings.bgcolor + '">';
              html += '<param name="flashVars" value="' + flashVars + '">';
              html += '</object>';

              
              if(settings.embed_mode == 'modal'){
                var pop = new videoPop();
                pop.popOut(playerId, { src : '//www.viddler.com/thumbnail/'+ videoId +'/', width : settings.width, height : settings.height }, html);
              } else {
                $(viddlerPlayer).replaceWith('<div id="' + playerId + '">' + html + '</div>');
              }
              
            } else { // Non-IE object embed
              var wrapper = document.createElement('div');
              wrapper.id = playerId;

              // Create new object element
              var obj = document.createElement('object');
              obj.setAttribute('type', 'application/x-shockwave-flash');
              obj.setAttribute('data', '//www.viddler.com/'+ settings.player_mode +'/'+ videoId +'/');
              obj.setAttribute('width', parseInt(settings.width));
              obj.setAttribute('height', parseInt(settings.height));
              obj.setAttribute('bgcolor', settings.bgcolor);
              obj.setAttribute('id', 'viddlerVideo-'+videoId);
              obj.setAttribute('name', 'my'+playerId);
              obj.setAttribute('tabindex', 0);
              //obj.setAttribute('classid', 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000');
              appendAttribute(obj, 'allowfullscreen', 'true');
              appendAttribute(obj, 'allowScriptAccess', 'always');
              appendAttribute(obj, 'allowNetworking', 'all');
              appendAttribute(obj, 'seamlesstabbing', 'true');
              appendAttribute(obj, 'wmode', settings.wmode);
              appendAttribute(obj, 'movie', '//www.viddler.com/mini/'+ videoId +'/');
              appendAttribute(obj, 'flashVars', flashVars);

              // Build elements
              var innerObj = document.createElement('object');
              innerObj.setAttribute('id', 'viddler-inner-'+videoId);
              obj.appendChild(innerObj);
              wrapper.appendChild(obj);

              // console.log(obj);
              
              if(settings.embed_mode == 'modal'){
                var pop = new videoPop();
                pop.popOut(playerId, { src : 'http://www.viddler.com/thumbnail/'+ videoId +'/', width : settings.width, height : settings.height }, wrapper);
              } else {
                // Replace target with new element
                var el = document.getElementById(playerId);
                el.parentNode.replaceChild(wrapper, el);
              }
              
              
            }

          } else if(h264){
            // Create html5 video html
            var videoHtml = '';
            videoHtml += '<video id="viddlerVideo-'+ videoId +'" ';
            videoHtml += 'src="//www.viddler.com/file/'+ videoId +'/html5mobile?openURL=90992647" type="video/mp4" ';
            videoHtml += 'width="'+ settings.width +'" height="'+ settings.height +'" poster="//www.viddler.com/thumbnail/'+ videoId +'/" ';
            videoHtml += 'controls="controls" x-webkit-airplay="allow"></video> ';

            // embed video inline or by modal
            if(settings.embed_mode == 'modal'){
              var pop = new videoPop();
              pop.popOut(playerId, { src : '//www.viddler.com/thumbnail/'+ videoId +'/', width : settings.width, height : settings.height }, videoHtml);
            } else {
              $(viddlerPlayer).replaceWith('<div id="' + playerId + '">' + videoHtml + '</div>');
            }
          } else {
            var videoHtml = '<div id="'+ playerId +'">Video format unsupported by browser</div>';

            $(viddlerPlayer).replaceWith(videoHtml);
          }
          
        }

      },
      hasFlash : function() {
        var flashSupport = false;

        //IE only
        if("ActiveXObject" in window) {
            try{
                flashSupport = !!(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"));
            }catch(e){
                flashSupport = false;
            }
        //W3C, better support in legacy browser
        } else {
            flashSupport = !!navigator.mimeTypes['application/x-shockwave-flash'];
        }

        return flashSupport;
      },
      get_id : function() {
        if($(this).find('object').length > 0){
          return $(this).find('object:first').attr('id');
        } else {
          return $(this).find('video:first').attr('id');
        }
      },
      get_player : function( ) {
        return (document.getElementById( methods.get_id.apply(this) ));
      },
      load : function(vid, startSeconds) {
        // vid = video id from viddler, startSeconds is optional
        var start = 0;
        
        if(startSeconds !== undefined){
          start = startSeconds;
        }

        if(methods.hasFlash.apply( this )){
          methods.get_player.apply( this ).loadVideoById(vid, parseInt(start));
        } else {
          methods.get_player.apply( this ).src = '//www.viddler.com/file/'+ vid +'/html5mobile?openURL=90992647';
          
          methods.get_player.apply( this ).play();
          //methods.get_player.apply( this ).currentTime = parseInt(start);
        }
      },
      cue : function(vid, startSeconds) {
        // vid = video id from viddler, startSeconds is optional
        var start = 0;
        
        if(startSeconds !== undefined){
          start = startSeconds;
        }

        if(methods.hasFlash.apply( this )){
          methods.get_player.apply( this ).cueVideoById(vid, parseInt(start));
        } else {
          methods.get_player.apply( this ).src = '//www.viddler.com/file/'+ vid +'/html5mobile?openURL=90992647';
          //methods.get_player.apply( this ).currentTime = parseInt(start);
        }
      },
      pause : function() {
        if(methods.hasFlash.apply( this )){
          methods.get_player.apply( this ).pauseVideo();
        } else {
          methods.get_player.apply( this ).pause();
        }

      },
      stop : function() {
        if(methods.hasFlash.apply( this )){
          methods.get_player.apply( this ).stopVideo();
        } else{
          methods.get_player.apply( this ).pause();
        }
      },
      play : function() {
        
        if(methods.hasFlash.apply( this )){
          methods.get_player.apply( this ).playVideo();
        } else {
          methods.get_player.apply( this ).play();
        }
        
      },
      seekTo : function(seconds) {

        methods.get_player.apply( this ).seekTo(seconds, true);

      },
      mute : function() {
        if(methods.hasFlash.apply( this )){
          methods.get_player.apply( this ).mute();
        } else {
          methods.get_player.apply( this ).muted = true;
        }
      },
      unmute : function() {
        if(methods.hasFlash.apply( this )){
          methods.get_player.apply( this ).unMute();
        } else {
          methods.get_player.apply( this ).muted = false;
        }
      }
    };

    $.fn.viddler = function( method ) {
      
      // Method calling logic
      if ( methods[method] ) {
        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.viddler' );
      }    
    
    };

    function appendAttribute(object, name, value) {
      var param = document.createElement('param');
      param.setAttribute('name', name);
      param.setAttribute('value', value);
      object.appendChild(param);
    };

    /*
     * USAGE: 
     *  var pop = new videoPop();
     *  pop.popOut("<div />");
     */
    function videoPop() { 
        this.placeholder = null;
        this.square = null;
        this.overdiv = null;

        this.popOut = function(target, poster, content) {

            // Create anchor for Play Button overlay
            var playicon = document.createElement("a");
            playicon.className = "viddler-play-icon";
            playicon.href = "javascript:void 0;";

            // Build placeholder with poster
            this.placeholder = document.createElement("div");
            this.placeholder.className = "viddler-placeholder";
            this.placeholder.style.width = poster.width+'px';
            this.placeholder.style.height = poster.height+'px';

            // Create the poster image for the placeholder div
            var posterimg = document.createElement("img");
            posterimg.setAttribute("src", poster.src);
            posterimg.setAttribute("width", poster.width);
            posterimg.setAttribute("height", poster.height);

            // Append element
            this.placeholder.appendChild(posterimg);
            this.placeholder.appendChild(playicon);

            this.placeholder.onclick = function(event){
              // recenter div
              var leftPos = parseInt($('body').width()/2) - parseInt(poster.width/2);
              var topPos = parseInt($('body').height()/2) - parseInt(poster.height/2);
              $("#viddler-inner-" + target).css({ 'left' : leftPos+'px', 'top' : topPos+'px' });

              $("#viddler-outer-" + target).show();
              $("#viddler-inner-" + target).show();
            }

            var el = document.getElementById(target);
            el.parentNode.replaceChild(this.placeholder, el);


            // Create outer div - the modal shadow
            this.overdiv = document.createElement("div");
            this.overdiv.id = "viddler-outer-" + target;
            this.overdiv.className = "viddler-outer-div";
            this.overdiv.style.display = "none";

            var closebtn = document.createElement("a");
            closebtn.onclick = function(event) {
                $("#viddler-inner-" + target).hide();
                $("#viddler-outer-" + target).hide();
            }
            closebtn.innerHTML = "Close";
           
            // Create inner div - the modal container
            this.innerdiv = document.createElement("div");
            this.innerdiv.id = "viddler-inner-" + target;
            this.innerdiv.className = "viddler-inner-div";
            this.innerdiv.style.display = "none";
            this.innerdiv.style.width = poster.width+'px';
            this.innerdiv.style.height = poster.height+'px';

            // Set initial position, div will be recentered on open
            var leftPos = parseInt(document.body.offsetWidth/2) - parseInt(poster.width/2);
            var topPos = parseInt(document.body.offsetHeight/2) - parseInt(poster.height/2);
            this.innerdiv.style.position = 'absolute';
            this.innerdiv.style.left = leftPos+'px';
            this.innerdiv.style.top = topPos+'px';
            this.innerdiv.Code = this;

            this.innerdiv.appendChild(closebtn);

            // Drop in player hmtl/obj
            var msg = document.createElement("div");
            msg.className = "viddler-dialog";
            this.innerdiv.appendChild(msg);
            if(typeof content === "string" ){
              msg.innerHTML = content;
            } else {
              msg.appendChild(content);
            }
            this.innerdiv.appendChild(msg);
            
            

            document.body.appendChild(this.overdiv);
            document.body.appendChild(this.innerdiv);
        }
        
    };

})( jQuery );