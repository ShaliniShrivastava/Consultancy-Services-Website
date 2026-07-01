import React from "react";
import { Timer } from "lucide-react";
import { Link } from "react-router-dom";

const Clients = () => {
  return (
    <>
      {/* SECTION 1 - HERO */}
      <section className="bg-gray-50 py-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 items-center gap-10">
          {/* LEFT CONTENT */}
          <div className="md:col-span-6 text-center md:text-left order-2 md:order-1">
            <h1 className="text-[36px] md:text-[60px] leading-[1.1] font-bold text-[#8FB339] mb-6">
              Redefining the Future of Recruitment - Today.
            </h1>

            <p className="text-[18px] md:text-[20px] text-[#0F5C4E] leading-[1.7] mb-8 max-w-[600px] mx-auto md:mx-0 font-semibold">
              Bringing talent onboard can be faster, smoother and smarter; we've
              nailed it all. Let's elevate your hiring approach today.
            </p>

            <button className="bg-[#8FB339] hover:bg-[#7aa32f] text-white font-semibold px-8 py-4 rounded-md text-[16px] transition w-full md:w-auto">
              COLLABORATE WITH TOMORROW'S HIRING POWER
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="md:col-span-6 flex justify-center md:justify-end order-1 md:order-2">
            <img
              src="client1.png"
              alt="Recruitment"
              className="w-full max-w-[450px] md:max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2 - TECH & STATS */}
      <section className="relative bg-white py-12 md:py-20 overflow-hidden">
        {/* LEFT SIDE WAVE */}
        <img
          src="/wave.png"
          alt="wave background"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] md:w-[600px] opacity-40 pointer-events-none z-0"
        />

        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16 relative z-10">
          {/* LEFT IMAGE */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-[350px] aspect-square md:aspect-[5/6] overflow-hidden shadow-xl rounded-[35%_80%_90%_40%_/_35%_30%_80%_70%]">
              <img
                src="/client2.png"
                alt="Technology Recruitment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <h2 className="text-[22px] md:text-[26px] leading-[1.2] font-bold text-[#0e5f53] mb-6">
              Our advanced technology connects with{" "}
              <br className="hidden lg:block" />
              <span className="text-[#0e5f53]">
                30,000 candidates every month—
              </span>{" "}
              so you can relax while we handle the search.
            </h2>

            <div className="space-y-5 text-[15px] text-gray-600 leading-relaxed text-left">
              <p>
                We’ve redefined the recruitment playbook. Shrinking talent
                pools, bias, and long search times have challenged recruiters
                for years, so SR Consultancy tackled them with innovation.
              </p>

              <p>
                Instead of a 360 approach, we deploy specialists who excel at
                each stage. Our sourcing team uses AI and machine learning to
                locate candidates worldwide who match your criteria.
              </p>

              {/* STATS LIST */}
              <ul className="space-y-2 text-sm pt-2 font-medium text-gray-800">
                <li className="flex items-start">
                  <span className="mr-2 text-[#8FB339]">•</span>
                  <span>70% of candidates engage with our recruiters.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#8FB339]">•</span>
                  <span>Over a third speak to us about job opportunities.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#8FB339]">•</span>
                  <span>
                    We refine that longlist for you—only one in four reach your
                    desk.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#8FB339]">•</span>
                  <span>
                    Two-thirds of candidates we forward get selected for
                    interview.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - FULL WIDTH CTA */}
      <section className="bg-gray-100 py-6">
        <div className="mx-2 md:mx-4">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#c8d6a0] rounded-full flex items-center justify-center">
                <span className="text-4xl">⏱️</span>
              </div>
            </div>

            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8 text-[16px] md:text-[18px]">
              Our proven methods help clients reduce time-to-hire, improve
              candidate quality, and fill more roles. Discover how your
              recruitment can be faster and more efficient.
            </p>

            <button className="bg-[#8BAE3F] text-white px-8 py-3 rounded-md hover:bg-[#7a9d35] transition font-bold">
              Speak to us
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4 - HOW IT WORKS */}
      <section className="bg-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-[36px] md:text-[64px] font-semibold leading-tight mb-6">
            <span className="text-[#2f3a3f]">How </span>
            <span className="text-[#8FB339]">SR Web Works?</span>
          </h2>

          <p className="text-[16px] md:text-[18px] text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6 font-semibold">
            At SR Web Consultancy, recruitment isn’t what you’d expect. We’ve
            redefined the process using smart technology and a people-first
            mindset—ensuring we find candidates who truly fit your needs.
          </p>

          <p className="text-[18px] font-semibold text-gray-700">
            Here’s what we do:
          </p>
        </div>
      </section>

      {/* SECTION 5 - SOLUTIONS */}
      <section className="bg-white pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[36px] md:text-[64px] font-semibold text-[#8FB339] text-center mb-12">
            Solutions Offered
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16">
            {/* LEFT IMAGE */}
            <div className="flex justify-center">
              <div className="overflow-hidden rounded-[30px] md:rounded-[50px] w-full max-w-[500px]">
                <img
                  src="client3.png"
                  alt="Agency"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="text-center md:text-left">
              <h3 className="text-[24px] font-semibold text-[#0e5f53] mb-4">
                Agency
              </h3>

              <div className="space-y-6 text-gray-600 leading-relaxed text-[15px] md:text-[16px]">
                <p>
                  We've transformed recruitment to make it faster, simpler, and
                  more impactful for you. Whether candidates are actively
                  searching or not, we'll find top talent worldwide. Our
                  machine-learning tech filters candidates with precision and
                  without bias, so you only see the most relevant.
                </p>
                <p>
                  From day one, we partner with you to fully understand your job
                  needs. That way, the candidates we suggest aren’t just
                  qualified—they’re tailored to your role and company culture.
                </p>
                <p className="mb-8">
                  Whether you need permanent, contract, temporary, or contingent
                  staff, we’re here to help.
                </p>
              </div>

              <button className="bg-[#8FB339] hover:bg-[#7aa32f] text-white px-8 py-3 rounded-md font-medium transition w-full md:w-auto">
                Connect with us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - CARDS */}
      <section className="relative bg-white py-16 md:py-24 overflow-hidden">
        <img
          src="/wave.png"
          className="absolute left-0 bottom-0 w-[400px] opacity-40 z-0"
          alt=""
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-[30px] md:text-[40px] font-semibold text-[#8FB339] mb-4">
              Explore more services
            </h2>
            <p className="text-gray-600 text-[14px] leading-relaxed max-w-2xl mx-auto">
              If our Agency solution doesn’t quite fit your needs, SR Web
              Consultancy offers a full range of alternative services, providing
              access to our expert team and smart technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "SR Senior Appointments",
                icon: "🏅",
                desc: "SR Web Consultancy uses retained search and market insights to find top senior leaders for your business. From longlisting to onboarding, our dedicated team manages the entire hiring journey.",
              },
              {
                title: "SR Outsource",
                icon: "🔀",
                desc: "Large projects demand expert recruiters and dedicated teams. Whether it's a team of two or fifty, we'll handle hiring, onboarding, and management for a fixed monthly fee.",
              },
              {
                title: "SR Embedded",
                icon: "🖥️",
                desc: "As your in-house recruitment partner, we embed specialists directly within your team, ensuring strategic support and a consistent pipeline of top-tier candidates.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-8 md:p-10 text-center hover:shadow-xl transition"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-[#dfe8c7] rounded-full flex items-center justify-center text-3xl">
                  {card.icon}
                </div>
                <h3 className="text-[20px] md:text-[22px] font-semibold text-[#8FB339] mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                  {card.desc}
                </p>
                <button className="bg-[#8FB339] text-white px-6 py-2 rounded-md hover:bg-[#7aa32f] transition w-full">
                  Find Out More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 - SECTORS */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[36px] md:text-[60px] font-normal text-[#8FB339] text-center mb-6 tracking-tight">
            Our specialist sectors
          </h2>
          <p className="text-center text-[#2D5A4C] mb-12 text-[16px] md:text-[18px] font-medium leading-relaxed">
            We specialise in recruiting for engineering, life sciences, IT and
            finance companies. We can help you find any roles you need. Some of
            our previous clients include:
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { name: "IT", icon: "💻" },
              { name: "Accounting & Finance", icon: "📂" },
              { name: "Tech", icon: "⚙️" },
              { name: "Telecoms", icon: "🌐" },
              { name: "e-Commerce", icon: "🛒" },
              { name: "Engineering", icon: "🛠️" },
              { name: "Life Sciences", icon: "🧪" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 text-center w-[140px] md:w-[160px] hover:-translate-y-2 transition"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-[#E9F0D3] rounded-full flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-sm md:text-base font-bold text-[#1F4D3F]">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 - LOCATIONS */}
      <section className="bg-white py-12 md:py-24 text-center">
        <h2 className="text-[40px] md:text-[64px] font-light text-[#8FB339] mb-8">
          Our Locations
        </h2>
        <div className="flex justify-center px-4">
          <img
            src="location_map.png"
            alt="Map"
            className="w-full max-w-2xl h-auto"
          />
        </div>
      </section>

      {/* SECTION 9 - FINAL CTA */}
      <section className="relative min-h-[500px] flex items-center justify-center text-center text-white py-12 px-6 overflow-hidden">
        <img
          src="clientbottom.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-black/60 md:bg-gradient-to-b md:from-[#5c7f1e]/75 md:to-black/100"></div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-[32px] md:text-[45px] font-bold mb-8 leading-tight">
            Get in touch to unlock your recruitment potential
          </h2>
          <p className="text-[18px] md:text-[20px] font-semibold mb-8">
            You're only a step away from accessing our expertise and
            supercharging your job ads. Contact us here to find out more
          </p>
          <Link to="/contact">
  <button className="bg-white text-[#0e5f53] px-10 py-4 rounded-md font-bold hover:bg-gray-100 transition">
    CONTACT US
  </button>
</Link>
        </div>
      </section>
    </>
  );
};

export default Clients;
