#!/usr/bin/env python3
"""Generate 20 organ icons via Z-Image-Turbo Gradio API with retries."""

import json, time, sys
from urllib.request import urlopen, Request
from pathlib import Path

API = "https://mrfakename-z-image-turbo.hf.space/gradio_api/call/generate_image"
OUT = Path("public/organs")
OUT.mkdir(parents=True, exist_ok=True)

ORGANS = {
    "brain": 'A 3D rendered icon of a human brain, soft pink-purple color (#7F77DD), glossy clay material with subtle folds and ridges visible, cerebral cortex texture, soft studio lighting from top-left, centered on pure white background, medical illustration style, rounded smooth edges, no text, 1:1 square ratio',
    "heart": 'A 3D rendered icon of an anatomical human heart, deep coral red color (#D85A30), glossy clay material showing aorta and ventricles, realistic medical shape not cartoon heart, soft studio lighting from top-left, centered on pure white background, medical illustration style, smooth rounded surface, no text, 1:1 square ratio',
    "lungs": 'A 3D rendered icon of a pair of human lungs with trachea and bronchi, soft blue color (#378ADD), glossy clay material showing left and right lung lobes, bronchial tree visible, soft studio lighting from top-left, centered on pure white background, medical illustration style, smooth surface, no text, 1:1 square ratio',
    "liver": 'A 3D rendered icon of a human liver, warm amber-brown color (#BA7517), glossy clay material showing right and left lobe, smooth organic shape, soft studio lighting from top-left, centered on pure white background, medical illustration style, no text, 1:1 square ratio',
    "kidneys": 'A 3D rendered icon of two human kidneys side by side, deep red-maroon color (#E24B4A), glossy clay material showing kidney bean shape with renal pelvis and ureter tubes, soft studio lighting from top-left, centered on pure white background, medical illustration style, smooth surface, no text, 1:1 square ratio',
    "stomach": 'A 3D rendered icon of a human stomach, fresh green color (#639922), glossy clay material showing J-shaped stomach with esophagus entering from top and pylorus at bottom, smooth curved organic shape, soft studio lighting from top-left, centered on pure white background, medical illustration style, no text, 1:1 square ratio',
    "pancreas": 'A 3D rendered icon of a human pancreas, soft pink color (#D4537E), glossy clay material showing elongated tadpole shape with head body and tail, smooth organic form, soft studio lighting from top-left, centered on pure white background, medical illustration style, no text, 1:1 square ratio',
    "intestines": 'A 3D rendered icon of human intestines showing both small and large intestine coiled together, fresh green color (#639922) for small intestine and slightly darker green (#3B6D11) for large intestine, glossy clay material, smooth tubular coils, soft studio lighting from top-left, centered on pure white background, medical illustration style, no text, 1:1 square ratio',
    "eyes": 'A 3D rendered icon of a single human eyeball, bright blue iris color (#378ADD) with white sclera and black pupil, glossy realistic material showing iris detail and slight reflection, optic nerve visible at back, soft studio lighting from top-left, centered on pure white background, medical illustration style, no text, 1:1 square ratio',
    "thyroid": 'A 3D rendered icon of a human thyroid gland, teal color (#1D9E75), glossy clay material showing butterfly-shaped gland with two lobes connected by isthmus, wrapped around trachea ring, soft studio lighting from top-left, centered on pure white background, medical illustration style, smooth surface, no text, 1:1 square ratio',
    "spine": 'A 3D rendered icon of a human spinal column, neutral bone-gray color (#888780) with slight warm ivory tone, glossy material showing 5-6 vertebrae stacked with intervertebral discs in soft blue between them, slight S-curve, soft studio lighting from top-left, centered on pure white background, medical illustration style, no text, 1:1 square ratio',
    "muscles": 'A 3D rendered icon of a human bicep muscle, coral-red color (#D85A30), glossy clay material showing muscle fiber texture, tendon attachments visible at both ends, flexed athletic shape, soft studio lighting from top-left, centered on pure white background, medical illustration style, smooth surface, no text, 1:1 square ratio',
    "skin": 'A 3D rendered icon of a cross-section of human skin layers, soft pink (#D4537E) for epidermis and lighter pink for dermis, glossy clay material showing epidermis dermis and subcutaneous layers, hair follicle and sweat gland visible in cross-section, soft studio lighting from top-left, centered on pure white background, medical illustration style, no text, 1:1 square ratio',
    "bones": 'A 3D rendered icon of a human femur bone, ivory-white bone color with slight warm gray (#B4B2A9) tone, glossy material showing smooth shaft with bulbous ends showing articular surfaces, anatomically accurate proportions, soft studio lighting from top-left, centered on pure white background, medical illustration style, no text, 1:1 square ratio',
    "blood": 'A 3D rendered icon of red blood cells, deep red color (#E24B4A), glossy material showing 3-4 biconcave disc-shaped erythrocytes floating at slight angles, one cell in foreground slightly larger, soft studio lighting from top-left, centered on pure white background, medical illustration style, smooth surface, no text, 1:1 square ratio',
    "immune": 'A 3D rendered icon of a shield shape with a plus cross medical symbol in center, teal-green color (#1D9E75), glossy clay material, small antibody Y-shapes and white blood cell spheres floating around the shield, soft studio lighting from top-left, centered on pure white background, medical illustration style, no text, 1:1 square ratio',
    "teeth": 'A 3D rendered icon of a single human molar tooth, clean white color with slight ivory tone, glossy enamel material showing crown with cusps and two roots below, healthy bright appearance, soft studio lighting from top-left, centered on light gray (#F1EFE8) background circle, medical dental illustration style, no text, 1:1 square ratio',
    "ears": 'A 3D rendered icon of a human ear with inner ear cochlea visible in cutaway, outer ear in skin tone with blue (#378ADD) colored cochlea spiral inside, glossy clay material, soft studio lighting from top-left, centered on pure white background, medical illustration style, smooth surface, no text, 1:1 square ratio',
    "hormones": 'A 3D rendered icon of interconnected molecular hormone shapes, purple color (#7F77DD), glossy clay material showing hexagonal molecular structures connected by bonds with small glowing nodes at connection points, representing hormone molecules, soft studio lighting from top-left, centered on pure white background, medical illustration style, no text, 1:1 square ratio',
    "reproductive": 'A 3D rendered icon of a DNA double helix strand, soft pink color (#D4537E), glossy clay material showing twisted ladder structure with base pairs in slightly darker pink connecting the two strands, about 2-3 full turns visible, soft studio lighting from top-left, centered on pure white background, medical illustration style, no text, 1:1 square ratio',
}

def generate(name, prompt, retries=3):
    path = OUT / f"{name}.png"
    if path.exists() and path.stat().st_size > 50000:
        return True  # Already exists

    for attempt in range(retries):
        try:
            # Submit
            payload = json.dumps({"data": [prompt, 1024, 1024, 4, 8, 0, True]}).encode()
            req = Request(API, data=payload, method="POST")
            req.add_header("Content-Type", "application/json")
            with urlopen(req, timeout=30) as resp:
                result = json.loads(resp.read().decode())
            event_id = result.get("event_id")
            if not event_id:
                continue

            # Poll
            poll_url = f"{API}/{event_id}"
            for _ in range(45):
                time.sleep(3)
                try:
                    with urlopen(poll_url, timeout=30) as resp:
                        raw = resp.read().decode()
                    for line in raw.strip().split("\n"):
                        if line.startswith("data: "):
                            data = json.loads(line[6:])
                            if isinstance(data, list) and data:
                                img = data[0]
                                if isinstance(img, dict) and "url" in img:
                                    with urlopen(img["url"], timeout=30) as dl:
                                        path.write_bytes(dl.read())
                                    return True
                        if "error" in line.lower():
                            break
                except Exception:
                    pass

        except Exception as e:
            if attempt < retries - 1:
                time.sleep(10 * (attempt + 1))  # Backoff
            continue

    return False

def main():
    total = len(ORGANS)
    done = 0
    failed = []

    for name, prompt in ORGANS.items():
        sys.stdout.write(f"[{done+1}/{total}] {name}...")
        sys.stdout.flush()

        path = OUT / f"{name}.png"
        if path.exists() and path.stat().st_size > 50000:
            print(f" SKIP (exists {path.stat().st_size//1024}KB)")
            done += 1
            continue

        ok = generate(name, prompt)
        if ok:
            sz = path.stat().st_size // 1024
            print(f" OK ({sz}KB)")
            done += 1
        else:
            print(f" FAILED")
            failed.append(name)
            done += 1

        time.sleep(5)  # 5s between generations to avoid rate limit

    print(f"\nResults: {total - len(failed)}/{total} generated")
    if failed:
        print(f"Failed: {', '.join(failed)}")

    # List all files
    for f in sorted(OUT.glob("*.png")):
        print(f"  {f.name} ({f.stat().st_size//1024}KB)")

if __name__ == "__main__":
    main()
