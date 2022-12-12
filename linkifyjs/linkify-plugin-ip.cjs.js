'use strict';

var linkifyjs = require('linkifyjs');

var B_IPV6_B = 'B_IPV6_B'; // 'bracket [', IPV6, '] bracket'

var IPv4Token = linkifyjs.createTokenClass('ipv4', {
  isLink: true,
  toHref: function toHref(scheme) {
    if (scheme === void 0) {
      scheme = linkifyjs.options.defaults.defaultProtocol;
    }

    return scheme + "://" + this.v;
  }
});
/**
 * @type {import('linkifyjs').TokenPlugin}
 */

function ipv4Tokens(_ref) {
  var scanner = _ref.scanner;
  var start = scanner.start;
  var flags = {
    byte: true,
    numeric: true
  }; // States for [0, 9]

  var Digits = [];

  for (var i = 0; i < 10; i++) {
    var x = start.tt("" + i, "" + i, flags);
    Digits.push(x);
  } // States [10, 99]


  for (var _i = 1; _i < 10; _i++) {
    var _x = Digits[_i];

    for (var j = 0; j < 10; j++) {
      _x.tt("" + j, "" + _i + j, flags);
    }
  } // States for [100, 199]


  for (var _i2 = 0; _i2 < 10; _i2++) {
    var _xx = Digits[1].tt("" + _i2);

    for (var _j = 0; _j < 10; _j++) {
      _xx.tt("" + _j, "1" + _i2 + _j, flags);
    }
  } // States for [200, 249]


  for (var _i3 = 0; _i3 < 5; _i3++) {
    var _xx2 = Digits[2].tt("" + _i3);

    for (var _j2 = 0; _j2 < 10; _j2++) {
      _xx2.tt("" + _j2, "2" + _i3 + _j2, flags);
    }
  } // States for [250, 255]


  var xx = Digits[2].tt('5');

  for (var _i4 = 0; _i4 < 6; _i4++) {
    xx.tt("" + _i4, "25" + _i4, flags);
  }
}
/**
 * @type {import('linkifyjs').TokenPlugin}
 */

var ipv6Tokens = function ipv6Tokens(_ref2) {
  var scanner = _ref2.scanner;
  var start = scanner.start;
  var HEX = /[0-9a-f]/;
  var z = start.tt('['); // [

  var _ = z.tt(':'); // [:


  var x = z.tr(HEX);
  var x_ = x.tt(':');
  var x_x = x_.tr(HEX);
  var x_x_ = x_x.tt(':');
  var x_x_x = x_x_.tr(HEX);
  var x_x_x_ = x_x_x.tt(':');
  var x_x_x_x = x_x_x_.tr(HEX);
  var x_x_x_x_ = x_x_x_x.tt(':');
  var x_x_x_x_x = x_x_x_x_.tr(HEX);
  var x_x_x_x_x_ = x_x_x_x_x.tt(':');
  var x_x_x_x_x_x = x_x_x_x_x_.tr(HEX);
  var x_x_x_x_x_x_ = x_x_x_x_x_x.tt(':');
  var x_x_x_x_x_x_x = x_x_x_x_x_x_.tr(HEX);
  var x_x_x_x_x_x_x_ = x_x_x_x_x_x_x.tt(':');
  var x_x_x_x_x_x_x_x = x_x_x_x_x_x_x_.tr(HEX);
  var BIpv6B = x_x_x_x_x_x_x_x.tt(']', B_IPV6_B);
  x_x_x_x_x_x_x_.tt(']', BIpv6B); // Note: This isn't quite right because it allows unlimited components but
  // it's proved difficult to come up with a correct implementation.

  var __ = _.tt(':'); // [::


  var __x = __.tr(HEX);

  var __x_ = __x.tt(':');

  __x_.tt(':', __);

  __x_.tr(HEX, __x);

  x_.tt(':', __);
  x_x_.tt(':', __);
  x_x_x_.tt(':', __);
  x_x_x_x_.tt(':', __);
  x_x_x_x_x_.tt(':', __);
  x_x_x_x_x_x_.tt(':', __);

  _.tr(HEX, x_x);

  __.tt(']', BIpv6B);

  __x.tt(']', BIpv6B);

  __x_.tt(']', BIpv6B); // Ensures max of 4 items per component are allowed


  for (var i = 1; i < 4; i++) {
    x = x.tr(HEX);
    x_x = x_x.tr(HEX);
    x_x_x = x_x_x.tr(HEX);
    x_x_x_x = x_x_x_x.tr(HEX);
    x_x_x_x_x = x_x_x_x_x.tr(HEX);
    x_x_x_x_x_x = x_x_x_x_x_x.tr(HEX);
    x_x_x_x_x_x_x = x_x_x_x_x_x_x.tr(HEX);
    x_x_x_x_x_x_x_x = x_x_x_x_x_x_x_x.tr(HEX);
    x.tt(':', x_);
    x_x.tt(':', x_x_);
    x_x_x.tt(':', x_x_x_);
    x_x_x_x.tt(':', x_x_x_x_);
    x_x_x_x_x.tt(':', x_x_x_x_x_);
    x_x_x_x_x_x.tt(':', x_x_x_x_x_x_);
    x_x_x_x_x_x_x.tt(':', x_x_x_x_x_x_x_);
    x_x_x_x_x_x_x_x.tt(']', BIpv6B);
    __x = __x.tr(HEX);

    __x.tt(':', __x_);

    __x.tt(']', BIpv6B);
  }
};
/**
 * @type {import('linkifyjs').Plugin}
 */

function ip(_ref3) {
  var scanner = _ref3.scanner,
      parser = _ref3.parser;
  var _scanner$tokens = scanner.tokens,
      COLON = _scanner$tokens.COLON,
      DOT = _scanner$tokens.DOT,
      SLASH = _scanner$tokens.SLASH,
      LOCALHOST = _scanner$tokens.LOCALHOST,
      SLASH_SCHEME = _scanner$tokens.SLASH_SCHEME,
      groups = _scanner$tokens.groups;
  var ByteDot = new linkifyjs.State();
  var ByteDotByte = new linkifyjs.State();
  var ByteDotByteDotByte = new linkifyjs.State();
  var IPv4 = new linkifyjs.State(IPv4Token);

  for (var i = 0; i < groups.byte.length; i++) {
    parser.start.tt(groups.byte[i]).tt(DOT, ByteDot);
  }

  ByteDot.ta(groups.byte, ByteDotByte);
  ByteDotByte.tt(DOT).ta(groups.byte, ByteDotByteDotByte);
  ByteDotByteDotByte.tt(DOT).ta(groups.byte, IPv4); // If IP followed by port or slash, make URL. Get existing URL state

  var Url = parser.start.go(LOCALHOST).go(SLASH);
  IPv4.tt(SLASH, Url);
  var IPv4Colon = IPv4.tt(COLON);
  var IPv4ColonPort = new linkifyjs.State(linkifyjs.multi.Url);
  IPv4Colon.ta(groups.numeric, IPv4ColonPort);
  IPv4ColonPort.tt(SLASH, Url); // Detect IPv6 when followed by URL prefix

  var UriPrefix = parser.start.go(SLASH_SCHEME).go(COLON).go(SLASH).go(SLASH);
  var UriPrefixIPv6 = UriPrefix.tt(B_IPV6_B, linkifyjs.multi.Url);
  UriPrefixIPv6.tt(SLASH, Url);
  var UriPrefixIPv6Colon = UriPrefixIPv6.tt(COLON);
  var UriPrefixIPv6ColonPort = new linkifyjs.State(linkifyjs.multi.Url);
  UriPrefixIPv6Colon.ta(groups.numeric, UriPrefixIPv6ColonPort);
  UriPrefixIPv6ColonPort.tt(SLASH, Url);
}

linkifyjs.registerTokenPlugin('ipv4', ipv4Tokens);
linkifyjs.registerTokenPlugin('ipv6', ipv6Tokens);
linkifyjs.registerPlugin('ip', ip);
