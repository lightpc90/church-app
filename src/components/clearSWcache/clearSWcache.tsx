
"use client";

import { useEffect } from "react";

const ServiceWorkerUnregisterer = () => {
    useEffect(() => {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                registrations.forEach((registration) => {
                    registration.unregister();
                    console.log("Service Worker unregistered:", registration);
                });
            });
        }
    }, []);

    return null;
};

export default ServiceWorkerUnregisterer;
