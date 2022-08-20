#!/usr/bin/env bash
cargo build --target wasm32-unknown-unknown \
&& cp ../target/wasm32-unknown-unknown/debug/enscry.wasm .wasm \
