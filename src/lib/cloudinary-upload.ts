import cloudinary, { isCloudinaryConfigured } from "./cloudinary";

export async function uploadFileToCloudinary(
  file: File,
  folder: string
) {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured.");
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  const dataUri =
    `data:${file.type};base64,${bytes.toString("base64")}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: "auto",
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    format: result.format,
    bytes: result.bytes,
  };
}