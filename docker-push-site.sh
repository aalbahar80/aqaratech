# build
docker build -t aqaratech-site -f "Dockerfile.site" .

# tag
docker tag aqaratech-site registry.digitalocean.com/aqtech/aqaratech-site

# push
docker push registry.digitalocean.com/aqaratech/aqtech-site
