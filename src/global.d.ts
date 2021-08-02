/// <reference types="@sveltejs/kit" />

interface ImportMetaEnv {
	VITE_API_URL: string;
	VITE_DEVELOP: boolean;
	VITE_SENTRY_URL: string;
	VITE_GA_MEASURE_ID: string;
}

interface Window {
	dataLayer: unknown[];
	gtag: (arg1: unknown, arg2: unknown, arg3: unknown) => void;
}
