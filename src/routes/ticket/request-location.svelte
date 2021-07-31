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

	let canSubmitForm = false,
		successPopupShown = false,
		ticketId: string,
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

	$: disabledSaveBtn = !$illnesses$ || !$symptoms$ || !$form$ || !$vaccine$;

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
		await createTix(id);
		setIsLoading(false);
		window.localStorage.clear();
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
		return data.createPatient.id;
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

	async function createTix(id: string): Promise<void> {
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

		if (response?.data) {
			ticketId = response?.data.createTicket.id;
			successPopupShown = true;
		}
	}

	function onClickOkPopup() {
		successPopupShown = false;
		goto(ROUTES.HOME);
	}
</script>

{#if successPopupShown}
	<Modal
		icon={faCheckCircle}
		heading={$_('request_popup_heading')}
		confirmBtn={'OK'}
		colorTone={EModalColorTone.GREEN}
		on:confirm={onClickOkPopup}
	>
		{$_('request_popup_message', { values: { ticketId } })}
	</Modal>
{/if}
<div class="flex flex-col justify-center flex-grow min-h-screen">
	<div class="pb-2">
		Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
		Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
		mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
		quis enim.
	</div>

	{#if !canSubmitForm}
		<div class="flex flex-col items-center">
			<Button class="mb-2" on:click={setGPS} placeholder="กดปุ่มเพื่อ allow location" />
		</div>
	{:else}
		<div class="flex flex-col items-center">
			<Button disabled={disabledSubmitBtn} placeholder="ยืนยันการส่งข้อมูล" on:click={submit} />
			{#if disabledSubmitBtn}
				<div class="text-sm text-red-500">มีข้อมูลบางอย่างยังไม่ครบถ้วน กรุณาตรวจสอบอีกครั้ง</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.min-h-screen {
		min-height: calc(100vh - 18rem);
	}
</style>
