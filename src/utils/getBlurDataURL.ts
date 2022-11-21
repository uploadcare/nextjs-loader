import { uploadcareLoader } from './loader';

export async function getBlurDataURL(
  src: string,
  width = 10,
  quality = 1
): Promise<string> {
  const cdnUrl = uploadcareLoader({
    src: src,
    width,
    quality
  });

  const response = await fetch(cdnUrl);
  const contentType = response.headers.get('content-type');
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString('base64');
  const dataURL = `data:${contentType};base64,${base64}`;
  return dataURL;
}
