<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { GetAccessCode, UpdateAccessCode } from '$lib/generated/graphql';
	import { onMount } from 'svelte';
	import { setIsLoading } from '$lib/store';
	import CodeCard from '$lib/components/codeCard/index.svelte';

	$: response = GetAccessCode({});

	let queueCode = null,
		staffCode = null;

	onMount(() => {
		const sub = response.subscribe(({ data, loading }) => {
			setIsLoading(loading);
			queueCode = data?.myHospital.accessCodes.find((c) => c.userType === 'QUEUE_MANAGER')
				?.accessCode;
			staffCode = data?.myHospital.accessCodes.find((c) => c.userType === 'STAFF')?.accessCode;
			if (!loading) sub();
		});
	});

	async function saveNewCode(accessCode: string, userType: string) {
		setIsLoading(true);
		const { data } = await UpdateAccessCode({ variables: { data: { accessCode, userType } } });
		setIsLoading(false);
		if (data) {
			queueCode = data.updateAccessCode.accessCodes.find((c) => c.userType === 'QUEUE_MANAGER')
				?.accessCode;
			staffCode = data.updateAccessCode.accessCodes.find((c) => c.userType === 'STAFF')?.accessCode;
		}
	}
</script>

<svelte:head>
	<title>{$_('healthcare_code_title')}</title>
</svelte:head>

<div class="text-3xl pb-2">{$_('invitation_code')}</div>
<CodeCard
	title="queue_manager_label"
	code={queueCode}
	on:save={(v) => saveNewCode(v.detail, 'QUEUE_MANAGER')}
/>
<CodeCard title="staff_label" code={staffCode} on:save={(v) => saveNewCode(v.detail, 'STAFF')} />
