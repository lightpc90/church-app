
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
    }, []);

    return null;
};

export default ServiceWorkerUnregisterer;
