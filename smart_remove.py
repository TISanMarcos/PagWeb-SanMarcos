from PIL import Image

def smart_remove():
    img = Image.open('public/hero-banner.png').convert('RGBA')
    pixels = img.load()
    width, height = img.size
    
    start_x = int(0.43 * width)
    
    # Bottom 40% of the image (since y=0 is top)
    start_y = int(0.60 * height)
    
    # We copy the pixel from start_x to the rest of the row, for the bottom 40% of the image.
    for y in range(start_y, height):
        ref_color = pixels[start_x, y]
        for x in range(start_x + 1, width):
            pixels[x, y] = ref_color
            
    img.save('public/hero-banner.png')
    print("Done")

smart_remove()
