import button from './checkout/button';
import * as dom from './utils/dom';
import * as events from './utils/events';
import * as ext from './utils/ext';

export default {
	components: {
		button: (new button()),
	},
	utils: {
		dom: dom,
		events: events,
		ext: ext
	}
}
