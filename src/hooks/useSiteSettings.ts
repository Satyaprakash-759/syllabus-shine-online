import { useState, useEffect } from "react";

export function useSiteSettings() {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    return { settings, loading };
}
