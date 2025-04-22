"use client";

import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb"; // Adjust the import path
import { useBreadcrumbs } from "@/hooks/BreadCrumb";

export function DynamicBreadcrumb() {
    const breadcrumbs = useBreadcrumbs();

    return (
        <Breadcrumb className="my-3">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                {breadcrumbs.map((crumb, index) => (
                    <BreadcrumbItem key={crumb.href}>
                        <BreadcrumbSeparator />
                        {index === breadcrumbs.length - 1 ? (
                            <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                        ) : (
                            <BreadcrumbLink href={crumb.href}>
                                {crumb.name}
                            </BreadcrumbLink>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}