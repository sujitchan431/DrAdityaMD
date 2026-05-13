import { siteConfig } from "@/content/site-config";
import { GoogleMap } from "@/components/shared/GoogleMap";

export function ClinicInfo() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-medical-900">Clinic Information</h3>
        <div className="mt-4 space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="font-semibold text-medical-900">{siteConfig.clinic.name}</p>
              <p>{siteConfig.clinic.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 flex-shrink-0 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-medical-900">Hours</p>
              <p>{siteConfig.clinic.hours.days}</p>
              <p>{siteConfig.clinic.hours.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 flex-shrink-0 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <div>
              <p className="font-semibold text-medical-900">Phone</p>
              <p>{siteConfig.clinic.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 flex-shrink-0 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div>
              <p className="font-semibold text-medical-900">Consultation Fee</p>
              <p>{siteConfig.clinic.consultationFee}</p>
            </div>
          </div>
        </div>
      </div>

      <GoogleMap embedUrl={siteConfig.clinic.googleMapsEmbedUrl} />

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex items-start gap-3">
          <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <p className="font-semibold text-amber-800">Not an Emergency Facility</p>
            <p className="mt-1 text-sm text-amber-700">
              For medical emergencies such as chest pain, severe breathing difficulty, or stroke symptoms,
              please go directly to the nearest hospital emergency department or call <strong>108</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
