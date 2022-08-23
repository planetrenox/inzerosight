#![feature(decl_macro)]
#![feature(proc_macro_hygiene)]
#![allow(unstable_features)]
#![allow(dead_code)]
#![allow(unused_macros)]

extern crate proc_macro2; // https://crates.io/api/v1/crates/proc-macro2/1.0.43/download

use std::alloc::{alloc, Layout};
use std::slice::from_raw_parts_mut;

/// # Return codes
/// 1   ok
/// -1  incorrect block size (128x128)
#[no_mangle]
pub fn speck_128_encrypt(ptr_mixed: *mut u8) -> i32
{
    let slc_mixed = unsafe { from_raw_parts_mut(ptr_mixed as *mut u8, 32) };
    if slc_mixed.len() != 32 { return -1; }
    let mut iter_mixed = slc_mixed.chunks(16);

    let ct = speck::encrypt_block(iter_mixed.next().unwrap().iter().fold(0, |acc, &x| (acc << 8) | x as u128), iter_mixed.next().unwrap().iter().fold(0, |acc, &x| (acc << 8) | x as u128));

    // TODO return ct in place of pt

    if ct != 0xa65d9851797832657860fedf5c570d18
    {
        return 0;
    }
    1
}


#[no_mangle]
pub fn malloc(size: usize) -> *mut u8
{
    let align = std::mem::align_of::<usize>();
    if let Ok(layout) = Layout::from_size_align(size, align)
    {
        unsafe {
            if layout.size() > 0
            {
                let ptr = alloc(layout);
                if !ptr.is_null()
                {
                    return ptr;
                }
            } else {
                return align as *mut u8;
            }
        }
    }
    std::process::abort()
}

// https://github.com/tuxxy/speck/blob/master/src/lib.rs
// https://github.com/orangeblock/speckr/blob/master/src/lib.rs
// https://github.com/MarkusAkesson/speck/blob/master/src/lib.rs
mod speck
{
    //! SPECK is a really simple block cipher designed by the NSA.

    const ROUNDS: u64 = 32;

    macro ER64($x:ident, $y:ident, $k:ident) {
    $x = $x.rotate_right(8).wrapping_add($y) ^ $k;
        $y = $y.rotate_left(3) ^ $x
    }

    macro DR64($x:ident, $y:ident, $k:ident) {
    $y = ($y ^ $x).rotate_right(3);
        $x = ($x ^ $k).wrapping_sub($y).rotate_left(8);
    }

    /// Encrypt a block with key schedule generated on-the-go.
    pub fn encrypt_block(m: u128, k: u128) -> u128
    {
        let mut m1 = (m >> 64) as u64;
        let mut m2 = m as u64;
        let mut k1 = (k >> 64) as u64;
        let mut k2 = k as u64;

        // Run the initial round (similar to the loop below, but doesn't update the key schedule).
        ER64!(m1, m2, k2);

        for i in 0..ROUNDS - 1
        {
            ER64!(k1, k2, i);
            ER64!(m1, m2, k2);
        }

        m2 as u128 | (m1 as u128) << 64
    }

    // macro_rules! encrypt {
    //     ($k:expr, $b:expr, $st:ty, $bt:ty) => {{
    //         let (mut b1, mut b0) = (($b >> $k.word_size) as $st, $b as $st);
    //         for i in 0..$k.rounds
    //         {
    //             let (l, r) = ER64!(b1, b0, $k.round_keys[i]);
    //             b1 = l;
    //             b0 = r;
    //         }
    //         ((b1 as $bt) << $k.word_size) | b0 as $bt
    //     }};
    // }

    pub struct Key
    {
        /// The computed schedule.
        /// Each of these subkeys are used in a round of the cipher. The first subkey is used in the
        /// first round of the cipher and so on.
        schedule: [u64; ROUNDS as usize],
    }

    // impl Key
    // {
    //     pub fn new(k: u128) -> Key
    //     {
    //         let mut k1 = (k >> 64) as u64;
    //         let mut k2 = k as u64;
    //
    //         let mut ret = Key {
    //             schedule: [0; ROUNDS as usize],
    //         };
    //
    //         // Run `ROUNDS - 1` rounds to generate the key's endpoint (the last key in the schedule).
    //         for i in 0..ROUNDS
    //         {
    //             // Insert the key into the schedule.
    //             ret.schedule[i as usize] = k2;
    //
    //             // The beautiful thing about SPECK is that it reuses its round function to generate the
    //             // key schedule.
    //             ER64!(k1, k2, i);
    //         }
    //
    //         ret
    //     }
    //
    //     /// Encrypt a 128-bit block with this key.
    //     pub fn encrypt_block(&self, m: u128) -> u128
    //     {
    //         let mut m1 = (m >> 64) as u64;
    //         let mut m2 = m as u64;
    //
    //         // We run a round for every subkey in the generated key schedule.
    //         for &k in &self.schedule
    //         {
    //             ER64!(m1, m2, k);
    //         }
    //
    //         m2 as u128 | (m1 as u128) << 64
    //     }
    //
    //     /// Decrypt a 128-bit block with this key.
    //     pub fn decrypt_block(&self, c: u128) -> u128
    //     {
    //         let mut c1 = (c >> 64) as u64;
    //         let mut c2 = c as u64;
    //
    //         // We run a round for every subkey in the generated key schedule.
    //         for &k in self.schedule.iter().rev()
    //         {
    //             // Run a round on the message.
    //             DR64!(c1, c2, k);
    //         }
    //
    //         c2 as u128 | (c1 as u128) << 64
    //     }
    // }

    #[cfg(test)]
    mod tests
    {
        use super::*;

        // #[test]
        // fn encrypt_decrypt()
        // {
        //     for mut x in 0u128..90000
        //     {
        //         // <3
        //         x = x.wrapping_mul(0x6eed0e9da4d94a4f6eed0e9da4d94a4f);
        //         x ^= (x >> 6) >> (x >> 122);
        //         x = x.wrapping_mul(0x6eed0e9da4d94a4f6eed0e9da4d94a4f);
        //
        //         let key = Key::new(!x);
        //
        //         assert_eq!(key.decrypt_block(key.encrypt_block(x)), x);
        //         assert_eq!(key.encrypt_block(x), encrypt_block(x, !x));
        //     }
        // }

        #[test]
        fn test_vectors()
        {
            // little-endian byte and word ordering as intended
            assert_eq!(
                encrypt_block(
                    0x206d616465206974206571756976616c,
                    0x000102030405060708090a0b0c0d0e0f,
                ),
                0x180d575cdffe60786532787951985da6
            );

            // big-endian byte and word ordering
            assert_eq!(
                encrypt_block(
                    0x6c617669757165207469206564616d20,
                    0x0f0e0d0c0b0a09080706050403020100,
                ),
                0xa65d9851797832657860fedf5c570d18
            );
        }
    }
}
