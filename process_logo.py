from PIL import Image
import numpy as np

def process_logo(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    
    luminance = 0.299 * r + 0.587 * g + 0.114 * b
    
    new_a = 255 - luminance
    new_a = np.clip(new_a * 1.5, 0, 255)
    
    data[:,:,0] = 255 
    data[:,:,1] = 255 
    data[:,:,2] = 255 
    data[:,:,3] = new_a.astype(np.uint8)
    
    Image.fromarray(data).save(output_path)

if __name__ == "__main__":
    process_logo("src/assets/logo/urja_logo.png", "src/assets/logo/urja_logo_processed.png")
    print("Logo processed successfully!")
