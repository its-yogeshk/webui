export default function RefundPolicyPage() {
    return (
      <main className="min-h-screen bg-gray-50 flex justify-center px-3 sm:px-4 py-8 sm:py-10">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 md:p-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            💸 Refund & Cancellation Policy
          </h1>
  
          <div className="mt-5 space-y-5 text-sm sm:text-base leading-relaxed text-gray-700">
            <p className="font-semibold">App Subscriptions</p>
            <p>
              All digital subscription payments are non-refundable once access is
              granted. Refunds may be considered only in exceptional cases such as
              duplicate charges or technical issues, provided they are reported
              within 3 days of billing.
            </p>
  
            <p>
              Users may cancel subscriptions at any time before the next billing
              cycle. Access will continue until the end of the paid period.
            </p>
  
            <p className="font-semibold">Live Classes</p>
            <p>
              Live class bookings are non-refundable. Rescheduling is permitted if
              cancellation is made at least 12–24 hours prior to the scheduled
              class.
            </p>
  
            <p>
              Premium members may receive limited reschedule flexibility. Medical
              or technical emergencies may be reviewed on a case-by-case basis.
            </p>
          </div>
        </div>
      </main>
    );
  }
  