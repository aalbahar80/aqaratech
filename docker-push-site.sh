# build
docker build -t aqaratech-site -f "Dockerfile.site" .

# tag
docker tag aqaratech-site registry.digitalocean.com/aqaratech/aqaratech-site

# push
docker push registry.digitalocean.com/aqaratech/aqaratech-site
