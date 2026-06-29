import { siteConfig } from "@/content/site-config";

export function HospitalAffiliations() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-medical-900 text-center">
        Hospital & Academic Appointments
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-gray-600">
        Dr. Aditya consults and teaches across leading hospitals in Navi Mumbai.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {siteConfig.hospitals.map((hospital) => (
          <div
            key={`${hospital.name}-${hospital.role}`}
            className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3m9-13h.01M9 8h.01M15 8h.01M9 12h.01M15 12h.01M12 12h.01M9 16h6" />
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                {hospital.role}
              </p>
              <p className="mt-0.5 font-semibold text-medical-900">{hospital.name}</p>
              <p className="text-sm text-gray-500">{hospital.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
