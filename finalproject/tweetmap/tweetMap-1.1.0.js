/*global window:true, jQuery:true, $:true, console:true, google:true */
/*
*	jQuery Tweet To Map
*
*	@url		http://tweettomap.com/
*	@author		Simon Betton
*	@version	1.1.0
*/
(function ($, window) {
	"use strict";

	// Convert URL strings to hyperlinks
	function linkify(text) {
		text = text.replace(
            /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
            function (url) {
                var full_url = url;
                if (!full_url.match('^https?:\/\/')) {
                    full_url = 'http://' + full_url;
                }
                return '<a href="' + full_url + '" target="_blank">' + url + '</a>';
            }
        );
        return text;
	}

	function MapBubble(position, content, width, height, shadowImg, shadowHeight) {
		google.maps.OverlayView.apply(this, arguments);
		this.position = position;
		this.content = content;
		this.width = width || 260;
		this.height = height || 260;
		this.shadowImg = shadowImg || '';
		this.shadowHeight = shadowHeight || 100;
		this.loaded = false;
	}

	MapBubble.prototype = new google.maps.OverlayView();
	MapBubble.prototype.constructor = MapBubble;

	MapBubble.prototype.onAdd = function () {
		this.container = $('<div class="gmap-bubble"></div>');
		this.getPanes().floatPane.appendChild(this.container[0]);
		if (this.shadowImg) {
			this.shadow = $('<div class="shadow"></div>');
			this.shadow.css('position', 'absolute');
			this.getPanes().floatShadow.appendChild(this.shadow[0]);
		}
		this.container.css('position', "absolute");
		this.container.height(this.height);
		this.container.width(this.width);
		this.container.append('<div class="loading"></div>');
		this.contentContainer = $('<div class="panel"></div>');
		this.container.append(this.contentContainer);
		this.container.append('<div class="pointer">▲</div><div class="close"><a href="#">x</a></div>');

		var thisBubble = this,
			close = function (e) {
				e.preventDefault();
				thisBubble.setMap(null);
			};

		$('.close > a', this.container).click(close);
	};

	MapBubble.prototype.draw = function () {
		if (!this.loaded) {
			this.contentContainer.append(this.content);
		}
		$('.timeago', this.container).timeago();
		var pxPos = this.getPoint();
		this.container.css('left', (pxPos.x - 30) + "px");
		this.container.css('top', (pxPos.y + 14) + "px");
		if (this.shadow) {
			this.shadow.css('left', (pxPos.x - 18) + "px");
			this.shadow.css('top', (pxPos.y - this.shadowHeight - 8) + "px");
		}
		if (!this.loaded) {
			this.panMap();
			this.loaded = true;
		}
	};

	MapBubble.prototype.show = function () {
		this.container.css('visibility', "visible");
	};

	MapBubble.prototype.hide = function () {
		this.container.css('visibility', "hidden");
	};

	MapBubble.prototype.onRemove = function () {
		// this.shadow_.remove();
		// this.shadow_ = null;
		this.contentContainer.remove();
		this.contentContainer = null;
		this.container.remove();
		this.container = null;
	};

	MapBubble.prototype.panMap = function () {
		var point = this.getPoint();
		this.getMap().panTo(this.getProjection().fromDivPixelToLatLng(new google.maps.Point(point.x + (this.width / 2), point.y - (this.height / 2) + 200)));
	};

	MapBubble.prototype.getPoint = function () {
		return this.getProjection().fromLatLngToDivPixel(this.position);
	};

	var createSearchURL = function (options) {
		if (!options || !options.q) { return false; }

		var items = [];
		// Loop through options and build url string
		$.each(options, function (key, value) {
			if (value) {
				value = value.replace(/\s*/g, '');
				var url = key + '=' + encodeURIComponent(value);
				items.push(url);
			}
		});

		return 'tweetmap/_proxy/twitter_proxy.php?' + items.join('&') + '&callback=?';
	},

		getFeed = function (url, options, map, thisMap) {

			$(thisMap).append('<div class="mapLoading">Loading Tweets...</div>');

			var markersArray = [];

			$.getJSON(url, function (data) {
				if (data.results.length === 0) {
					if (console.error) {
						console.error('We have no location data');
					}
					return false;
				}
				$.each(data.results, function (key, value) {
					if (value.geo) {
						var pos = new google.maps.LatLng(value.geo.coordinates[0], value.geo.coordinates[1]),
							icon = new google.maps.MarkerImage(options.marker, null, null, null, new google.maps.Size(50, 50)),
							marker = new google.maps.Marker({
								icon: icon,
								position: pos,
								map: map,
								optimized: false
							}),

							tweetImage = '',
							tweetText = '',
							onclick;

						if (value.entities.media) {
							if (value.entities.media[0].media_url_https) {
								tweetImage = '<img src="' + value.entities.media[0].media_url_https + ':small" class="tweetImage" />';
							}
						}

						if (value.text) {
							tweetText = linkify(value.text);
						}

						onclick = function (e) {
							$('.gmap-bubble').remove();
							var bubble = new MapBubble(pos, tweetImage + '<span class="tweetText">' + tweetText + '</span><span class="tweetTime timeago" title="' + value.created_at + '"></span>', options.windowwidth, options.windowheight);
							bubble.setMap(marker.getMap());
						};

						markersArray.push(marker);
						google.maps.event.addListener(marker, 'click', onclick);
					}
				});//loop

				$('.mapLoading', thisMap).remove();

				$(thisMap).trigger('markersLoaded');

				return markersArray;
			});//get json

			return markersArray;
		},

		getCustomMarkers = function (options, map) {
			if (options.customMarkers) {
				$.each(options.customMarkers, function (key, value) {
					var pos = new google.maps.LatLng(value.latitude, value.longitude),
						icon = new google.maps.MarkerImage(options.marker, null, null, null, new google.maps.Size(50, 50)),
						marker = new google.maps.Marker({
							icon: icon,
							position: pos,
							map: map,
							optimized: false
						}),

						onclick;

					onclick = function (e) {
						$('.gmap-bubble').remove();
						var bubble = new MapBubble(pos, value.html, options.windowwidth, options.windowheight);
						bubble.setMap(marker.getMap());
					};
					google.maps.event.addListener(marker, 'click', onclick);
				});
			}
		},

		clearOverlays = function (pluginRefresh) {
			if (pluginRefresh.feed) {
				var markers = pluginRefresh.feed;

				for (var i = 0; i < markers.length; i += 1) {
					markers[i].setMap(null);

					if (i === (markers.length - 1)) {
						mapLoaded(pluginRefresh);
					}
				}
			}
		},

		// Options are:
		// ROADMAP - displays the normal, default 2D tiles of Google Maps.
		// SATELLITE - displays photographic tiles.
		// HYBRID - displays a mix of photographic tiles and a tile layer for prominent features (roads, city names).
		// TERRAIN - displays physical relief tiles for displaying elevation and water features (mountains, rivers, etc.)
		getMapTileType = function (type) {
			switch (type) {
			case 'ROADMAP':
				return google.maps.MapTypeId.ROADMAP;
			case 'SATELLITE':
				return google.maps.MapTypeId.SATELLITE;
			case 'HYBRID':
				return google.maps.MapTypeId.HYBRID;
			case 'TERRAIN':
				return google.maps.MapTypeId.TERRAIN;
			default:
				return google.maps.MapTypeId.ROADMAP;
			}
		},

		mapLoaded = function (tweetmap) {
			tweetmap.url = createSearchURL(tweetmap.twitterOptions);
			tweetmap.feed = getFeed(tweetmap.url, tweetmap.options, tweetmap.map, tweetmap.mapElem);

			if (!isEmpty(tweetmap.options.customMarkers)) {
				getCustomMarkers(tweetmap.options, tweetmap.map);
			}

			if (console.log) {
				console.log(tweetmap.url);
			}
		},

		pluginName = 'tweetMap',
		document = window.document,
		defaults = {
			latitude: '',
			longitude: '',
			zoom: 11,
			marker: 'tweetmap/marker.png',
			maptype: 'ROADMAP',
			windowheight: '',
			windowwidth: '',
			q: '',
			geocode: '',
			result_type: 'recent',
			rpp: '100',
			until: '',
			since_id: '',
			max_id: '',
			include_entities: 'true',
			customMarkers: {
				// marker: {
				// latitude: '-36.84731121505897',
				// longitude: '174.76342678070068',
				// html: '<p>Hello world.</p>'
				// }
			}
		},

		isEmpty = function (obj) {
			return Object.keys(obj).length === 0;
		};

	function Plugin(element, options, refresh) {
		this.element = element;
		this.options = $.extend({}, defaults, options);

		this.twitterOptions = {
			q: this.options.q,
			geocode: this.options.geocode,
			result_type: this.options.result_type,
			rpp: this.options.rpp,
			until: this.options.until,
			since_id: this.options.since_id,
			max_id: this.options.max_id,
			include_entities: this.options.include_entities
		};

		this.mapElem = $(this.element)[0];
		this.mapType = getMapTileType(this.options.maptype);

		this.mapOptions = {
			zoom: this.options.zoom,
			center: new google.maps.LatLng(this.options.latitude, this.options.longitude),
			mapTypeId: this.mapType
		};


		this.refresh();
		this.init();
	}

	Plugin.prototype.refresh = function () {
		var pluginRefresh = $(this).data('plugin_' + pluginName);
		if (pluginRefresh) {
			clearOverlays(pluginRefresh);
		}
	};

	Plugin.prototype.init = function () {
		var tweetmap = this;
		this.map = new google.maps.Map(this.mapElem, this.mapOptions);
		google.maps.event.addListenerOnce(this.map, 'idle', function (data) {
			mapLoaded(tweetmap);
		});
	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function (options) {
		return this.each(function () {
			var data = $(this).data('plugin_' + pluginName);
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
			if (typeof options == 'string') {
				data[options].call(this);
			}
		});
	};

}(jQuery, window));