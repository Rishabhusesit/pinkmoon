# How to Remove Gray Background from MS Paint Image

## The Problem
CSS blend modes cannot fully remove a solid color background from a JPEG image. The gray background (#c0c0c0) is baked into the image file.

## Solution: Edit the Image File

### Option 1: Online Tool (Easiest)
1. Go to **https://www.remove.bg** or **https://photopea.com**
2. Upload: `web/public/images/ms-paint-interface.png`
3. Remove the gray background
4. Download as PNG with transparency
5. Replace the file: `web/public/images/ms-paint-interface.png`

### Option 2: Photoshop/GIMP
1. Open the image in Photoshop or GIMP
2. Use "Magic Wand" or "Color Select" tool
3. Select all gray areas (#c0c0c0 or similar)
4. Delete the selection (make transparent)
5. Export as PNG with transparency
6. Replace the file

### Option 3: Command Line (ImageMagick)
```bash
# Install ImageMagick first, then:
convert web/public/images/ms-paint-interface.png -fuzz 10% -transparent "#c0c0c0" web/public/images/ms-paint-interface-transparent.png
```

## After Editing
Once you have a PNG with transparent background:
- The gray will be completely gone
- It will blend perfectly with the site's pink gradient
- No CSS tricks needed!
