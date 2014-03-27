# jQuery.Viddler.js
A jQuery plugin that simplifies embedding Viddler video.

Supports HTML5 video embed with flash fallback.  Basic styles provide inline and modal playback.

## How Do I Use It?
Include jQuery 1.8+, jquery.viddler.js, jquery.viddler.css in your layout and target your videos container with `viddler()`.

```html
<link href="path/to/jquery.viddler.css" rel="stylesheet" type="text/css">
<script src="path/to/jquery.min.js"></script>
<script src="path/to/jquery.viddler.js"></script>
<script>
  $(document).ready(function(){
    // Target your .container
    $("#video-container").viddler();
  });
</script>
```

See demo.html for example markup.


## Options Example

```javascript
	$('#player-inline').viddler({ 
		'video_id'  : '7a0d64f2',
		'width' : 437,
		'height' : 246
	});
```


## Changelog
* 0.9 initial implementation

## Documentation
http://developers.viddler.com/documentation/chromeless/