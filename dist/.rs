use std::alloc::{alloc, Layout};


#[no_mangle]
pub fn malloc(size: usize) -> *mut u8 {
    let align = std::mem::align_of::<usize>();
    if let Ok(layout) = Layout::from_size_align(size, align) {
        unsafe {
            if layout.size() > 0 {
                let ptr = alloc(layout);
                if !ptr.is_null() {
                    return ptr;
                }
            } else {
                return align as *mut u8;
            }
        }
    }
    std::process::abort()
}

#[no_mangle]
pub fn accumulate(data: *mut u8, len: usize) -> i32 {
    let y = unsafe { std::slice::from_raw_parts(data as *const u8, len) };
    let mut sum = 0;
    for i in 0..len {
        sum = sum + y[i];
    }
    sum as i32
}



