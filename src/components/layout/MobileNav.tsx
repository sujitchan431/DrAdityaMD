"use client";
import { useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";

export function MobileNav() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef("");
  const close = () => dialog.current?.close();
  return (
    <div className="lg:hidden">
      <button ref={trigger} type="button" aria-label="Open menu" aria-haspopup="dialog" aria-controls="mobile-menu"
        className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
        onClick={() => { previousOverflow.current = document.body.style.overflow; dialog.current?.showModal(); document.body.style.overflow = "hidden"; }}>
        <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={2} strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <dialog ref={dialog} id="mobile-menu" aria-labelledby="mobile-menu-title"
        className="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-80 max-w-[90vw] bg-white p-0 shadow-2xl backdrop:bg-black/40"
        onClose={() => { document.body.style.overflow = previousOverflow.current; trigger.current?.focus(); }}
        onClick={(event) => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } }}>
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 p-4">
          <span id="mobile-menu-title" className="font-bold text-medical-900">{siteConfig.name}</span>
          <button type="button" onClick={close} aria-label="Close menu" className="h-11 w-11 shrink-0 rounded-lg text-2xl text-gray-700 hover:bg-gray-100">×</button>
        </div>
        <nav aria-label="Mobile navigation" className="flex flex-col gap-1 p-4">
          {siteConfig.navLinks.map((link) => <Link key={link.href} href={link.href} onClick={close} className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary-50">{link.label}</Link>)}
          <Link href="/appointment" onClick={close} className="mt-3 rounded-lg bg-primary-700 px-4 py-3 text-center font-semibold text-white">Book Appointment</Link>
        </nav>
      </dialog>
    </div>
  );
}
