"use client";

import { useEffect } from "react";

/** Anonymous intent events. A configured analytics integration may subscribe. */
export function IntentAnalytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.origin);
      const action = url.protocol === "tel:" ? "call" : url.hostname === "wa.me" ? "whatsapp_handoff" : url.hostname === "www.google.com" && url.pathname.startsWith("/maps") ? "directions" : url.origin === window.location.origin && url.pathname === "/appointment" ? "appointment_click" : null;
      if (action) window.dispatchEvent(new CustomEvent("clinic:intent", { detail: { action, path: window.location.pathname } }));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
