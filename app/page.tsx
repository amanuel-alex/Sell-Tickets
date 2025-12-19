import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200/80 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                <span className="text-sm font-bold text-white">AC</span>
              </div>
              <span className="text-lg font-semibold text-slate-900">
               AmazingComp
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/#home"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                Home
              </Link>
              <Link
                href="/#features"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                Features
              </Link>
              <Link
                href="/#services"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                Services
              </Link>
              <Link
                href="/#about"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                About
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden px-4 pt-20 pb-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-sm text-indigo-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-600"></span>
              <span>Event Ticketing Platform</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Manage Events,
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Sell Tickets
              </span>
              <br />
              Grow Your Business
            </h1>
            <p className="mb-10 text-xl text-slate-600 sm:text-2xl">
              The complete platform for event organizers to create, manage, and
              sell tickets with powerful analytics and seamless payouts.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/auth/register"
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30 sm:w-auto"
              >
                <span className="relative z-10">Start Selling Tickets</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </Link>
              <Link
                href="/organizer/dashboard"
                className="w-full rounded-xl border-2 border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition-all hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
              >
                View Demo Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute left-1/2 top-0 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 blur-3xl"></div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-slate-600">
              Powerful tools for organizers and comprehensive admin controls
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-indigo-300 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Event Management
              </h3>
              <p className="text-slate-600">
                Create, edit, and manage events with ease. Set up ticket types,
                pricing, and seating maps all in one place.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-purple-300 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Real-time Analytics
              </h3>
              <p className="text-slate-600">
                Track sales, revenue, and attendance with detailed reports and
                insights to optimize your events.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-pink-300 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/25">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                QR Code Validation
              </h3>
              <p className="text-slate-600">
                Fast and secure ticket validation with QR scanning. Support
                offline mode for reliable check-ins.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-indigo-300 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Secure Payouts
              </h3>
              <p className="text-slate-600">
                Get paid quickly and securely. Support for bank transfers and
                mobile money with transparent fee structures.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-purple-300 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Customer Management
              </h3>
              <p className="text-slate-600">
                Build relationships with your customers. Track purchase history
                and send targeted promotions.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-pink-300 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/25">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Advanced Reports
              </h3>
              <p className="text-slate-600">
                Comprehensive reporting with export options. Understand your
                business performance at a glance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Our Services
            </h2>
            <p className="text-lg text-slate-600">
              Comprehensive ticketing solutions tailored to your needs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-white p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">Event Ticketing</h3>
              <p className="text-slate-600">
                Sell tickets online with multiple payment options, QR codes, and real-time inventory management.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-purple-50 to-white p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">Analytics & Reporting</h3>
              <p className="text-slate-600">
                Track sales, revenue, and customer insights with detailed analytics and exportable reports.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-pink-50 to-white p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">Payment Processing</h3>
              <p className="text-slate-600">
                Secure payment processing with automated payouts via bank transfer or mobile money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide Section */}
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              What We Provide
            </h2>
            <p className="text-lg text-slate-600">
              A comprehensive ticketing solution designed for modern event organizers
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Organizer Features */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">For Organizers</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-slate-900">Complete Event Management</p>
                    <p className="text-sm text-slate-600">Create events with multiple ticket types, seating maps, and venue management</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-slate-900">Real-time Sales Dashboard</p>
                    <p className="text-sm text-slate-600">Monitor ticket sales, revenue, and customer data in real-time</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-slate-900">QR Code Ticket Validation</p>
                    <p className="text-sm text-slate-600">Fast check-in system with offline mode support for reliable validation</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-slate-900">Automated Payouts</p>
                    <p className="text-sm text-slate-600">Get paid automatically via bank transfer or mobile money with transparent fees</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-slate-900">Promotion & Marketing Tools</p>
                    <p className="text-sm text-slate-600">Create promo codes, featured listings, and targeted customer campaigns</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-slate-900">Advanced Analytics & Reports</p>
                    <p className="text-sm text-slate-600">Export detailed reports, track customer behavior, and optimize your events</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Column - Admin Features */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-purple-50 to-pink-50 p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">For Platform Admins</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-slate-900">Organizer Approval & Management</p>
                    <p className="text-sm text-slate-600">Review and approve organizer applications, manage accounts and commission rates</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-slate-900">Event Moderation</p>
                    <p className="text-sm text-slate-600">Approve events, manage featured listings, and ensure platform quality</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-slate-900">Transaction & Payment Oversight</p>
                    <p className="text-sm text-slate-600">Monitor all transactions, process payouts, and handle refunds efficiently</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-slate-900">Platform Analytics</p>
                    <p className="text-sm text-slate-600">Comprehensive insights into GMV, user growth, and platform performance</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-slate-900">Content Management</p>
                    <p className="text-sm text-slate-600">Manage homepage banners, categories, cities, and platform-wide promotions</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-slate-900">Fraud Detection & Security</p>
                    <p className="text-sm text-slate-600">Identify suspicious activity, manage blacklists, and maintain platform integrity</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Trusted by Event Organizers
            </h2>
            <p className="text-lg text-slate-600">
              See what our customers are saying about AmazingComp
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-slate-700">
                &quot;AmazingComp transformed how we manage our events. The dashboard is intuitive, and ticket sales have increased by 40% since we started using it.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-semibold text-white">
                  SM
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Sarah Mitchell</p>
                  <p className="text-sm text-slate-500">Music Festival Organizer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-slate-700">
                &quot;The QR code validation system is a game-changer. We can check in hundreds of attendees quickly, and the offline mode saved us during a network outage.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-semibold text-white">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-slate-900">James Davis</p>
                  <p className="text-sm text-slate-500">Conference Organizer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-slate-700">
                &quot;Payouts are fast and reliable. We get our money within 48 hours, and the analytics help us understand our audience better. Highly recommended!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-sm font-semibold text-white">
                  AK
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Aisha Khan</p>
                  <p className="text-sm text-slate-500">Sports Event Manager</p>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-slate-700">
                &quot;The customer management features are excellent. We can track repeat customers and send targeted promotions. Our customer retention has improved significantly.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-sm font-semibold text-white">
                  RT
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Robert Thompson</p>
                  <p className="text-sm text-slate-500">Theater Producer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 5 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-slate-700">
                &quot;Setting up events is so easy. The multi-step form guides you through everything, and the seating map feature is perfect for our venue.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-sm font-semibold text-white">
                  ML
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Maria Lopez</p>
                  <p className="text-sm text-slate-500">Concert Promoter</p>
                </div>
              </div>
            </div>

            {/* Testimonial 6 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-slate-700">
                &quot;The reporting features are comprehensive. We export data for our accounting team, and the financial summaries make tax season much easier.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-500 text-sm font-semibold text-white">
                  DW
                </div>
                <div>
                  <p className="font-semibold text-slate-900">David Wilson</p>
                  <p className="text-sm text-slate-500">Corporate Event Planner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaigns Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white"></span>
                <span>Join Our Campaign</span>
              </div>
              <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
                Grow With Us
              </h2>
              <p className="mb-6 text-xl text-indigo-100">
                Be part of the fastest-growing event ticketing platform. Join thousands of organizers who trust AmazingComp to power their events.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Early Adopter Benefits</p>
                    <p className="text-sm text-indigo-100">Reduced platform fees and priority support for early organizers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Featured Placement</p>
                    <p className="text-sm text-indigo-100">Get your events featured on the homepage and in promotional campaigns</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Marketing Support</p>
                    <p className="text-sm text-indigo-100">Access to our marketing resources and co-promotion opportunities</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                <h3 className="mb-4 text-2xl font-bold text-white">Start Your Journey</h3>
                <p className="mb-6 text-indigo-100">
                  Register now and become part of our growing community of successful event organizers.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/auth/register"
                    className="block w-full rounded-xl bg-white px-6 py-3 text-center font-semibold text-indigo-600 transition-all hover:scale-105 hover:shadow-xl"
                  >
                    Join as Organizer
                  </Link>
                  <Link
                    href="/organizer/dashboard"
                    className="block w-full rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 text-center font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                  >
                    View Platform Demo
                  </Link>
                </div>
                <div className="mt-6 flex items-center justify-center gap-6 text-sm text-indigo-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">10K+</p>
                    <p>Active Organizers</p>
                  </div>
                  <div className="h-12 w-px bg-white/20"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">500K+</p>
                    <p>Tickets Sold</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Ready to get started?
          </h2>
          <p className="mb-8 text-xl text-indigo-100">
            Join thousands of event organizers already using AmazingComp to grow
            their business.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/register"
              className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-indigo-600 shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              Create Free Account
            </Link>
            <Link
              href="/organizer/dashboard"
              className="rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                About AmazingComp
              </h2>
              <p className="mb-4 text-lg text-slate-600">
                AmazingComp is a modern, comprehensive event ticketing platform designed to empower event organizers and streamline the entire ticketing process. We combine powerful technology with intuitive design to help you succeed.
              </p>
              <p className="mb-6 text-lg text-slate-600">
                Founded with a mission to make event management accessible and efficient, we&apos;ve built a platform that handles everything from ticket creation to customer management, payment processing, and detailed analytics.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-2xl font-bold text-slate-900">10K+</p>
                  <p className="text-sm text-slate-600">Active Organizers</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-2xl font-bold text-slate-900">500K+</p>
                  <p className="text-sm text-slate-600">Tickets Sold</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-2xl font-bold text-slate-900">50K+</p>
                  <p className="text-sm text-slate-600">Events Created</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-2xl font-bold text-slate-900">99.9%</p>
                  <p className="text-sm text-slate-600">Uptime</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">Our Mission</h3>
                  <p className="text-slate-600">
                    To provide event organizers with the tools they need to create, manage, and grow successful events while delivering exceptional experiences to their customers.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6">
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">Our Vision</h3>
                  <p className="text-slate-600">
                    To become the leading event ticketing platform globally, recognized for innovation, reliability, and exceptional customer support.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-pink-50 to-rose-50 p-6">
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">Our Values</h3>
                  <p className="text-slate-600">
                    Innovation, transparency, customer-first approach, and continuous improvement drive everything we do.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                  <span className="text-sm font-bold text-white">ET</span>
                </div>
                <span className="text-lg font-semibold text-slate-900">
                  AmazingComp
                </span>
              </div>
              <p className="text-sm text-slate-600">
                The complete event ticketing platform for modern organizers.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-slate-900">
                Navigation
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/#home" className="hover:text-slate-900">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#features" className="hover:text-slate-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-slate-900">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:text-slate-900">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-slate-900">
                Account
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link
                    href="/auth/login"
                    className="hover:text-slate-900"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/register"
                    className="hover:text-slate-900"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-slate-900">
                Support
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/organizer/help" className="hover:text-slate-900">
                    Help Center
                  </Link>
                </li>
                <li>
                  <a href="#contact" className="hover:text-slate-900">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            <p>© 2024 ET Ticket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
