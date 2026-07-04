from PIL import Image, ImageFilter
import numpy as np

def process_logo_v2(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    
    # Luminance
    luminance = 0.299 * r + 0.587 * g + 0.114 * b
    
    # We want dark pixels to become highly opaque, and white pixels to become transparent.
    # Inverse luminance
    inv_lum = 255 - luminance
    
    # Some colors in the logo (like orange) have high luminance but aren't background.
    # Let's see if we can use color saturation as well. 
    # Actually, simple inverse luminance stretched is usually fine if we boost it heavily.
    
    # Boost heavily: anything darker than very light gray becomes fully opaque
    new_a = inv_lum * 4.0 
    new_a = np.clip(new_a, 0, 255)
    
    # Make everything white
    data[:,:,0] = 255
    data[:,:,1] = 255
    data[:,:,2] = 255
    data[:,:,3] = new_a.astype(np.uint8)
    
    out_img = Image.fromarray(data)
    
    # Optional: apply a tiny min-filter (dilation) to make lines slightly thicker
    # out_img = out_img.filter(ImageFilter.MaxFilter(3)) 
    
    out_img.save(output_path)

if __name__ == "__main__":
    process_logo_v2("src/assets/logo/urja_logo.png", "src/assets/logo/urja_logo_processed.png")
    print("Logo processed v2 successfully!")
