let pkgs = import <nixpkgs> {};

    buildNodejs = pkgs.callPackage <nixpkgs/pkgs/development/web/nodejs/nodejs.nix> {};

    nodejs-14 = buildNodejs {
        version = "14.17.1";
        sha256 = "0zr4b9gja8f9611rnmc9yacmh90bd76xv9ayikcyqdfzdpax5wfx";
    };


in pkgs.mkShell rec {
    name = "que-toca";
  
    buildInputs = with pkgs; [
        nodejs-14
    ];

    shellHook = ''
        export PATH="$PWD/node_modules/.bin/:$PATH"
        pnpm --help >/dev/null || npm install --no-save pnpm
    '';
}
