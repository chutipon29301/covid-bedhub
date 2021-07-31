<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { onMount } from 'svelte';
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import { variables } from '$lib/constants/environment';
	import type { DecodedJwt } from '$lib/models';
	import Button from '$lib/components/ui/button/index.svelte';
	import Fa from '$lib/components/ui/fa/index.svelte';
	import cookie from 'cookie';
	import jwtDecode from 'jwt-decode';

	let screenSize: number, accountType: string;

	onMount(() => {
		screenSize = window.innerWidth;
		const { access_token } = cookie.parse(document.cookie);
		accountType = variables.dev
			? access_token?.split('-')[0]
			: access_token
			? jwtDecode<DecodedJwt>(access_token).accountType
			: null;
	});
</script>

<svelte:head>
	<title>{$_('home_title')}</title>
</svelte:head>

<div>
	{#if !accountType || accountType === 'reporter'}
		{#if screenSize > 1024}
			<img
				class="pb-1 cursor-pointer"
				src="/banner/patient_image.png"
				alt="PatientBanner"
				on:click={() => goto(ROUTES.LOGIN)}
			/>
		{:else}
			<img
				class="pb-1 cursor-pointer"
				src="/banner/patient_image_small.png"
				alt="PatientBanner"
				on:click={() => goto(ROUTES.LOGIN)}
			/>
		{/if}
		<Button
			class="w-full mb-4"
			placeholder={$_('login_as_patient')}
			on:click={() => goto(ROUTES.LOGIN)}
		>
			<span slot="icon"> <Fa class="pl-4" icon={faArrowRight} /></span>
		</Button>
		<div class="py-8 text-center">
			<p class="text-xl font-bold">3 ขั้นตอนง่ายๆ</p>
			<p class="text-3xl font-bold pt-8 text-indigo-400">1. ลงทะเบียน</p>
			<p class="text-md py-4 text-gray-500">ลงทะเบียนง่ายๆ ผ่าน LINE</p>
			<p class="text-3xl font-bold pt-8 text-indigo-400">2. กรอกข้อมูลผู้ป่วย</p>
			<p class="text-md py-4 text-gray-500">กรอกอาการป่วย + ข้อมูลเพื่อหาเตียง</p>
			<p class="text-3xl font-bold pt-8 text-indigo-400">3. กดค้นหา</p>
			<p class="text-md pt-4 text-gray-500">กดค้นหาและรอการตอบรับ<br />จากโรงพยาบาล</p>
		</div>
	{/if}
	{#if !accountType || accountType !== 'reporter'}
		<div class="pt-4">
			{#if screenSize > 1024}
				<img
					class="pb-1 cursor-pointer"
					src="/banner/admin_image.png"
					alt="PatientBanner"
					on:click={() => goto(ROUTES.HEALTHCARE)}
				/>
			{:else}
				<img
					class="pb-1 cursor-pointer"
					src="/banner/admin_image_small.png"
					alt="PatientBanner"
					on:click={() => goto(ROUTES.HEALTHCARE)}
				/>
			{/if}
			<div class="landing w-full">
				<Button
					class="w-full officer-color mb-4"
					placeholder={$_('login_as_officer')}
					on:click={() => goto(ROUTES.HEALTHCARE)}
				>
					<span slot="icon"> <Fa class="pl-4" icon={faArrowRight} /></span>
				</Button>
			</div>
			<div class="py-6 text-left text-sm">
				<p class="font-bold pb-4">โทรติดต่อสายด่วนจากหน่วยงานอื่นๆ</p>
				<p class="officer-text-color font-bold">กรมการแพทย์ (โทร 1668)</p>
				<p class="officer-text-color pb-6">โทรได้ตั้งแต่ 08:00 - 22:00 น.</p>
				<p class="officer-text-color font-bold">สถาบันการแพทย์ฉุกเฉินแห่งชาติ (โทร 1669)</p>
				<p class="officer-text-color pb-6">
					โทรหาเตียงได้ตลอด 24 ชั่วโมง หรือ แอดไลน์ไอดี @sabaideebot และสามารถดาวน์โหลดแอปพลิเคชัน
					EMS 1669 เพื่อใช้เป็นอีกช่องทางสำหรับเรียกรถพยาบาลกรณี ฉุกเฉินได้
				</p>
				<p class="officer-text-color font-bold">สปสช. (โทร 1330 กด 0)</p>
				<p class="officer-text-color pb-6">
					โทรหาเตียงได้ตลอด 24 ชั่วโมง สอบถามข้อมูลสิทธิประกันสุขภาพแห่งชาติ (สิทธิบัตรทอง)
				</p>
				<p class="officer-text-color font-bold">กรมควบคุมโรค (โทร 1422)</p>
				<p class="officer-text-color pb-6">
					โทรหาเตียงได้ตลอด 24 ชั่วโมง สอบถามข้อมูล ความรู้ด้านสุขภาพ
					และข้อสงสัยสำหรับผู้ป่วยติดเชื้อ
				</p>
				<p class="officer-text-color font-bold">ประกันสังคม (โทร 1506)</p>
				<p class="officer-text-color pb-6">
					โทรสอบถามสิทธิประโยชน์ประกันสังคม การรักษาพยาบาล ได้ตลอด 24 ชั่วโมง
				</p>
				<p class="officer-text-color font-bold">
					Taxi COVID-19 โรงพยาบาลราชวิถี (โทร 096-771-1687)
				</p>
				<p class="officer-text-color">
					บริการแท็กซี่ (Ambulance Taxi) สำหรับรับ-ส่งผู้ป่วยโควิด เฉพาะพื้นที่กรุงเทพฯ และปริมณฑล
					ตั้งแต่เวลา 09.00-19.00 น. (แจ้งล่วงหน้าอย่างน้อย 1 วัน)
				</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.landing :global(.officer-color) {
		background-color: #313ae0 !important;
	}
	.officer-text-color {
		color: #313ae0 !important;
	}
</style>
