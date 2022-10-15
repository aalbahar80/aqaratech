#!/bin/bash

echo "Checking token validity..."

curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
     -H "Authorization: Bearer $CLOUDFLARE_TOKEN" \
     -H "Content-Type:application/json"

# echo "List all zones..."

# curl -X GET "https://api.cloudflare.com/client/v4/zones" \
#      -H "Authorization: Bearer $CLOUDFLARE_TOKEN" \
#      -H "Content-Type:application/json" | jq

echo \n
echo "Purging cache..."

curl -X POST 'https://api.cloudflare.com/client/v4/zones/b3b4742af0767c231298043f9053334f/purge_cache' \
     -H "Authorization: Bearer $CLOUDFLARE_TOKEN" \
     -H "X-Auth-Key: $CLOUDFLARE_TOKEN" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}'
