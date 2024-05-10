{
  description = "Aqaratech dev environment";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.nixpkgs-prisma.url = "github:thenbe/nixpkgs/prisma-4.15.0"; # prisma v4.15.0
  inputs.playwright = { url = "github:pietdevries94/playwright-web-flake/1.42.1"; inputs.nixpkgs.follows = "nixpkgs"; };

  outputs =
    { self
    , nixpkgs
    , flake-utils
    , nixpkgs-prisma
    , ...
    } @ inputs:
    flake-utils.lib.eachDefaultSystem (system:
    let
      overlay = _final: _prev: {
        inherit (inputs.playwright.packages.${system}) playwright-test playwright-driver;
      };
      pkgs = import nixpkgs {
        inherit system;
        overlays = [ overlay ];
        config.allowUnfree = true;
      };
      nodejs_custom = pkgs.nodejs_18; # keep version in sync with `@types/node`, `engines.node`, CI scripts
      # Define some packages here to easily switch between versions
      inherit (nixpkgs-prisma.legacyPackages.${system}) prisma-engines;
      inherit (nixpkgs-prisma.legacyPackages.${system}.nodePackages) prisma;

      # Tier binary package
      tier = { pkgs, ... }:
        pkgs.stdenv.mkDerivation rec {
          pname = "tier";
          version = "0.11.1";

          src = pkgs.fetchurl {
            url = "https://github.com/tierrun/tier/releases/download/v${version}/tier_${version}_linux_amd64.tar.gz";
            sha256 = "sha256-Dgigbc2eivegdAXjzXkOB6t9BH8+S5hh6yt1fIvF9Yw=";
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
    in
    {
      devShell = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = with pkgs; [
          prisma # npm binary doesn't work on nixOS
          openssl # otherwise prisma will complain about missing openssl
          go-task # version installed by pnpm is nowhere to be found on nixOS
          zulu # java for openapi-generator-cli
          # openapi-generator-cli # npm binary works on nixOS
          (tier { inherit pkgs; })
          pkgs.playwright-test
          nodejs_custom
          nodejs_custom.pkgs.pnpm
        ];
        shellHook = ''
          export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
          export PLAYWRIGHT_BROWSERS_PATH=${pkgs.playwright-driver.browsers}
          export PRISMA_MIGRATION_ENGINE_BINARY=${prisma-engines}/bin/migration-engine
          export PRISMA_QUERY_ENGINE_BINARY=${prisma-engines}/bin/query-engine
          export PRISMA_QUERY_ENGINE_LIBRARY=${prisma-engines}/lib/libquery_engine.node
          export PRISMA_INTROSPECTION_ENGINE_BINARY=${prisma-engines}/bin/introspection-engine
          export PRISMA_FMT_BINARY=${prisma-engines}/bin/prisma-fmt

          # Delete the binary in node_modules/.bin to make sure we always use the one from nix
          # NOTE: might need to reload nix develop whenever we run `pnpm install`
        '';
      };
    });
}
