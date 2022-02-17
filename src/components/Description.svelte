<script lang="ts">
	const profile = {
		name: 'Ricardo Cooper',
		imageUrl:
			'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
		coverImageUrl:
			'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
		about: `
    <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
    <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
  `,
		fields: {
			Phone: '(555) 123-4567',
			Email: 'ricardocooper@example.com',
			Title: 'Senior Front-End Developer',
			Team: 'Product Development',
			Location: 'San Francisco',
			Sits: 'Oasis, 4th floor',
			Salary: '$145,000',
			Birthday: 'June 8, 1990',
		},
	};
</script>

<div class="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
	<dl class="grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
		{#each Object.keys(profile.fields) as field (field)}
			<div class="sm:col-span-1">
				<dt class="text-sm font-medium text-gray-500">{field}</dt>
				<dd class="mt-1 text-sm text-gray-900">{profile.fields[field]}</dd>
			</div>
		{/each}
		<div class="sm:col-span-2">
			<dt class="text-sm font-medium text-gray-500">About</dt>
			<dd
				class="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
				dangerouslySetInnerHTML={{ __html: profile.about }}
			/>
		</div>
	</dl>
</div>
