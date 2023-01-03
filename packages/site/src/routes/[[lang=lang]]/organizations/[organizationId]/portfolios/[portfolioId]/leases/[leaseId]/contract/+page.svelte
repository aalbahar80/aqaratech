<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	import { countries } from '@self/utils';

	import ContractHeading from '$lib/components/lease/ContractHeading.svelte';
	import { inWords } from '$lib/utils/currency';

	export let data: PageData;

	const arabicLabels: Record<string, string> = {
		name: 'الطرف الثاني',
		civilid: 'رقم البطاقة المدنية',
		phone: 'رقم الهاتف',
		tenantAddress: 'عنوان المستأجر',
		nationality: 'الجنسية',
		passport: 'رقم الجواز',
		visa: 'رقم الاقامة',
		visaExpiration: 'تاريخ انتهاء الاقامة',
	};

	const fillable = {
		contractDate: new Date().toLocaleDateString(),
		name: data.tenant.fullName,
		civilid: data.tenant.civilid,
		phone: data.tenant.phone,
		tenantAddress: '',
		nationality:
			countries.find((c) => c.alpha3Code === data.tenant.nationality)?.nameAr ??
			'',
		passport: data.tenant.passportNum,
		residency: data.tenant.residencyNum,
		residencyEnd: data.tenant.residencyEnd,
		rentNumber: data.lease.monthlyRent.toLocaleString('en-KW', {
			minimumFractionDigits: 3,
		}),
		rentWords: inWords(data.lease.monthlyRent),
		start: new Date(data.lease.start).toLocaleDateString(),
		unitAddress: data.unit.breadcrumbs.property.label,
		unitNumber: data.unit.unitNumber,
		unitType: data.unit.type ?? '',
		purpose: data.lease.license ?? '',
	};
</script>

<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<ContractHeading id={data.lease.id} />
	<div
		contenteditable
		dir="rtl"
		class="prose prose-lg mx-auto mt-6 box-content rounded-md border-4 p-8 text-gray-600 print:border-0 print:p-0 print:text-gray-800"
	>
		<p>
			التاريخ:
			<span dir="ltr">{fillable.contractDate}</span>
		</p>
		<h3 class="text-center">عقد ايجار</h3>
		<p class="m-1">
			الطرف الأول:
			{$page.data.user?.role?.organization.fullName}
		</p>
		<br />
		{#each Object.entries(fillable) as field}
			{#if arabicLabels[field[0]]}
				<p class="m-1">
					<span>{arabicLabels[field[0]]}:</span>
					<span>{field[1] ?? ''}</span>
				</p>
			{/if}
		{/each}

		<!-- <table>
			<thead>
				<tr>
					<th>الجنسية</th>
					<th>رقم الجواز</th>
					<th>رقم الاقامة وتاريخها</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>الجنسية</td>
					<td>رقم الجواز</td>
					<td>رقم الاقامة وتاريخها</td>
				</tr>
			</tbody>
		</table> -->
		<p>
			استأجر الطرف الثاني من الطرف الأول: {fillable.unitType} رقم: {fillable.unitNumber}
			بالبناية الواقعة بالعنوان التالي: {fillable.unitAddress}
			لاستعماله: {fillable.purpose}
		</p>

		<p>
			الإيجار الشهري وقدرة {fillable.rentNumber}
			{fillable.rentWords}
			تدفع مقدما بدايه كل شهر ميلادي.
		</p>
		<p>
			مدة العقد: سنه تبتدا من تاريخ {fillable.start} ويجدد تلقائيا عند انتهائه لمدة
			مماثلة.
		</p>
		<br />

		<p>
			وبعد معاينه العين وفق الشروط التالية:
			<br />
			<br />
			1- يحق لكلا الطرفين بإخلاء العين المؤجرة بعد انتهاء مدة العقد علي أن يتم أشعار
			الطرف الآخر خطيا بمدة لا تقل عن شهر قبل انتهاء العقد. كما يجب علي الطرف الثاني
			أن يسمح لمن يريد الاستئجار بمعاينه العين المؤجرة قبل الأخلاء .
			<br />
			<br />
			2- يقر الطرف الثاني بأنه قد عاين العين المؤجرة وتسلمها بحاله جيدة. ويتعهد بالسماح
			لعمال الطرف الأول بالدخول للعين لإجراءالإصلاحات الضرورية الطارئة للمأجور خلال
			فترة العقد.
			<br />
			<br />
			3- يتعهد الطرف الثاني بالمحافظة على سلامه ونظافة العين المؤجرة وصيانته ويكون
			مسئولا عن كل ضرر فيه ويتحتم عليه إصلاحه على حسابه الخاص .
			<br />
			<br />
			4- يجب علي الطرف الثاني المحافظة علي علاقات حسن الجوار وان لا يصدر منه أي عمل
			يسبب إزعاجا للجيران وإلا سيكون من حق الطرف الأول فسخ العقد وإلزام الطرف الثاني
			بإخلاء العين المؤجرة .
			<br />
			<br />
			5- دفع تامين الكهرباء والمياه واستهلاك الكهرباء والمياه على حساب الطرف الثاني،
			وكذلك فيما لو حصلت أي مخالفه من وزارة الكهرباء والماء على مسؤوليته الخاصة.
			<br />
			<br />
			6- القيمة الايجاريه تمثل حق انتفاع الطرف الثاني في العين المؤجرة أعلاه فقط
			وليس له الحق في الانتفاع أو استغلال أي مكان آخر، وعدم التزام الطرف الثاني بهذا
			البند يعتبر أخلال بعقد الإيجار. ويحق للطرف الأول المطالبة بإخلاء العين المؤجرة.
			<br />
			<br />
			7- لا يحق للطرف الثاني أن يهدم أو يخلع أي شي من العين المؤجرة دون الرجوع إلى
			الطرف الأول واخذ موافقته الخطية بذلك.
			<br />
			<br />
			8- جميع المنقولات ضامنة لمتأخر الأجرة ولا يحق للطرف الثاني نقلها إلا بعد الوفاء
			بالأجر كاملا.
			<br />
			<br />
			9- يمنع علي الطرف الثاني وضع أي مواد ملتهبة أو مضرة بالصحة العامة أو بالعقار
			.وفي حاله المخالفة يتحمل الطرف الثاني المسئولية القانونية والمالية ويلتزم بتعويض
			الطرف الأول والغير عن الأضرار التي سببها .
			<br />
			<br />
			10- يحق للطرف الأول طلب زيادة الأجرة طبقا لقانون الإيجارات المعمول به.
			<br />
			<br />
			11- إذا أجرى الطرف الثاني أي تحسين أو عمل في العين المؤجرة فليس له الحق بالمطالبة
			بقيمته أو أتلافه أو إزالته.
			<br />
			<br />
			12- لا يحق للطرف الثاني تعليق أي إعلان إلا في المكان الذي يخصصه الطرف الأول.
			<br />
			<br />
			13- لا يحق للطرف الثاني التصرف في العين المؤجرة سواء بالتأجير من الباطن أو
			التنازل للغير أو البيع.
			<br />
			<br />
			14- لا يحق للطرف الثاني فيما لو أراد ترك العين المؤجرة أو السفر أن يؤجر إلى
			الغير أو يسكن سواه بإيجار أو بدون إيجار.
			<br />
			<br />
			15- عند مغادرة الطرف الثاني للبلاد واستحقاق القيمة الايجاريه يحق للطرف الأول
			فتح العين المؤجرة وتأجيرها دون تحمل الطرف الأول أي مسئوليه قانونيه أو ماليه
			تجاه الطرف الثاني.
			<br />
			<br />
			16- صيانة التكيف المركزي والمصاعد على الطرف الاول.
			<br />
			<br />
			17- سكن العزاب ممنوع إطلاقا في العين المؤجرة.
			<br />
			<br />
			18- الالتزام بشروط الاداره العامه للاطفاء والامن والسلامه وترك ممرات آمنه لرجال
			الاطفاء . وعدم تخزين اي مواد قابله للاشتعال .
			<br />
			<br />
			19- حرر هذا العقد من نسختين بيد كل طرف نسخه، ومحاكم الكويت هي المختصة بنظر
			إيه منازعات في شان هذا العقد.
			<br />
			<br />
		</p>

		<div class="flex justify-between">
			<span class="underline underline-offset-4"
				>توقيع الطرف الأول (صاحب البناية او وكيله)</span
			>
			<span class="underline underline-offset-4"
				>توقيع الطرف الثاني (المستأجر)</span
			>
		</div>
	</div>
</div>
