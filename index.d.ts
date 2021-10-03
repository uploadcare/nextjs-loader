export type ImageLoaderProps = {
  src: string
  width: number
  quality?: number
}

export function uploadcareLoader(props: ImageLoaderProps): string;

export type UploadcareImageProps = {
  [key: string]: any;
}
export function UploadcareImage(props: UploadcareImageProps): JSX.Element;
