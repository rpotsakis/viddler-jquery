# jQuery.Viddler.js
A jQuery plugin that simplifies embedding Viddler video.

Supports HTML5 video embed with flash fallback.  Basic styles provide inline and modal playback.

## How Do I Use It?
Include jQuery 1.8+, jquery.viddler.js, jquery.viddler.css in your layout and target your videos container with `fitVids()`.

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

This will wrap each video in a `div.fluid-width-video-wrapper` and apply the necessary CSS. After the initial Javascript call, it's all percentage-based CSS magic.

## Currently Supported Players
<table>
<tr><td>YouTube</td><td>Y</td></tr>
<tr><td>Vimeo</td><td>Y</td></tr>
<tr><td>Blip.tv</td><td>Y</td></tr>
<tr><td>Viddler</td><td>Y</td></tr>
<tr><td>Kickstarter</td><td> Y</td></tr>
</table>

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