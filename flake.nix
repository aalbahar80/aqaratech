# Example: https://github.com/pimeys/nix-prisma-example/tree/main
# Might need to run `nix flake init`, then replace contents of generated file
{
  description = "A prisma test project";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/master";
  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.nixpkgs-turbo.url = "github:thenbe/nixpkgs/turbo-1.9.1";

  outputs = {
    self,
    nixpkgs,
    nixpkgs-turbo,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
      inherit (nixpkgs-turbo.legacyPackages.${system}) turbo;

      # Tier binary package
      tier = {pkgs, ...}:
        pkgs.stdenv.mkDerivation rec {
          pname = "tier";
          version = "0.10.0";

          src = pkgs.fetchurl {
            url = "https://github.com/tierrun/tier/releases/download/v${version}/tier_${version}_linux_amd64.tar.gz";
            sha256 = "sha256-vH8+KCY9kZIYJYGuERyc7Dqe49kQb93O4HMACdCvluQ=";
          };

          # buildInputs = [pkgs.glibc];

          unpackPhase = ''
            tar -xzf $src
          '';

          dontBuild = true;

          installPhase = ''
            mkdir -p $out/bin
            cp tier $out/bin/tier
          '';

          meta = {
            description = "Tier binary";
            homepage = "https://github.com/tierrun/tier";
          };
        };
    in {
      devShell = pkgs.mkShell {
        nativeBuildInputs = [pkgs.bashInteractive];
        buildInputs = with pkgs; [
          nodePackages.prisma # npm binary doesn't work on nixOS
          openssl # otherwise prisma will complain about missing openssl
          turbo # npm binary doesn't work on nixOS
          go-task # version installed by pnpm is nowhere to be found on nixOS
          zulu # java for openapi-generator-cli
          # openapi-generator-cli # npm binary works on nixOS
          (tier {inherit pkgs;})
        ];
        shellHook = with pkgs; ''
          export PRISMA_MIGRATION_ENGINE_BINARY="${prisma-engines}/bin/migration-engine"
          export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
          export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
          export PRISMA_INTROSPECTION_ENGINE_BINARY="${prisma-engines}/bin/introspection-engine"
          export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"

          # Delete the binary in node_modules/.bin to make sure we always use the one from nix
          # NOTE: might need to reload nix develop whenever we run `pnpm install`
          rm -rf node_modules/.bin/turbo # use the one from nix

          # Tell turbo where to find our nixOS-specific binary
          export TURBO_BINARY_PATH="${turbo}/bin/turbo"
        '';
      };
    });
}
