/* Sapphire: the glittery blob who answers questions about Shaniah.
   window.sapphireSVG(size) returns her as an inline SVG string. */
(function () {
  var n = 0;
  window.sapphireSVG = function (size) {
    var id = 'sph' + (n++);
    var s = size || 64;
    return '' +
'<svg class="sapphire" width="' + s + '" height="' + s + '" viewBox="0 0 120 120" aria-hidden="true" focusable="false">' +
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
    '<linearGradient id="' + id + 'h" x1="0" x2="1"><stop offset="0" stop-color="#FFE08A"/><stop offset=".5" stop-color="#FFC15A"/><stop offset="1" stop-color="#FF8A2B"/></linearGradient>' +
  '</defs>' +
  '<circle class="sph-aura" cx="60" cy="66" r="52" fill="url(#' + id + 'g)"/>' +
  '<g class="sph-float">' +
    '<ellipse class="sph-halo" cx="60" cy="17" rx="22" ry="6" fill="none" stroke="url(#' + id + 'h)" stroke-width="4"/>' +
    '<g class="sph-body">' +
      '<path d="M60 26 C 86 26, 104 44, 104 70 C 104 94, 86 106, 60 106 C 34 106, 16 95, 16 71 C 16 45, 33 26, 60 26 Z" fill="url(#' + id + 'b)"/>' +
      '<ellipse cx="42" cy="44" rx="13" ry="7" fill="#fff" opacity=".45" transform="rotate(-25 42 44)"/>' +
      // glitter
      '<g class="sph-glitter" fill="#fff">' +
        '<circle cx="30" cy="80" r="1.4"/><circle cx="88" cy="56" r="1.2"/><circle cx="78" cy="92" r="1.5"/><circle cx="50" cy="96" r="1"/><circle cx="94" cy="78" r="1"/><circle cx="26" cy="62" r="1"/>' +
        '<circle cx="66" cy="36" r="1.1" fill="#FFE08A"/><circle cx="40" cy="88" r="1.2" fill="#FFE08A"/><circle cx="84" cy="42" r="1" fill="#FFE08A"/>' +
        '<circle cx="22" cy="72" r=".8"/><circle cx="58" cy="100" r=".9" fill="#FFE08A"/><circle cx="98" cy="66" r=".8" fill="#FFE08A"/><circle cx="70" cy="98" r=".8"/><circle cx="56" cy="32" r=".8"/><circle cx="34" cy="94" r=".7"/>' +
        '<path class="gl1" d="M90 88 l1 2.3 2.3 1 -2.3 1 -1 2.3 -1 -2.3 -2.3 -1 2.3 -1z"/><path class="gl2" d="M28 50 l.9 2 2 .9 -2 .9 -.9 2 -.9 -2 -2 -.9 2 -.9z" fill="#FFE08A"/><path class="gl3" d="M62 92 l.8 1.8 1.8.8 -1.8.8 -.8 1.8 -.8 -1.8 -1.8 -.8 1.8 -.8z"/>' +
      '</g>' +
      // eyes
      '<g class="sph-eyes">' +
        '<ellipse cx="45" cy="66" rx="10" ry="12" fill="url(#' + id + 'i)"/><ellipse cx="75" cy="66" rx="10" ry="12" fill="url(#' + id + 'i)"/>' +
        '<circle cx="48.5" cy="63.5" r="3.4" fill="#fff"/><circle cx="78.5" cy="63.5" r="3.4" fill="#fff"/>' +
        '<circle cx="42" cy="71" r="1.6" fill="#fff" opacity=".9"/><circle cx="72" cy="71" r="1.6" fill="#fff" opacity=".9"/>' +
        '<path d="M45 70.5 l.9 1.9 1.9.9 -1.9.9 -.9 1.9 -.9 -1.9 -1.9 -.9 1.9 -.9z" fill="#FFE08A"/>' +
        '<path d="M75 70.5 l.9 1.9 1.9.9 -1.9.9 -.9 1.9 -.9 -1.9 -1.9 -.9 1.9 -.9z" fill="#FFE08A"/>' +
        // soft, knowing upper lids
        '<path d="M33 52 H57 V60 Q45 55 34 61 Z" fill="url(#' + id + 'b)"/><path d="M63 52 H87 V61 Q75 55 64 60 Z" fill="url(#' + id + 'b)"/>' +
        '<path d="M34.5 60.5 Q45 55.5 55.5 59.5 M64.5 59.5 Q75 55.5 85.5 60.5" stroke="#1A1F5E" stroke-width="2.2" stroke-linecap="round" fill="none"/>' +
        '<path d="M35.5 60 l-3.5 -2.5 M38.5 58.3 l-2.5 -3.2 M84.5 60 l3.5 -2.5 M81.5 58.3 l2.5 -3.2" stroke="#1A1F5E" stroke-width="1.6" stroke-linecap="round"/>' +
      '</g>' +
      '<ellipse cx="33" cy="81" rx="6" ry="3.2" fill="#FF9CC8" opacity=".55"/><ellipse cx="87" cy="81" rx="6" ry="3.2" fill="#FF9CC8" opacity=".55"/>' +
      '<path d="M55 83 q5 5 10 0" stroke="#1A1F5E" stroke-width="2.2" stroke-linecap="round" fill="none"/>' +
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
