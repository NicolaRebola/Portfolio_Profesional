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
    console.info("[VisitTracker] Mounted.");

    if (!db) {
      console.warn("[VisitTracker] Firestore is not available. Visit will not be tracked.");
      return;
    }

    const environment = resolveEnvironment(window.location);
    const sessionKey = `${VISIT_SESSION_KEY_PREFIX}:${environment}`;

    if (window.localStorage.getItem(sessionKey)) {
      console.info("[VisitTracker] Visit already tracked for this browser:", environment);
      return;
    }

    console.info("[VisitTracker] Tracking visit:", {
      environment,
      path: window.location.pathname,
    });

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
      .then((documentReference) => {
        window.localStorage.setItem(sessionKey, "true");
        console.info("[VisitTracker] Visit tracked:", documentReference.id);
      })
      .catch((error: unknown) => {
        console.error("[VisitTracker] Failed to track portfolio visit:", error);
      });
  }, []);

  return null;
}
