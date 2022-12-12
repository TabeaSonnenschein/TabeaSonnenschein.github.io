(function (linkifyjs) {
	'use strict';

	var TicketToken = linkifyjs.createTokenClass('ticket', {
	  isLink: true
	});
	/**
	 * @type {import('linkifyjs').Plugin}
	 */

	function ticket(_ref) {
	  var scanner = _ref.scanner,
	      parser = _ref.parser;
	  // TODO: Add cross-repo style tickets? e.g., Hypercontext/linkifyjs#42
	  // Is that even feasible?
	  var _scanner$tokens = scanner.tokens,
	      POUND = _scanner$tokens.POUND,
	      groups = _scanner$tokens.groups;
	  var Hash = parser.start.tt(POUND);
	  var Ticket = new linkifyjs.State(TicketToken);
	  Hash.ta(groups.numeric, Ticket);
	}

	linkifyjs.registerPlugin('ticket', ticket);

})(linkify);
