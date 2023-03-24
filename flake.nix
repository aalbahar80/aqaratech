# Example: https://github.com/pimeys/nix-prisma-example/tree/main
# Might need to run `nix flake init`, then replace contents of generated file
{
  description = "A prisma test project";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/master";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShell = pkgs.mkShell {
        nativeBuildInputs = [pkgs.bashInteractive];
        buildInputs = with pkgs; [
          nodePackages.prisma # npm binary doesn't work on nixOS
          openssl # otherwise prisma will complain about missing openssl
          turbo # npm binary doesn't work on nixOS
          go-task # version installed by pnpm is nowhere to be found on nixOS
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

          # Playwright nixOS combatibility
          export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
          export PLAYWRIGHT_BROWSERS_PATH="${playwright.browsers}"
          export PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH="${chromium}/bin/chromium"
          # Either turn off video trace or find way to make playwright find the ffmpeg binary using something like this:
          # export PLAYWRIGHT_FFMPEG_EXECUTABLE_PATH=${playwright.browsers}/ffmpeg-1008/ffmpeg-linux
        '';
      };
    });
}
