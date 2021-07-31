<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';
	import { faTimes } from '@fortawesome/free-solid-svg-icons';
	import Fa from '../fa/index.svelte';
	import Switcher from './Switcher.svelte';

	export let placeholder = 'Select Date';
	export let value: Date = undefined;
	export let visible = false;
	export let years_map = [1900, new Date().getFullYear()];
	export let classes = '';
	export let disabled = false;
	export let errorMessage = '';
	export let required = false;

	let requiredError: string;
	let date = value || new Date();
	let years_count = years_map[1] - years_map[0] + 1;
	const MONTHS = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'July',
		'Aug',
		'Sept',
		'Oct',
		'Nov',
		'Dec'
	];
	const YEARS: number[] = new Array(years_count).fill(years_map[0]).map((v, i) => v + i);
	const WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const dispatch = createEventDispatcher();
	let _date: string, popup: HTMLElement;
	$: DAYS = new Array(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate())
		.fill(1)
		.map((v, i) => v + i);
	$: _date = value?.toDateString();
	let cancel = () => {
		document.body.style.overflow = 'initial';
		value = null;
		visible = false;
		if (required) requiredError = $_('required_field_error');
	};
	let dateChanged = (event: CustomEvent) => {
		let { type, changedData } = event.detail;
		let newDate = new Date();
		if (type === 'day') {
			newDate = new Date(date.getFullYear(), date.getMonth(), changedData + 1);
		} else if (type === 'month') {
			let maxDayInSelectedMonth = new Date(date.getFullYear(), changedData + 1, 0).getDate();
			let day = Math.min(date.getDate(), maxDayInSelectedMonth);
			newDate = new Date(date.getFullYear(), changedData, day);
		} else if (type === 'year') {
			let maxDayInSelectedMonth = new Date(
				years_map[1] + changedData,
				date.getMonth() + 1,
				0
			).getDate();
			let day = Math.min(date.getDate(), maxDayInSelectedMonth);
			newDate = new Date(years_map[0] + changedData, date.getMonth(), day);
		}
		date = newDate;
		dispatch('dateChange', { date });
	};
	function confirmDate(event: MouseEvent) {
		requiredError = '';
		value = date;
		visible = !visible;
		dispatch('confirmDate', { MouseEvent: event, date });
		document.body.style.overflow = 'initial';
	}
	function openModal() {
		visible = !disabled && !visible;
		document.body.style.overflow = 'hidden';
	}
</script>

<div class="mt-2 items-center z-10 {classes}">
	<div
		class="f-outline px-2 relative w-full border rounded-lg focus-within:border-indigo-500"
		class:border-red-500={errorMessage || requiredError}
		class:bg-gray-200={disabled}
	>
		<input
			type="text"
			class="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
			readonly
			placeholder=" "
			bind:value={_date}
			on:focus={openModal}
		/>
		<label
			on:click={openModal}
			for="password"
			class="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 duration-300 origin-top-left"
			class:text-red-500={(errorMessage || requiredError) && !disabled}
			class:bg-transparent={disabled}
			class:bg-white={!disabled}
		>
			{placeholder}{required ? '*' : ''}
		</label>
	</div>
	{#if errorMessage || requiredError}
		<span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
			{errorMessage || requiredError}
		</span>
	{/if}
</div>
{#if visible}
	<div class="touch-date-popup" bind:this={popup}>
		<div>
			<div class="touch-date-wrapper relative">
				<div class="absolute right-6 top-4" on:click={() => (visible = false)}>
					<Fa class="cursor-pointer" icon={faTimes} />
				</div>
				<div class="date-line">{date.getDate()} {MONTHS[date.getMonth()]} {date.getFullYear()}</div>
				<p class="day-line">{WEEKDAY[date.getDay()]}</p>
				<div class="touch-date-picker">
					<Switcher type="day" data={DAYS} selected={date.getDate()} on:dateChange={dateChanged} />
					<Switcher
						type="month"
						data={MONTHS}
						selected={date.getMonth() + 1}
						on:dateChange={dateChanged}
					/>
					<Switcher
						type="year"
						data={YEARS.map((v) => v.toString())}
						selected={date.getFullYear() - years_map[0] + 1}
						on:dateChange={dateChanged}
					/>
				</div>
				<div class="touch-date-reset">
					<button on:click|stopPropagation={cancel}>{$_('reset_button')}</button>
					<button on:click|stopPropagation={confirmDate}>{$_('ok_button')}</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.touch-date-popup {
		z-index: 1;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
		touch-action: pan-down;
	}
	.touch-date-popup > div {
		background: var(--svtd-popup-bg-color, white);
		color: var(--svtd-popup-color, black);
		margin-top: 30vh;
		width: 85%;
		margin-left: 7%;
		border-radius: var(--svtd-popup-radius, 10px);
	}
	.touch-date-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-size: var(--svtd-font-size, 20px);
		padding: 1.5rem;
	}
	.touch-date-picker {
		display: flex;
		padding: 50px 20px;
		margin: 10px 0;
		overflow: hidden;
	}
	.touch-date-reset > button {
		width: 100px;
		height: 30px;
		border-radius: 15px;
		border: var(--svtd-border, 1px solid grey);
		outline: none;
		color: var(--svtd-button-color, black);
		background-color: var(--svtd-button-bg-color, transparent);
		box-shadow: var(--svtd-button-box-shadow, none);
		font-weight: 300;
	}
	.touch-date-reset button:active {
		-webkit-transform: scale(0.95);
		transform: scale(0.95);
	}
	.date-line {
		font-size: 30px;
		font-weight: 300;
	}
	.day-line {
		margin: 2px;
	}
	.f-outline input:focus-within ~ label,
	.f-outline input:not(:placeholder-shown) ~ label {
		transform: translateY(-1.5rem) translatex(-1rem) scaleX(0.8) scaleY(0.8);
	}
</style>
