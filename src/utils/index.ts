export const isUrl = (str: string) =>
    ['.http', '.https'].some((prefix) => str.toLowerCase().startsWith(prefix));
export const isVideo = (str: string) =>
    ['.mp4', '.webm'].some((ext) => str.toLowerCase().endsWith(ext)) ||
    [
        'https://www.youtube.com/',
        'https://youtu.be/',
        'https://vimeo.com/',
    ].some((prefix) => str.startsWith(prefix));

export const isImage = (str: string) =>
    ['.jpg', '.jpeg', '.png', '.gif', '.webp'].some((ext) =>
        str.toLowerCase().endsWith(ext)
    );

export const imageIsTransparent = (url: string) =>
    ['.png'].some((ext) => url.toLowerCase().endsWith(ext));
