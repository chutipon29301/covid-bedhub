import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

export class SentryService {
	constructor() {
		Sentry.init({
			dsn: import.meta.env.VITE_SENTRY_URL,
			environment: import.meta.env.VITE_DEVELOP ? 'development' : 'production',
			tracesSampleRate: 1.0,
			integrations: [new Integrations.BrowserTracing()]
		});
	}
}

export default SentryService;
