from PIL import Image

def remove_text():
    img = Image.open('public/hero-banner.png').convert('RGBA')
    pixels = img.load()
    width, height = img.size
    
    # Text is located in the bottom right: x > 0.42, y > 0.65 (bottom 35%)
    start_x = int(0.43 * width)
    start_y = int(0.65 * height)
    
    # Find the most common color in a strip just above the text
    sample_colors = {}
    for x in range(start_x, width):
        for y in range(start_y - 20, start_y):
            c = pixels[x, y]
            sample_colors[c] = sample_colors.get(c, 0) + 1
            
    # Get the dominant background color in that area
    bg_color = max(sample_colors, key=sample_colors.get)
    print("Detected background color:", bg_color)
    
    # Let's replace anything that looks like text. 
    # Text is usually very light (white) or very dark.
    # But to be safe, maybe we just fill the entire rectangle with bg_color?
    # If the dog is not there, it's totally fine. Let's just fill the whole text bounding box.
    # To be less destructive, let's just fill it.
    
    for x in range(start_x, width):
        for y in range(start_y, height):
            pixels[x, y] = bg_color
            
    img.save('public/hero-banner.png')
    print("Done")

remove_text()
