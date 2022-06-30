if $CI; then
    echo "Generating SDK for LOCALENV"
    docker run --rm -v "$PWD/openapi.yaml:/local/input-spec" -v "$PWD/src:/local/output" openapitools/openapi-generator-cli:v6.0.0 generate --input-spec="/local/input-spec" --generator-name="typescript-fetch" --output="/local/output" --additional-properties="supportsES6=true,typescriptThreePlus=true,nullSafeAdditionalProps=true,withInterfaces=true"
else
    echo "Generating SDK for CI"
    npx openapi-generator-cli generate
fi
