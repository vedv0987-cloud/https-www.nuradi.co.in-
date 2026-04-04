#!/usr/bin/env python3
"""
Generate 3D realistic organ icons using Z-Image-Turbo on Hugging Face.
"""

import json, time, sys, shutil
from urllib.request import urlopen, Request
from urllib.error import HTTPError
from pathlib import Path

API_URL = "https://mrfakename-z-image-turbo.hf.space/gradio_api/call/generate_image"
OUTPUT_DIR = Path("public/organs")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

ORGANS = [
    ("brain", "human brain with visible cerebral cortex folds and brain stem, pink-grey tissue"),
    ("heart", None),  # Already generated
    ("lungs", "pair of human lungs with visible bronchi and trachea, pink spongy tissue"),
    ("liver", "human liver organ, large reddish-brown with smooth surface and lobes visible"),
    ("kidneys", "pair of human kidneys, bean-shaped dark red organs with renal arteries"),
    ("stomach", "human stomach organ, J-shaped muscular sac with rugae folds visible, pinkish"),
    ("pancreas", "human pancreas organ, elongated yellowish gland behind stomach"),
    ("intestines", "human intestines, coiled small intestine and large intestine colon, pink tissue"),
    ("eyes", "human eyeball with iris pupil and optic nerve attached, realistic blue iris"),
    ("thyroid", "human thyroid gland, butterfly-shaped gland with trachea, reddish tissue"),
    ("spine", "human spinal column vertebrae, full spine from cervical to lumbar, bone white"),
    ("muscles", "human muscular arm bicep and forearm showing muscle fibers, red tissue anatomy"),
    ("skin", "cross-section of human skin layers showing epidermis dermis and subcutaneous tissue"),
    ("bones", "human femur thigh bone, white bone with joint detail, anatomical"),
    ("blood", "red blood cells and white blood cells floating, microscopic view, red disc shaped cells"),
    ("immune", "white blood cells attacking virus, immune system response, microscopic view"),
    ("teeth", "human tooth molar with roots visible, white enamel crown and root cross section"),
    ("ears", "human ear anatomy showing outer ear and inner ear cochlea, detailed structure"),
    ("hormones", "endocrine system glands, pituitary thyroid adrenal glands floating together"),
    ("reproductive", "human reproductive system anatomy, medical education illustration"),
]

PROMPT_TEMPLATE = "3D rendered, realistic medical illustration of a {desc}, glossy surface, detailed anatomical accuracy, floating on dark background, dramatic studio lighting with soft rim light, clean isolated composition, no text, no labels, high detail, professional medical visualization, subsurface scattering on tissue, cinematic lighting"


def generate_image(prompt, output_path):
    """Generate image via Z-Image-Turbo Gradio API."""
    # Step 1: Submit job
    payload = json.dumps({
        "data": [prompt, 1024, 1024, 4, 8, 0, True]
    }).encode()

    req = Request(API_URL, data=payload, method="POST")
    req.add_header("Content-Type", "application/json")

    try:
        with urlopen(req) as resp:
            result = json.loads(resp.read().decode())
        event_id = result.get("event_id")
        if not event_id:
            print(f"  No event_id returned")
            return False
    except Exception as e:
        print(f"  Submit error: {e}")
        return False

    # Step 2: Poll for result
    poll_url = f"{API_URL}/{event_id}"
    for attempt in range(60):  # Max 60 seconds
        time.sleep(2)
        try:
            with urlopen(poll_url) as resp:
                raw = resp.read().decode()

            # Parse SSE format
            for line in raw.strip().split("\n"):
                if line.startswith("data: "):
                    data = json.loads(line[6:])
                    if isinstance(data, list) and len(data) >= 2:
                        img_data = data[0]
                        if isinstance(img_data, dict) and "url" in img_data:
                            img_url = img_data["url"]
                            # Download image
                            with urlopen(img_url) as img_resp:
                                output_path.write_bytes(img_resp.read())
                            return True
                elif line.startswith("event: error"):
                    print(f"  Generation error")
                    return False
        except Exception:
            pass

    print(f"  Timeout")
    return False


def main():
    # Copy already-generated heart
    heart_src = Path("../generated-icons/heart.png")
    if heart_src.exists():
        shutil.copy(heart_src, OUTPUT_DIR / "heart.png")
        print("OK heart (copied from earlier)")

    for organ_id, desc in ORGANS:
        output_path = OUTPUT_DIR / f"{organ_id}.png"

        if output_path.exists() and output_path.stat().st_size > 10000:
            print(f"SKIP {organ_id} (already exists)")
            continue

        if desc is None:
            continue  # Already handled (heart)

        sys.stdout.write(f"Generating {organ_id}...")
        sys.stdout.flush()

        prompt = PROMPT_TEMPLATE.format(desc=desc)
        success = generate_image(prompt, output_path)

        if success:
            size_kb = output_path.stat().st_size // 1024
            print(f" OK ({size_kb}KB)")
        else:
            print(f" FAILED")

        time.sleep(1)  # Rate limit

    # Summary
    generated = list(OUTPUT_DIR.glob("*.png"))
    print(f"\nDone: {len(generated)}/20 organs generated")
    for f in sorted(generated):
        print(f"  {f.name} ({f.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
