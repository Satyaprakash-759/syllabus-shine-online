import { useState, useEffect } from "react";

// In-memory data for pages - This should be replaced with a JSON file or API later
const pagesData: Record<string, any> = {
    'home': {
        metaTitle: 'Ivy Bridge - Elite Cambridge & IB Online Tutoring Bangkok',
        metaDescription: 'Thailand\'s premier 1-on-1 online tutoring institution for Cambridge IGCSE, A Level, and IB programs.',
        content: []
    },
    'cambridge/igcse': {
        metaTitle: 'Cambridge IGCSE | Ivy Bridge Elite Online Tutoring',
        metaDescription: 'Expert 1-on-1 Cambridge IGCSE tutoring in Bangkok.',
        content: [
            {
                type: 'hero',
                title: 'Cambridge IGCSE Program',
                subtitle: 'The world\'s most popular international qualification.'
            }
        ]
    },
    'ib/middle-years': {
        metaTitle: 'IB Middle Years Program (MYP) | Ivy Bridge Elite Tutoring',
        metaDescription: 'Expert 1-on-1 tutoring for IB MYP students.',
        content: [
            {
                type: 'hero',
                title: 'IB Middle Years Program',
                subtitle: 'A challenging framework that encourages students to make practical connections between their studies and the real world.'
            }
        ]
    }
};

export function usePageData(slug: string) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        // Mock data fetching
        const fetchData = async () => {
            setLoading(true);
            try {
                // Return data from our in-memory store
                const page = pagesData[slug] || null;
                setData(page);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    return { data, loading, error };
}
