import React, { useState } from "react";

const Services = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <>
      <section className="bg-[#8FB339] text-white">
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-16 text-center">
          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-semibold mb-3">Services</h1>

          {/* Breadcrumb */}
          <div className="flex justify-center items-center gap-2 text-[11px] md:text-xs uppercase tracking-wider text-white/90">
            <span className="hover:text-white cursor-pointer">Home</span>
            <span>›</span>
            <span className="hover:text-white cursor-pointer">Services</span>
            <span>›</span>
            <span className="text-white">Contact Us</span>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="w-full overflow-hidden leading-none -mb-1">
          <svg
            viewBox="0 0 1440 100"
            className="w-full h-12 md:h-14"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C360,100 1580,0 1000,500 L1440,100 L0, M0"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-700">
              Providing our trusted{" "}
              <span className="text-[#f4b400]">Services</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              It is a long established fact that a reader will be of a page when
              established fact looking at its layout.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-14">
            {/* Card 1 */}
            <div className="mb-0">
              <div className="p-6 bg-white rounded-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
                <div className="text-[#8BAE3F] text-4xl mb-6">⚙️</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">
                  Manage Job Ads
                </h3>
                <p className="text-gray-500 mb-4">
                  We quickly learn to fear and thus automatically avoid
                  potentially stressful situations of all kinds.
                </p>
                <a href="#" className="text-[#8BAE3F] font-medium">
                  Learn More →
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div>
              <div className="p-6 bg-white rounded-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
                <div className="text-[#8BAE3F] text-4xl mb-6">📩</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">
                  Temp Search
                </h3>
                <p
                  className={`text-gray-500 mb-4 ${
                    expanded === 0 ? "" : "line-clamp-3"
                  }`}
                >
                  Search temporary jobs quickly and efficiently with our smart
                  filtering system. Find flexible opportunities that match your
                  skills, experience, and preferred work schedule.
                </p>
                <button
                  onClick={() => setExpanded(expanded === 0 ? null : 0)}
                  className="text-[#8BAE3F] font-medium"
                >
                  {expanded === 0 ? "Show Less ↑" : "Learn More →"}
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div>
              <div className="p-6 bg-white rounded-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
                <div className="text-[#8BAE3F] text-4xl mb-6">🖥️</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">
                  Display Jobs
                </h3>
                <p
                  className={`text-gray-500 mb-4 ${
                    expanded === 0 ? "" : "line-clamp-3"
                  }`}
                >
                  Intrinsically incubate intuitive opportunities and real-time
                  potentialities. Appropriately communicate one-to-one
                  technology.
                </p>
                <button
                  onClick={() => setExpanded(expanded === 0 ? null : 0)}
                  className="text-[#8BAE3F] font-medium"
                >
                  {expanded === 0 ? "Show Less ↑" : "Learn More →"}
                </button>
              </div>
            </div>

            {/* Card 4 */}
            <div>
              <div className="p-6 bg-white rounded-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
                <div className="text-[#8BAE3F] text-4xl mb-6">🚀</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">
                  For Agencies
                </h3>
                <p className="text-gray-500 mb-4">
                  At missed advice my it no sister. Miss told ham dull knew see
                  she spot near can.
                </p>
                <a href="#" className="text-[#8BAE3F] font-medium">
                  Learn More →
                </a>
              </div>
            </div>

            {/* Card 5 */}
            <div>
              <div className="p-6 bg-white rounded-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
                <div className="text-[#8BAE3F] text-4xl mb-6">⏱️</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">
                  Quick Support
                </h3>
                <p
                  className={`text-gray-500 mb-4 ${
                    expanded === 4 ? "" : "line-clamp-3"
                  }`}
                >
                  Designers have a lot of tools to make a story more
                  interesting. You can align your image to the leftcenter with a
                  caption.
                </p>
                <button
                  onClick={() => setExpanded(expanded === 4 ? null : 4)}
                  className="text-[#8BAE3F] font-medium"
                >
                  {expanded === 4 ? "Show Less ↑" : "Learn More →"}
                </button>
              </div>
            </div>

            {/* Card 6 */}
            <div>
              <div className="p-6 bg-white rounded-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
                <div className="text-[#8BAE3F] text-4xl mb-6">🔖</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">
                  Bookmark Jobs
                </h3>
                <p className="text-gray-500 mb-4">
                  Becomes an interactive story that can engage users. Designers
                  have a lot of tools to make a story more interesting.
                </p>
                <a href="#" className="text-[#8BAE3F] font-medium">
                  Learn More →
                </a>
              </div>
            </div>

            {/* Card 7 */}
            <div>
              <div className="p-6 bg-white rounded-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
                <div className="text-[#8BAE3F] text-4xl mb-6">📚</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">
                  Creative Design
                </h3>
                <p
                  className={`text-gray-500 mb-4 ${
                    expanded === 0 ? "" : "line-clamp-3"
                  }`}
                >
                  A business consulting agency is involved in the planning,
                  implementation, and education of businesses. We work directly.
                </p>
                <button
                  onClick={() => setExpanded(expanded === 4 ? null : 4)}
                  className="text-[#8BAE3F] font-medium"
                >
                  {expanded === 4 ? "Show Less ↑" : "Learn More →"}
                </button>
              </div>
            </div>

            {/* Card 8 */}
            <div>
              <div className="p-6 bg-white rounded-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
                <div className="text-[#8BAE3F] text-4xl mb-6">⚓</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">
                  Strategy & Research
                </h3>
                <p className="text-gray-500 mb-4">
                  The most important aspect of beauty was, therefore, an
                  inherent part of an object, rather than something.
                </p>
                <a href="#" className="text-[#8BAE3F] font-medium">
                  Learn More →
                </a>
              </div>
            </div>

            {/* Card 9 */}
            <div>
              <div className="p-6 bg-white rounded-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
                <div className="text-[#8BAE3F] text-4xl mb-6">📊</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">
                  Real-time Analytics
                </h3>
                <p className="text-gray-500 mb-4">
                  This response is important for our ability to learn from
                  mistakes, but it also gives rise to self-criticism.
                </p>
                <button
                  onClick={() => setExpanded(expanded === 0 ? null : 0)}
                  className="text-[#8BAE3F] font-medium"
                >
                  {expanded === 0 ? "Show Less ↑" : "Learn More →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
