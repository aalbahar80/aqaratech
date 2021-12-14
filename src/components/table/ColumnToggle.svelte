<script lang="ts">
	import { getContext } from 'svelte';
	import { key } from '$components/keyyy';
	import type { FieldList } from '$components/form/Field';

	const { getFieldList } = getContext(key);
	const _fieldList: SvelteStore<FieldList> = getFieldList();

	import Fa from 'svelte-fa/src/fa.svelte';
	import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="">
	<!-- <a class="btn btn-ghost rounded-btn"> Button </a> -->
	<div class="dropdown dropdown-end">
		<div tabindex="0" class="btn btn-lg lg:btn-wide btn-ghost rounded-btn">
			<Fa icon={faEyeSlash} />
			<div class="hidden pl-2 lg:flex">Hide</div>
		</div>

		<ul
			tabindex="0"
			class="p-2 shadow-lg menu dropdown-content bg-base-100 rounded-box w-52 text-base-content"
		>
			<li class="self-center menu-title">
				<span> Show/Hide </span>
			</li>
			{#each $_fieldList.fieldList as { title, visibile, hideable }}
				{#if hideable}
					<li>
						<!-- svelte-ignore a11y-missing-attribute -->
						<div class="form-control ">
							<label
								class="rounded cursor-pointer label hover:bg-base-300 active:bg-primary"
							>
								<span class="label-text">{title}</span>
								<input
									type="checkbox"
									bind:checked={visibile}
									class="toggle toggle-primary"
								/>
							</label>
						</div>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
</div>
