Webkit browsers testing requires https

- caddy kinda works but gets an ssl error
- cloudflare tunnel works but is slow

```bash
sudo caddy run
```

.env & site/.env

```.env
PUBLIC_SITE_URL=https://site.localhost
PUBLIC_API_URL=https://api.localhost
```
