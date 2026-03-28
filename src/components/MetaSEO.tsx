import { useEffect } from 'react';

interface MetaSEOProps {
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        canonicalUrl?: string;
        ogImage?: any;
    };
    defaultTitle?: string;
}

export function MetaSEO({ defaultTitle }: MetaSEOProps) {
    // Use useEffect to avoid side effects in render
    useEffect(() => {
        if (defaultTitle) {
            document.title = defaultTitle;
        }
    }, [defaultTitle]);

    return null;
}
