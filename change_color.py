from PIL import Image
import colorsys
import sys

def change_purple_to_green(input_path, output_path):
    try:
        img = Image.open(input_path).convert('RGBA')
        data = img.getdata()
        
        new_data = []
        for r, g, b, a in data:
            if a == 0:
                new_data.append((r, g, b, a))
                continue
                
            h, l, s = colorsys.rgb_to_hls(r/255.0, g/255.0, b/255.0)
            
            # Purple hue is roughly between 0.70 and 0.88 (250-310 degrees)
            # Or perhaps just a strict RGB check for purple?
            # Purple has high R and B, low G.
            if 0.70 <= h <= 0.88 and s > 0.1:
                # Change to green hue (~0.33)
                new_h = 0.33 
                new_r, new_g, new_b = colorsys.hls_to_rgb(new_h, l, s)
                new_data.append((int(new_r * 255), int(new_g * 255), int(new_b * 255), a))
            else:
                new_data.append((r, g, b, a))
                
        img.putdata(new_data)
        img.save(output_path)
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

change_purple_to_green('public/hero.png', 'public/hero-banner.png')
