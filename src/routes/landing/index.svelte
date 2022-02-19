<script lang="ts">
	import { page } from '$app/stores';
</script>

<a href="/auth/login" rel="external">Login</a>
<a href="/auth/logout" rel="external">Logout</a>
<a href="/tenants" rel="external">tenants</a>
<a href="edit">tenants</a>
<br />
<br />
<br />

<a href={`${$page.url.pathname}/edit`}>edit</a>
<br />
<br />
<a href="edit">edit</a>

<br />
<a href="./edit">edit</a>

<br />
<a href="/edit">edit</a>

<br />
<a href=".edit">edit</a>

<br />
<a href="../edit">edit</a>
