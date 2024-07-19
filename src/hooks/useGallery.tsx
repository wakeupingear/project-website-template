/* eslint-disable @next/next/no-img-element */
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { MediaEmbed } from '../utils/types';
import clsx from 'clsx';
import { BiArrowBack, BiDownload, BiX } from 'react-icons/bi';

const CONTENT_PX = 64,
    CONTENT_PY = 64;

interface GalleryContextProps {
    openUrl: (url: string) => void;
    registerUrl: (
        url: string,
        imageRef: React.RefObject<HTMLImageElement>
    ) => void;
    close: () => void;
    currentUrl: string | null;
}

const GalleryContext = createContext<GalleryContextProps>(
    {} as GalleryContextProps
);

interface GalleryWrapperProps {
    children: React.ReactNode;
    urls: MediaEmbed[];
}

export function GalleryWrapper({ children, urls }: GalleryWrapperProps) {
    const [imageRefs, setImageRefs] = useState<
        Record<string, React.RefObject<HTMLImageElement>>
    >({});
    const [currentUrl, setCurrentUrl] = useState<string | null>(null);
    const prevUrl = useRef<string | null>(null);
    const [index, setIndex] = useState<number>(0);
    const url = currentUrl || prevUrl.current;

    const [style, setStyle] = useState<React.CSSProperties>({});

    const registerUrl: GalleryContextProps['registerUrl'] = (url, imageRef) => {
        setImageRefs((prev) => ({ ...prev, [url]: imageRef }));
    };

    const returnToImage = (url: string) => {
        const rect = imageRefs[url].current?.getBoundingClientRect();
        if (!rect) return;

        setStyle({
            transform: `
      translate(${rect.left}px, 
                ${rect.top}px)
    `,
            width: rect.width,
            height: rect.height,
        });
    };

    const openUrl: GalleryContextProps['openUrl'] = (newUrl: string) => {
        if (!imageRefs[newUrl]) return;

        const ind = urls.findIndex((url) =>
            typeof url === 'string' ? url === newUrl : url.url === newUrl
        );
        setIndex(ind);
        setCurrentUrl(newUrl);
        if (!prevUrl.current) returnToImage(newUrl);
    };
    const close = () => {
        if (url) returnToImage(url);
        setCurrentUrl(null);
    };

    const iterateUrl = (
        direction: 'next' | 'prev',
        e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (e) e.stopPropagation();

        const newIndex =
            direction === 'next'
                ? (index + 1) % urls.length
                : (index - 1 + urls.length) % urls.length;
        openUrl(urls[newIndex].url);
    };

    useEffect(() => {
        if (currentUrl) {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    close();
                } else if (e.key === 'ArrowLeft') {
                    iterateUrl('prev');
                } else if (e.key === 'ArrowRight') {
                    iterateUrl('next');
                }
            };

            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [currentUrl]);

    useEffect(() => {
        const prevUrlValue = prevUrl.current;
        prevUrl.current = currentUrl;

        if (currentUrl) {
            const update = () => {
                const rect =
                    imageRefs[currentUrl].current?.getBoundingClientRect();
                if (!rect) return;

                const scaleX =
                    (window.innerWidth - CONTENT_PX * 2) / rect.width;
                const scaleY =
                    (window.innerHeight - CONTENT_PY * 2) / rect.height;
                const scale = Math.min(scaleX, scaleY);
                const width = rect.width * scale,
                    height = rect.height * scale;
                const left =
                    CONTENT_PX +
                    (scaleX < scaleY
                        ? 0
                        : (window.innerWidth - width - CONTENT_PX * 2) / 2);
                const top =
                    CONTENT_PY +
                    (scaleX > scaleY
                        ? 0
                        : (window.innerHeight - height - CONTENT_PY * 2) / 2);

                setStyle({
                    transform: `
                translate(${left}px, ${top}px)
                `,
                    width,
                    height,
                });
            };

            if (!prevUrlValue) {
                document.body.style.top = `-${window.scrollY}px`;
                document.body.style.position = 'fixed';
                document.body.style.width = 'calc(100% - 15px)';
            }

            update();

            window.addEventListener('resize', update);
            return () => window.removeEventListener('resize', update);
        } else if (prevUrlValue) {
            const timeout = setTimeout(() => {
                const scrollY = document.body.style.top;
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);

                setStyle({});
            }, 300);

            return () => clearTimeout(timeout);
        }
    }, [currentUrl, imageRefs]);

    const open = Boolean(currentUrl);

    return (
        <GalleryContext.Provider
            value={{ openUrl, registerUrl, close, currentUrl }}
        >
            <div
                className={clsx(
                    'w-full h-full fixed top-0 left-0 z-[100] flex items-center justify-between',
                    {
                        'pointer-events-none': !open,
                    }
                )}
                onClick={close}
            >
                <div
                    className={clsx(
                        'w-full h-full bg-black/70 transition-all duration-300 flex items-center justify-between text-white',
                        'child:z-50 child:flex child:justify-center child:items-center child:text-3xl hover:child:scale-125 child:transition-all child:h-96',
                        {
                            'opacity-0': !open,
                        }
                    )}
                >
                    <button
                        onClick={(e) => iterateUrl('prev', e)}
                        style={{ width: CONTENT_PX }}
                    >
                        <BiArrowBack />
                    </button>
                    <button
                        onClick={(e) => iterateUrl('next', e)}
                        style={{ width: CONTENT_PX }}
                    >
                        <BiArrowBack className="rotate-180" />
                    </button>
                    <button
                        onClick={close}
                        className="fixed top-4 right-4 !h-fit"
                    >
                        <BiX />
                    </button>
                </div>
                <div className="absolute top-0 left-0 w-full h-full">
                    {url && (
                        <div
                            className="relative transition-all duration-300"
                            style={style}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={url}
                                alt="hi"
                                className={clsx(
                                    'shadow-lg overflow-hidden object-contain transition-all duration-300',
                                    {
                                        'rounded-3xl': !open,
                                    }
                                )}
                            />
                            <div
                                className={clsx(
                                    'absolute -bottom-8 left-0 w-full flex items-center justify-between text-white',
                                    {
                                        'opacity-0': !open,
                                    }
                                )}
                            >
                                <p>
                                    {index + 1} / {urls.length}
                                </p>
                                <a
                                    className="underline inline-flex items-center gap-2"
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <BiDownload size={24} />
                                    {imageRefs[url]?.current?.alt}
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {children}
        </GalleryContext.Provider>
    );
}

interface UseGalleryReturn {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const useGallery = (
    url: string,
    imageRef: React.RefObject<HTMLImageElement>
): UseGalleryReturn => {
    const data = useContext(GalleryContext);
    const { currentUrl, openUrl, close, registerUrl } = data;
    const open = currentUrl === url;

    useEffect(() => {
        registerUrl(url, imageRef);
    }, [url, imageRef]);

    const setOpen = (open: boolean) => {
        if (open) {
            openUrl(url);
        } else {
            close();
        }
    };

    return {
        open,
        setOpen,
    };
};

export default useGallery;
