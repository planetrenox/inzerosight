#!/usr/bin/env bash
# curl https://sh.rustup.rs -sSf | sh -s -- --profile complete --default-toolchain nightly

cargo clean \
&& cargo build --target wasm32-unknown-unknown \
&& cp ../target/wasm32-unknown-unknown/debug/enscry.wasm .wasm \
&& cargo clean \

