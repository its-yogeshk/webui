export default function AccountDeletionPage() {
    return (
      <main className="min-h-screen bg-gray-50 flex justify-center px-3 sm:px-4 py-8 sm:py-10">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 md:p-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            Account & Data Deletion
          </h1>
  
          <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-gray-700">
            <p>
              Users can delete their account and associated personal data directly
              from within the app by following:
            </p>
  
            <p className="font-medium">
              App → Profile → Delete Account
            </p>
  
            <p>
              Alternatively, users may request account or data deletion by
              emailing:
            </p>
  
            <p className="font-medium break-all">
              revolvebypreethi@gmail.com
            </p>
  
            <p>
              Once a deletion request is processed, the following data will be
              permanently removed:
            </p>
  
            <ul className="list-disc pl-5 space-y-1">
              <li>Account profile</li>
              <li>Email</li>
              <li>User-generated content</li>
            </ul>
          </div>
        </div>
      </main>
    );
  }
  