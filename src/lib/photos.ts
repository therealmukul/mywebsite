import { statSync } from "node:fs";
import { join } from "node:path";
import exifr from "exifr";
import type { ImageMetadata } from "astro";

import p01 from "@assets/photos/DSCF0603-2.jpg";
import p02 from "@assets/photos/DSCF2288.jpg";
import p03 from "@assets/photos/DSCF2728.jpg";
import p04 from "@assets/photos/DSCF2743.jpg";
import p05 from "@assets/photos/DSCF2903.jpg";
import p06 from "@assets/photos/DSCF3179.jpg";
import p07 from "@assets/photos/DSCF3252.jpg";
import p08 from "@assets/photos/DSCF3323.jpg";
import p09 from "@assets/photos/DSCF3490.jpg";
import p10 from "@assets/photos/DSCF3661.jpg";
import p11 from "@assets/photos/DSCF3873.jpg";
import p12 from "@assets/photos/DSCF3921.jpg";
import p13 from "@assets/photos/DSCF4567.jpg";
import p14 from "@assets/photos/DSCF4578.jpg";
import p15 from "@assets/photos/DSCF4786.jpg";
import p16 from "@assets/photos/DSCF5053.jpg";
import p17 from "@assets/photos/DSCF5173.jpg";
import p18 from "@assets/photos/DSCF5326.jpg";
import p19 from "@assets/photos/DSCF5714.jpg";
import p20 from "@assets/photos/DSCF5736.jpg";
import p21 from "@assets/photos/DSCF5754.jpg";
import p22 from "@assets/photos/DSCF5769.jpg";
import p23 from "@assets/photos/DSCF5783.jpg";
import p24 from "@assets/photos/DSCF5827.jpg";
import p25 from "@assets/photos/DSCF6560.jpg";
import p26 from "@assets/photos/DSCF6665.jpg";
import p27 from "@assets/photos/DSCF7026.jpg";
import p28 from "@assets/photos/DSCF7072.jpg";

export type Photo = {
  src: ImageMetadata;
  /** Optional human caption shown next to the date (e.g. "Aegean sunset") */
  caption?: string;
  /** Optional hand-tagged location (e.g. "Santorini, GR") — EXIF GPS is not present on these files */
  location?: string;
  /** Short date label, derived from EXIF DateTimeOriginal (with mtime fallback) */
  date: string;
  /** Camera body — e.g. "Fujifilm X-T30 II" */
  camera?: string;
  /** Lens model — e.g. "XF27mmF2.8 R WR" */
  lens?: string;
  /** Focal length in mm (rounded) — e.g. "27mm" */
  focalLength?: string;
  /** Aperture — e.g. "f/2.8" */
  aperture?: string;
  /** Shutter speed — e.g. "1/180s" */
  shutter?: string;
  /** ISO sensitivity — e.g. "ISO 400" */
  iso?: string;
};

// process.cwd() is the project root during `astro build`. This avoids the
// import.meta.url path resolving to a Vite-internal virtual path.
const photoDir = join(process.cwd(), "src", "assets", "photos");

function formatDate(d: Date): string {
  return d
    .toLocaleDateString("en-US", { month: "short", year: "numeric" })
    .toLowerCase();
}

function formatShutter(t: number): string {
  if (!isFinite(t) || t <= 0) return "";
  if (t >= 1) {
    // Round seconds to 1 decimal for sub-second precision (e.g. "1.3s")
    return `${Math.round(t * 10) / 10}s`;
  }
  return `1/${Math.round(1 / t)}s`;
}

type ExifFields = Pick<
  Photo,
  "date" | "camera" | "lens" | "focalLength" | "aperture" | "shutter" | "iso"
>;

async function readExif(filename: string): Promise<ExifFields> {
  const path = join(photoDir, filename);
  let meta: Record<string, unknown> | null = null;
  try {
    meta = (await exifr.parse(path, [
      "Make",
      "Model",
      "LensModel",
      "DateTimeOriginal",
      "CreateDate",
      "ModifyDate",
      "FocalLength",
      "FocalLengthIn35mmFormat",
      "FNumber",
      "ExposureTime",
      "ISO",
    ])) as Record<string, unknown> | null;
  } catch (err) {
    console.warn(`[photos.ts] EXIF read failed for ${filename}:`, err);
  }

  const out: ExifFields = { date: "" };

  // Date — prefer EXIF, fall back to mtime
  const captured =
    (meta?.DateTimeOriginal as Date | undefined) ||
    (meta?.CreateDate as Date | undefined) ||
    (meta?.ModifyDate as Date | undefined);
  if (captured instanceof Date && !isNaN(captured.getTime())) {
    out.date = formatDate(captured);
  } else {
    try {
      out.date = formatDate(statSync(path).mtime);
    } catch {
      out.date = "";
    }
  }

  // Camera body — normalise the all-caps "FUJIFILM"
  const make = (meta?.Make as string | undefined)?.trim();
  const model = (meta?.Model as string | undefined)?.trim();
  if (model) {
    const display = [make, model].filter(Boolean).join(" ");
    out.camera = display.replace(/^FUJIFILM\b/i, "Fujifilm");
  }

  if (typeof meta?.LensModel === "string" && meta.LensModel.trim()) {
    out.lens = meta.LensModel.trim();
  }

  const focal = meta?.FocalLength;
  if (typeof focal === "number" && isFinite(focal)) {
    out.focalLength = `${Math.round(focal)}mm`;
  }

  const fnum = meta?.FNumber;
  if (typeof fnum === "number" && isFinite(fnum)) {
    out.aperture = `f/${fnum}`;
  }

  const exposure = meta?.ExposureTime;
  if (typeof exposure === "number") {
    const s = formatShutter(exposure);
    if (s) out.shutter = s;
  }

  const iso = meta?.ISO;
  if (typeof iso === "number" && isFinite(iso)) {
    out.iso = `ISO ${iso}`;
  }

  return out;
}

type RawPhoto = {
  src: ImageMetadata;
  file: string;
  caption?: string;
  location?: string;
};

// To customise a caption or hand-tag a location, set the field on the
// relevant entry — e.g.
//   { src: p01, file: "DSCF0603-2.jpg", caption: "Aegean sunset", location: "Santorini, GR" }
// Dates, camera, lens, and exposure data are pulled from each file's EXIF at build time.
const rawPhotos: RawPhoto[] = [
  { src: p01, file: "DSCF0603-2.jpg"},
  { src: p02, file: "DSCF2288.jpg" },
  { src: p03, file: "DSCF2728.jpg" },
  { src: p04, file: "DSCF2743.jpg" },
  { src: p05, file: "DSCF2903.jpg" },
  { src: p06, file: "DSCF3179.jpg" },
  { src: p07, file: "DSCF3252.jpg" },
  { src: p08, file: "DSCF3323.jpg" },
  { src: p09, file: "DSCF3490.jpg" },
  { src: p10, file: "DSCF3661.jpg" },
  { src: p11, file: "DSCF3873.jpg" },
  { src: p12, file: "DSCF3921.jpg" },
  { src: p13, file: "DSCF4567.jpg" },
  { src: p14, file: "DSCF4578.jpg" },
  { src: p15, file: "DSCF4786.jpg" },
  { src: p16, file: "DSCF5053.jpg" },
  { src: p17, file: "DSCF5173.jpg" },
  { src: p18, file: "DSCF5326.jpg" },
  { src: p19, file: "DSCF5714.jpg" },
  { src: p20, file: "DSCF5736.jpg" },
  { src: p21, file: "DSCF5754.jpg" },
  { src: p22, file: "DSCF5769.jpg" },
  { src: p23, file: "DSCF5783.jpg" },
  { src: p24, file: "DSCF5827.jpg" },
  { src: p25, file: "DSCF6560.jpg" },
  { src: p26, file: "DSCF6665.jpg" },
  { src: p27, file: "DSCF7026.jpg" },
  { src: p28, file: "DSCF7072.jpg" },
];

export const photos: Photo[] = await Promise.all(
  rawPhotos.map(async ({ src, file, caption, location }) => ({
    src,
    caption,
    location,
    ...(await readExif(file)),
  })),
);
