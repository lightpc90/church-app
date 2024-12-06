
"use client";

import { useEffect } from "react";

const ServiceWorkerUnregisterer = () => {
    console.log("checking for service worker...");
    useEffect(() => {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
            console.log("Service Worker unregistering...");
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                registrations.forEach((registration) => {
                    registration.unregister();
                    console.log("Service Worker unregistered:", registration);
                });
            });
        }
        else{
            console.log("Service Worker not found.");
        }
        // clear all caches in the browser
        caches.keys().then((cacheNames) => {
            console.log("clearing all the caches in the browser...");
            cacheNames.forEach((cacheName) => {
                caches.delete(cacheName);
            });
        });
    }, []);

    return null;
};

export default ServiceWorkerUnregisterer;
