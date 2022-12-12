import { createTokenClass, State, registerPlugin } from 'linkifyjs';

var HashtagToken = createTokenClass('hashtag', {
  isLink: true
});
/**
 * @type {import('linkifyjs').Plugin}
 */

function hashtag(_ref) {
  var scanner = _ref.scanner,
      parser = _ref.parser;
  // Various tokens that may compose a hashtag
  var _scanner$tokens = scanner.tokens,
      POUND = _scanner$tokens.POUND,
      UNDERSCORE = _scanner$tokens.UNDERSCORE;
  var _scanner$tokens$group = scanner.tokens.groups,
      alpha = _scanner$tokens$group.alpha,
      numeric = _scanner$tokens$group.numeric,
      alphanumeric = _scanner$tokens$group.alphanumeric; // Take or create a transition from start to the '#' sign (non-accepting)
  // Take transition from '#' to any text token to yield valid hashtag state
  // Account for leading underscore (non-accepting unless followed by alpha)

  var Hash = parser.start.tt(POUND);
  var HashPrefix = Hash.tt(UNDERSCORE);
  var Hashtag = new State(HashtagToken);
  Hash.ta(numeric, HashPrefix);
  Hash.ta(alpha, Hashtag);
  HashPrefix.ta(alpha, Hashtag);
  HashPrefix.ta(numeric, HashPrefix);
  HashPrefix.tt(UNDERSCORE, HashPrefix);
  Hashtag.ta(alphanumeric, Hashtag);
  Hashtag.tt(UNDERSCORE, Hashtag); // Trailing underscore is okay
}

registerPlugin('hashtag', hashtag);
