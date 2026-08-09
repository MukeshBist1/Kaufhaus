import React from 'react'

const Disclaimer = () => {
  const points = [
    {
      title: 'General Information',
      description:
        'The content on this website is for general information and shopping guidance only. While we aim to keep everything accurate and up to date, details may change without notice.',
    },
    {
      title: 'Product Details',
      description:
        'Images, prices, stock availability, and descriptions are intended to be helpful references. Actual product appearance or availability may vary depending on the seller, season, or delivery situation.',
    },
    {
      title: 'Third-Party Links',
      description:
        'Some links may lead to external websites for additional information. We are not responsible for the content, privacy practices, or reliability of those websites.',
    },
    {
      title: 'Limitation of Liability',
      description:
        'We do our best to provide a smooth experience, but we cannot be held responsible for any indirect, accidental, or consequential losses related to the use of this website.',
    },
  ]

  return (
    <div className="min-h-screen bg-white px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] sm:p-8 lg:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-blue-900">
            Disclaimer
          </p>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Please read these terms before using our website
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            This page explains the general nature of the information provided here and helps set clear expectations for visitors and customers.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {points.map((item) => (
            <section key={item.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="mb-3 text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="leading-7 text-slate-700">{item.description}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-linear-to-br from-slate-900 to-blue-700 p-6 text-white shadow-sm">
          <h2 className="text-xl font-semibold">Important Note</h2>
          <p className="mt-3 leading-7 text-slate-100">
            By using this website, you agree that all information is provided in good faith and should be treated as general guidance. For any specific concerns, please contact us directly before making a purchase or relying on the information shown here.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer
