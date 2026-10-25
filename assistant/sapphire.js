/* Sapphire: the stardust blob who answers questions about Niah.
   window.sapphireSVG(size) returns her as an inline SVG string.
   window.sapphireMood(mood) changes her expression everywhere she appears:
   'idle', 'listening', 'thinking', 'happy' or 'puzzled'. */
(function () {
  var n = 0;
  var SHAPES = [
    'M60 28 C 86 28, 102 46, 102 70 C 102 93, 85 104, 60 104 C 35 104, 18 94, 18 71 C 18 46, 34 28, 60 28 Z',
    'M60 31 C 89 27, 105 49, 101 73 C 98 95, 82 105, 57 103 C 32 101, 16 91, 19 67 C 22 43, 36 34, 60 31 Z',
    'M63 27 C 85 31, 99 44, 103 67 C 105 92, 88 106, 62 104 C 38 103, 19 97, 17 74 C 15 48, 38 24, 63 27 Z'
  ];
  window.sapphireMood = function (mood) {
    Array.prototype.forEach.call(document.querySelectorAll('svg.sapphire'), function (el) { el.setAttribute('data-mood', mood || 'idle'); });
  };
  window.sapphireSVG = function (size) {
    var id = 'sph' + (n++);
    var s = size || 64;
    var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return '' +
'<svg class="sapphire" width="' + s + '" height="' + s + '" viewBox="2 18 116 104" data-mood="idle" aria-hidden="true" focusable="false">' +
  '<defs>' +
    '<radialGradient id="' + id + 'b" gradientUnits="userSpaceOnUse" cx="46" cy="46" r="72">' +
      '<stop offset="0" stop-color="#C9D2FF"/><stop offset=".45" stop-color="#7C86F0"/><stop offset="1" stop-color="#3D46B0"/>' +
    '</radialGradient>' +
    '<radialGradient id="' + id + 'g" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0" stop-color="#B9C2FF" stop-opacity=".75"/><stop offset="1" stop-color="#B9C2FF" stop-opacity="0"/>' +
    '</radialGradient>' +
    '<radialGradient id="' + id + 'i" cx="50%" cy="35%" r="70%">' +
      '<stop offset="0" stop-color="#8FE3FF"/><stop offset=".5" stop-color="#4B57D8"/><stop offset="1" stop-color="#1A1F5E"/>' +
    '</radialGradient>' +
    '<filter id="' + id + 'w" filterUnits="userSpaceOnUse" x="-20" y="-20" width="160" height="160"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="3" seed="3"/><feDisplacementMap in="SourceGraphic" scale="17" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="2.6"/></filter>' +
    '<filter id="' + id + 's" filterUnits="userSpaceOnUse" x="-20" y="-20" width="160" height="160"><feGaussianBlur stdDeviation="6"/></filter>' +
    '<filter id="' + id + 't" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.2"/></filter>' +
    '<clipPath id="' + id + 'c"><path d="M30 62 Q45 56 60 61 V82 H30 Z M60 61 Q75 56 90 62 V82 H60 Z"/></clipPath>' +
  '</defs>' +
  '<circle class="sph-aura" cx="60" cy="66" r="52" fill="url(#' + id + 'g)"/>' +
  '<g class="sph-float">' +
    '<g class="sph-body">' +
      // a soft cloud of gas and stardust
      '<g class="sph-nebula">' +
        // the outer cloud slowly changes shape
        '<path d="' + SHAPES[0] + '" fill="#6E78E6" opacity=".6" filter="url(#' + id + 'w)">' +
          (still ? '' : '<animate attributeName="d" dur="7s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.33;.66;1" keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1" values="' + SHAPES.concat(SHAPES[0]).join(';') + '"/>') +
        '</path>' +
        '<ellipse cx="62" cy="96" rx="32" ry="11" fill="#2E358F" opacity=".55" filter="url(#' + id + 's)"/>' +
        '<ellipse cx="60" cy="68" rx="34" ry="30" fill="#8C96FF" opacity=".7" filter="url(#' + id + 's)"/>' +
        '<ellipse class="sph-wisp1" cx="40" cy="86" rx="20" ry="12" fill="#E68BE3" opacity=".5" filter="url(#' + id + 's)"/>' +
        '<ellipse class="sph-wisp2" cx="84" cy="50" rx="17" ry="12" fill="#7FD8FF" opacity=".45" filter="url(#' + id + 's)"/>' +
        '<ellipse cx="38" cy="46" rx="14" ry="10" fill="#B6A2FF" opacity=".5" filter="url(#' + id + 's)"/>' +
        '<ellipse cx="60" cy="68" rx="25" ry="19" fill="#D8DEFF" opacity=".38" filter="url(#' + id + 's)"/>' +
        '<path class="sph-wisp3" d="M96 84 C 108 90, 110 100, 100 106 C 106 98, 100 92, 92 92 Z" fill="#9AA4FF" opacity=".5" filter="url(#' + id + 'w)"/>' +
        '<path d="M22 54 C 10 50, 8 40, 16 34 C 13 42, 18 48, 26 48 Z" fill="#B6A2FF" opacity=".45" filter="url(#' + id + 'w)"/>' +
      '</g>' +
      '<g class="sph-dust" filter="url(#' + id + 't)" opacity=".8">' + '<circle cx="52.7" cy="81.2" r="1.2" fill="#CFE8FF" opacity="0.48"/><circle cx="86.6" cy="84.2" r="1" fill="#fff" opacity="0.57"/><circle cx="83.0" cy="81.4" r="1" fill="#fff" opacity="0.52"/><circle cx="38.1" cy="46.8" r="0.5" fill="#FFE08A" opacity="0.77"/><circle cx="33.0" cy="81.6" r="1" fill="#fff" opacity="0.62"/><circle cx="85.3" cy="85.3" r="0.6" fill="#CFE8FF" opacity="0.65"/><circle cx="52.6" cy="40.3" r="1" fill="#CFE8FF" opacity="0.56"/><circle cx="48.5" cy="100.2" r="1.2" fill="#fff" opacity="0.88"/><circle cx="85.4" cy="45.1" r="0.7" fill="#fff" opacity="0.78"/><circle cx="80.0" cy="84.6" r="0.7" fill="#FFE08A" opacity="0.53"/><circle cx="23.7" cy="85.6" r="0.5" fill="#CFE8FF" opacity="0.87"/><circle cx="69.2" cy="34.7" r="0.7" fill="#CFE8FF" opacity="0.83"/><circle cx="22.5" cy="68.7" r="0.5" fill="#fff" opacity="0.91"/><circle cx="26.2" cy="73.0" r="0.5" fill="#fff" opacity="0.85"/><circle cx="34.8" cy="37.8" r="0.8" fill="#FFE08A" opacity="0.61"/><circle cx="37.4" cy="50.9" r="0.6" fill="#fff" opacity="0.87"/><circle cx="58.1" cy="44.1" r="0.8" fill="#FFE08A" opacity="0.49"/><circle cx="42.0" cy="79.6" r="0.6" fill="#CFE8FF" opacity="0.9"/><circle cx="55.2" cy="92.1" r="0.7" fill="#FFE08A" opacity="0.83"/><circle cx="69.0" cy="84.4" r="0.6" fill="#CFE8FF" opacity="0.46"/><circle cx="69.2" cy="86.4" r="0.6" fill="#fff" opacity="0.68"/><circle cx="87.4" cy="93.0" r="1" fill="#fff" opacity="0.81"/><circle cx="22.2" cy="77.5" r="1.2" fill="#FFE08A" opacity="0.89"/><circle cx="38.9" cy="82.3" r="0.8" fill="#fff" opacity="0.8"/><circle cx="79.0" cy="111.9" r="0.8" fill="#fff" opacity="0.54"/><circle cx="24.9" cy="53.8" r="0.7" fill="#fff" opacity="0.79"/><circle cx="89.0" cy="41.6" r="0.6" fill="#fff" opacity="0.8"/><circle cx="31.1" cy="48.4" r="0.5" fill="#FFE08A" opacity="0.92"/><circle cx="30.9" cy="71.3" r="0.6" fill="#fff" opacity="0.51"/><circle cx="57.8" cy="35.2" r="1.2" fill="#fff" opacity="0.54"/><circle cx="74.2" cy="112.5" r="0.7" fill="#CFE8FF" opacity="0.53"/><circle cx="99.2" cy="46.8" r="0.7" fill="#fff" opacity="0.99"/><circle cx="51.1" cy="45.1" r="0.7" fill="#fff" opacity="0.95"/><circle cx="65.3" cy="33.7" r="1" fill="#fff" opacity="0.63"/><circle cx="24.7" cy="40.5" r="0.6" fill="#FFE08A" opacity="0.89"/>' +
      '</g>' +
      // glitter
      '<g class="sph-glitter" fill="#fff">' +
        '<circle cx="30" cy="80" r="1.4"/><circle cx="88" cy="56" r="1.2"/><circle cx="78" cy="92" r="1.5"/><circle cx="50" cy="96" r="1"/><circle cx="94" cy="78" r="1"/><circle cx="26" cy="62" r="1"/>' +
        '<circle cx="66" cy="36" r="1.1" fill="#FFE08A"/><circle cx="40" cy="88" r="1.2" fill="#FFE08A"/><circle cx="84" cy="42" r="1" fill="#FFE08A"/>' +
        '<circle cx="22" cy="72" r=".8"/><circle cx="58" cy="100" r=".9" fill="#FFE08A"/><circle cx="98" cy="66" r=".8" fill="#FFE08A"/><circle cx="70" cy="98" r=".8"/><circle cx="56" cy="32" r=".8"/><circle cx="34" cy="94" r=".7"/>' +
        '<path class="gl1" d="M90 88 l1 2.3 2.3 1 -2.3 1 -1 2.3 -1 -2.3 -2.3 -1 2.3 -1z"/><path class="gl2" d="M28 50 l.9 2 2 .9 -2 .9 -.9 2 -.9 -2 -2 -.9 2 -.9z" fill="#FFE08A"/><path class="gl3" d="M62 92 l.8 1.8 1.8.8 -1.8.8 -.8 1.8 -.8 -1.8 -1.8 -.8 1.8 -.8z"/>' +
      '</g>' +
      // eyes
      '<g class="sph-face">' +
      '<g class="sph-eyes">' +
        '<g class="sph-open">' +
        '<g clip-path="url(#' + id + 'c)">' +
        '<g class="sph-look">' +
        '<ellipse cx="45" cy="66" rx="10" ry="12" fill="url(#' + id + 'i)"/><ellipse cx="75" cy="66" rx="10" ry="12" fill="url(#' + id + 'i)"/>' +
        '<circle cx="48.5" cy="65" r="3.2" fill="#fff"/><circle cx="78.5" cy="65" r="3.2" fill="#fff"/>' +
        '<circle cx="42" cy="71" r="1.6" fill="#fff" opacity=".9"/><circle cx="72" cy="71" r="1.6" fill="#fff" opacity=".9"/>' +
        '<path d="M45 70.5 l.9 1.9 1.9.9 -1.9.9 -.9 1.9 -.9 -1.9 -1.9 -.9 1.9 -.9z" fill="#FFE08A"/>' +
        '<path d="M75 70.5 l.9 1.9 1.9.9 -1.9.9 -.9 1.9 -.9 -1.9 -1.9 -.9 1.9 -.9z" fill="#FFE08A"/>' +
        '</g>' +
        '</g>' +
        // soft, knowing upper lids
        '<path d="M34.5 61.6 Q45 56.4 55.5 60.4 M64.5 60.4 Q75 56.4 85.5 61.6" stroke="#1A1F5E" stroke-width="2.2" stroke-linecap="round" fill="none"/>' +
        '<path d="M35.6 61 l-3.6 -2 M38.6 59.4 l-2.6 -3 M84.4 61 l3.6 -2 M81.4 59.4 l2.6 -3" stroke="#1A1F5E" stroke-width="1.6" stroke-linecap="round"/>' +
        '</g>' +
        // joyful closed eyes, shown when she's happy
        '<g class="sph-happy" stroke="#1A1F5E" stroke-width="2.6" stroke-linecap="round" fill="none">' +
          '<path d="M36 68 Q45 58 54 68 M66 68 Q75 58 84 68"/>' +
          '<path d="M35 64 l-3 -2 M85 64 l3 -2" stroke-width="1.6"/>' +
        '</g>' +
      '</g>' +
      '<ellipse cx="33" cy="81" rx="6" ry="3.2" fill="#FF9CC8" opacity=".6" filter="url(#' + id + 't)"/><ellipse cx="87" cy="81" rx="6" ry="3.2" fill="#FF9CC8" opacity=".6" filter="url(#' + id + 't)"/>' +
      '<g class="sph-mouth" stroke="#1A1F5E" stroke-width="2.2" stroke-linecap="round" fill="none">' +
        '<path class="m-smile" d="M55 83 q5 5 10 0"/>' +
        '<path class="m-grin" d="M53 81.5 q7 0 14 0 q-1 8 -7 8 q-6 0 -7 -8z" fill="#2A2F7A"/>' +
        '<ellipse class="m-o" cx="60" cy="85" rx="2.6" ry="3.2" fill="#2A2F7A"/>' +
        '<path class="m-flat" d="M56.5 85 q3.5 1.2 7 0"/>' +
      '</g>' +
      '</g>' +
    '</g>' +
  '</g>' +
  // sparkles around her
  '<g class="sph-sparkles" fill="#FFE08A">' +
    '<path class="sk1" d="M104 30 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z"/>' +
    '<path class="sk2" d="M14 40 l1.5 3.5 3.5 1.5 -3.5 1.5 -1.5 3.5 -1.5 -3.5 -3.5 -1.5 3.5 -1.5z" fill="#fff"/>' +
    '<path class="sk3" d="M108 96 l1.3 3 3 1.3 -3 1.3 -1.3 3 -1.3 -3 -3 -1.3 3 -1.3z"/>' +
  '</g>' +
'</svg>';
  };
})();
