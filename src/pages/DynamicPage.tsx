import React, { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { usePageData } from "@/hooks/usePageData";
import { MetaSEO } from "@/components/MetaSEO";
import { PageBuilder } from "@/components/PageBuilder";

const NotFound = lazy(() => import("./NotFound"));

export default function DynamicPage() {
    const { slug } = useParams();
    const { data, loading } = usePageData(slug || "index");

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            </Layout>
        );
    }

    if (!data) {
        return (
            <Suspense fallback={<div className="min-h-screen bg-navy" />}>
                <NotFound />
            </Suspense>
        );
    }

    return (
        <Layout>
            <MetaSEO 
                seo={data.seo || { metaTitle: `${data.title} | Ivy Bridge`, metaDescription: data.excerpt }} 
                defaultTitle={`${data.title} | Ivy Bridge`} 
            />

            {/* Standard Page Header */}
            <div className="relative pt-20 pb-20 overflow-hidden bg-slate-900 mb-16">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-slate-900 to-slate-900 opacity-80" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                        {data.title}
                    </h1>
                    {data.excerpt && (
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
                            {data.excerpt}
                        </p>
                    )}
                </div>
            </div>

            <div className="pb-24">
                {/* <PageBuilder content={data.content} /> */}
            </div>
        </Layout>
    );
}
