"use client";

import { usePathname } from "next/navigation";

export function useBreadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    return segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        return { name: decodeURIComponent(segment), href };
    });
}