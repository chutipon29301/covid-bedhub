<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import {
		CreatePatient,
		CreateTicket,
		Illness,
		Symptom,
		UpdatePatient
	} from '$lib/generated/graphql';
	import {
		checklistToEnum,
		dateToStringFormat,
		noFutureValidation,
		vaccinePopulate
	} from '$lib/util';
	import { form$, illnesses$, patientId$, symptoms$, vaccine$ } from './store/store';
	import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
	import { EModalColorTone } from '$lib/components/ui/modal/model';
	import { variables } from '$lib/constants/environment';
	import { onMount } from 'svelte';
	import { setIsLoading } from '$lib/store';
	import Button from '$lib/components/ui/button/index.svelte';
	import Modal from '$lib/components/ui/modal/dialog/index.svelte';
	import ProgressiveImg from '$lib/components/ui/progressiveImg/index.svelte';

	let canSubmitForm = false,
		successPopupShown = false,
		lat: number,
		lng: number;

	$: disabledSubmitBtn =
		!lat ||
		!lng ||
		!$form$?.firstName ||
		!$form$?.lastName ||
		!$form$?.dob ||
		!$form$?.sex ||
		!$form$?.mobile ||
		!$vaccine$?.examReceiveDate ||
		!$vaccine$?.examLocation ||
		!$vaccine$?.examDate ||
		!noFutureValidation($vaccine$?.examReceiveDate) ||
		!noFutureValidation($vaccine$?.examDate) ||
		$vaccine$?.vaccines.every((v) => !(!v.name === !v.dateReceived));

	onMount(() => {
		if (!$form$) goto(ROUTES.TICKET);
	});

	function setGPS() {
		if (variables.dev) {
			lat = 13.966461495650773;
			lng = 100.54753924040311;
			canSubmitForm = true;
			return;
		}
		if (navigator.geolocation)
			navigator.geolocation.getCurrentPosition((position) => {
				lat = position.coords.latitude;
				lng = position.coords.longitude;
				canSubmitForm = true;
			});
		else alert("This website doesn't support this browser");
	}

	async function submit() {
		if (disabledSubmitBtn) return;
		setIsLoading(true);
		const id = $patientId$ ? await existedPatient($patientId$) : await newPatient();
		if (!id) return;
		const success = await createTix(id);
		setIsLoading(false);
		if (success) window.localStorage.clear();
	}

	async function newPatient(): Promise<string> {
		const { data } = await CreatePatient({
			variables: {
				data: {
					identification: $form$.id,
					firstName: $form$.firstName,
					lastName: $form$.lastName,
					birthDate: dateToStringFormat($form$.dob),
					sex: $form$.sex,
					tel: $form$.mobile,
					illnesses: checklistToEnum<Illness>($illnesses$)
				}
			}
		});
		return data?.createPatient.id;
	}

	async function existedPatient(id: string): Promise<string> {
		await UpdatePatient({
			variables: {
				data: {
					firstName: $form$.firstName,
					lastName: $form$.lastName,
					birthDate: dateToStringFormat($form$.dob),
					sex: $form$.sex,
					tel: $form$.mobile,
					illnesses: checklistToEnum<Illness>($illnesses$)
				},
				id: id
			}
		});
		return id;
	}

	async function createTix(id: string): Promise<boolean> {
		const response = await CreateTicket({
			variables: {
				data: {
					patientId: +id,
					examReceiveDate: dateToStringFormat($vaccine$?.examReceiveDate),
					examDate: dateToStringFormat($vaccine$?.examDate),
					examLocation: $vaccine$?.examLocation,
					symptoms: checklistToEnum<Symptom>($symptoms$),
					vaccines: vaccinePopulate($vaccine$?.vaccines),
					lat,
					lng
				}
			}
		});

		successPopupShown = !!response?.data;
		return !!response?.data;
	}

	function onClickOkPopup() {
		successPopupShown = false;
		goto(ROUTES.HOME);
	}
</script>

<svelte:head>
	<title>{$_('find_location_web_title')}</title>
</svelte:head>

{#if successPopupShown}
	<Modal
		icon={faCheckCircle}
		heading={$_('request_popup_heading')}
		confirmBtn={'OK'}
		colorTone={EModalColorTone.GREEN}
		on:confirm={onClickOkPopup}
	>
		{$_('request_popup_message')}
	</Modal>
{/if}
<div class="flex flex-col justify-center items-center">
	<div class="pt-8 lg:pt-0 pb-2 px-8 text-center text-xl">
		{$_('request_location_explain')}
	</div>
	<ProgressiveImg
		class="w-1/2 py-8 max-w-md"
		src="/button/request-for-location_progressive.png"
		dataSrc="/button/request-for-location.png"
		alt="RequestLoc"
	/>
	{#if !canSubmitForm}
		<div class="flex flex-col items-center">
			<Button class="mb-4" on:click={setGPS} placeholder={$_('allow_location_button')} />
			<p class="text-sm text-gray-500 text-center">
				{$_('request_location_disclaimer')}
			</p>
		</div>
	{:else}
		<div class="flex flex-col items-center">
			<Button
				disabled={disabledSubmitBtn}
				placeholder={$_('confirm_submission_button')}
				on:click={submit}
			/>
			{#if disabledSubmitBtn}
				<div class="text-sm text-red-500 text-center mt-4">
					{$_('information_incomplete_inline_error')}
				</div>
			{/if}
		</div>
	{/if}
</div>
