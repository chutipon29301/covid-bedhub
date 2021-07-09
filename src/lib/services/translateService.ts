import copywriting from '$lib/constants/languagePack.json';
import { writable } from 'svelte/store';
import { addMessages, init, locale } from 'svelte-i18n';

export class Translate {
	currentLang: 'th' | 'en' = 'th';
	currentLang$ = writable<'th' | 'en'>('th');

	constructor() {
		addMessages('th', copywriting.th);
		// addMessages('en', copywriting.en); // TODO: waiting for the localization

		init({
			fallbackLocale: 'th',
			initialLocale: 'th'
		});
	}

	instant(key: string): string {
		return copywriting[this.currentLang][key] || key;
	}

	changeLang(): void {
		const lang = this.currentLang === 'en' ? 'th' : 'en';
		locale.set(lang);
		this.currentLang = lang;
		this.currentLang$.set(lang);
	}
}
