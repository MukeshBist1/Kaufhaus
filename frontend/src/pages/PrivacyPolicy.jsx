import React from 'react'

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content:
        'We may collect basic information such as your name, email address, phone number, shipping details, and browsing activity when you visit our website or place an order.',
    },
    {
      title: 'How We Use Your Information',
      content:
        'Your information helps us process orders, improve customer support, personalize your experience, and ensure the website works smoothly and securely.',
    },
    {
      title: 'Cookies and Tracking',
      content:
        'We use cookies and similar tools to remember your preferences, understand how visitors use our platform, and improve site performance over time.',
    },
    {
      title: 'Data Protection',
      content:
        'We take reasonable steps to protect your personal details from unauthorized access, misuse, or disclosure. However, no online platform can guarantee absolute security.',
    },
    {
      title: 'Third-Party Services',
      content:
        'We may work with trusted third-party services for payment processing, delivery support, or analytics. These providers are expected to handle your information responsibly.',
    },
    {
      title: 'Your Rights',
      content:
        'You may request access to, correction of, or deletion of your personal data, depending on applicable laws and the services we provide.',
    },
  ]

  return (
    <div className="min-h-screen bg-white px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] sm:p-8 lg:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-blue-900">
            Privacy Policy
          </p>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            We value your privacy and handle your data responsibly
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            This privacy policy explains what information we collect, how we use it, and what choices you have while using our website.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="mb-3 text-xl font-semibold text-slate-900">{section.title}</h2>
              <p className="leading-7 text-slate-700">{section.content}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-linear-to-br from-slate-900 to-blue-700 p-6 text-white shadow-sm">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p className="mt-3 leading-7 text-slate-100">
            If you have questions about this Privacy Policy or want to update your personal information, please contact us through the provided contact details on our website.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
