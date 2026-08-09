import React from 'react'

const About = () => {
  const profile = {
    name: 'Mukesh Bist',
    location: 'Baneshwor, Kathmandu, Nepal',
    phone: '9821661191',
    objective:
      'Motivated and enthusiastic BSc CSIT graduate , applying my web development skills, contribute to real-world projects, and grow as a professional developer.',
    education: {
      degree: 'Bachelor of Science in Information Technology (BSc CSIT)',
      college: 'Siddhanath Science Campus',
      university: 'Tribhuvan University',
      period: '2022-April – 2026-Feb',
    },
    skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'React.js'],
    projects: [
      { title: 'Homepage clone of discoveryworldtrekking', url: 'https://discoverytrekkingclone.netlify.app' },
      { title: 'Redux project', url: 'https://myreduxproject.netlify.app' },
    ],
    strengths: [
      'Quick learner with strong problem-solving mindset',
      'Dedicated to self-improvement and continuous learning',
      'Good communication and team collaboration skills',
      'Ability to work under guidance and adapt to new technologies',
    ],
    languages: ['Nepali – Native', 'Hindi – Fluent', 'English – Intermediate'],
    declaration:
      'I hereby declare that all the information provided above is true and correct to the best of my knowledge.',
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] sm:p-8 lg:p-10">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <p className="mb-3 rounded-full bg-red-100 px-4 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-blue-900">
              About Me
            </p>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{profile.name}</h1>
            <p className="mt-3 text-lg text-slate-600">{profile.location}</p>
            <p className="text-lg text-slate-600">Phone: {profile.phone}</p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              {profile.objective}
            </p>
          </div>

          <div className="shrink-0">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-4 border-blue-200 bg-white p-2 shadow-lg sm:h-52 sm:w-52">
              <img
                src="/images/profile-photo.jpg"
                alt="Mukesh Bist"
                className="h-full w-full rounded-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Education</h2>
            <div className="space-y-2 text-slate-700">
              <p className="font-semibold">{profile.education.degree}</p>
              <p>{profile.education.college}</p>
              <p>{profile.education.university}</p>
              <p className="text-sm text-slate-500">{profile.education.period}</p>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Projects</h2>
            <ul className="space-y-3 text-slate-700">
              {profile.projects.map((project) => (
                <li key={project.title}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-blue-600 transition hover:text-blue-800"
                  >
                    • {project.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Strengths</h2>
            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              {profile.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl bg-linear-to-br from-blue-600 to-slate-900 p-6 text-white shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Languages</h2>
            <ul className="space-y-2">
              {profile.languages.map((language) => (
                <li key={language} className="text-sm sm:text-base">
                  • {language}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Declaration</h2>
            <p className="leading-7 text-slate-700">{profile.declaration}</p>
            <p className="mt-4 text-sm text-slate-500">I am eager to contribute, learn, and grow.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About
