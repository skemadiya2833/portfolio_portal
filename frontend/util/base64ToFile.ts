import { ImageType } from "@/types/ImageType";

export const base64ToFile = (image: ImageType) => {
    if (!image) return null;
    const byteCharacters = atob(image.imageData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: image.type });
    return new File([blob], image.name, { type: blob.type });
}