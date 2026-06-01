"use client";

import { useEffect } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/_lib/firebase";

type PortfolioEnvironment = "local" | "uat" | "prod";

const VISIT_COLLECTION = "visits";
const VISIT_SESSION_KEY_PREFIX = "portfolio-visit-tracked";

function resolveEnvironment(location: Location): PortfolioEnvironment {
  const hostname = location.hostname.toLowerCase();
  const pathname = location.pathname.toLowerCase();

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "local";
  }

  return pathname.includes("/uat") ? "uat" : "prod";
}

export default function VisitTracker() {
  useEffect(() => {
    if (!db) {
      return;
    }

    const environment = resolveEnvironment(window.location);
    const sessionKey = `${VISIT_SESSION_KEY_PREFIX}:${environment}`;

    if (window.sessionStorage.getItem(sessionKey)) {
      return;
    }

    window.sessionStorage.setItem(sessionKey, "true");

    void addDoc(collection(db, VISIT_COLLECTION), {
      environment,
      path: window.location.pathname,
      url: window.location.href,
      referrer: document.referrer || null,
      language: navigator.language || null,
      userAgent: navigator.userAgent || null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
      createdAt: serverTimestamp(),
    })
      .catch((error: unknown) => {
        window.sessionStorage.removeItem(sessionKey);
        console.error("[VisitTracker] Failed to track portfolio visit:", error);
      });
  }, []);

  return null;
}
