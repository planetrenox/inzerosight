cp ../.html LATEST/ \
&& tsc ../.ts --target es6 --outfile LATEST/.js \
&& cargo build --manifest-path ../../Cargo.toml --target wasm32-unknown-unknown \
&& cp ../../target/wasm32-unknown-unknown/debug/enscry.wasm LATEST/.wasm \
&& zip -FS -r $(date +%Y-%m-%d).zip LATEST -j \
