import React from "react";

const About = () => {
  return (
    <>

   <section className="bg-[#8FB339]  text-white">

  <div className="max-w-7xl mx-auto px-6 pt-14 pb-16 text-center">

    {/* Heading */}
    <h1 className="text-2xl md:text-3xl font-semibold mb-3">
      About Us
    </h1>

    {/* Breadcrumb */}
    <div className="flex justify-center items-center gap-2 text-[11px] md:text-xs uppercase tracking-wider text-white/90">
      <span className="hover:text-white cursor-pointer">Home</span>
      <span>›</span>
      <span className="hover:text-white cursor-pointer">About</span>
      <span>›</span>
      <span className="text-white">Clients</span>
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
        d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
        fill="#f9fafb"
      />
    </svg>
  </div>

</section>



      <section className="bg-white py-14">
 <div className="max-w-7xl mx-auto pl-10 pr-4 grid md:grid-cols-12 gap-6 items-center">


    
    {/* Left Content */}
    <div className="md:col-span-5">

      <h4 className="font-semibold text-gray-600 uppercase tracking-wide mb-4">
        About Us
      </h4>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 leading-snug">
        Your Partner in Recruitment Success with
        <span className="text-[#8FB339]"> SR Web Services</span>
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6 text-justify">
        At SR Web Services, we bring years of industry expertise and a passion
        for connecting people. Our team of recruitment specialists is
        dedicated to matching the right talent with the right role—fast,
        efficiently, and with integrity.
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        We serve startups, SMEs, and enterprise clients across sectors like IT,
        healthcare, finance, and manufacturing. Whether you're hiring full-time,
        contract, or remote staff, we deliver results that grow your business.
      </p>

      {/* List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-gray-600 mb-8">
        
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <span className="text-[#8FB339] font-bold">✔</span>
            <p>Tailored recruitment strategies</p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#8FB339] font-bold">✔</span>
            <p>Pre-screened and qualified candidates</p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#8FB339] font-bold">✔</span>
            <p>Faster hiring with less hassle</p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#8FB339] font-bold">✔</span>
            <p>Access exclusive job openings</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <span className="text-[#8FB339] font-bold">✔</span>
            <p>Career guidance from real experts</p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#8FB339] font-bold">✔</span>
            <p>Resume and interview support</p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#8FB339] font-bold">✔</span>
            <p>and more...</p>
          </div>
        </div>
      </div>

      {/* Button */}
      <button className="bg-[#8FB339] text-white px-7 py-3 rounded-md font-medium hover:bg-[#7aa32f] transition duration-300 shadow-md">
        Learn More →
      </button>
    </div>

    {/* Right Image */}
    <div className="md:col-span-7 flex justify-end">

      <img
        src="/about1.png"
        alt="Recruitment Illustration"
        className="w-full object-cover h-full"



      />
    </div>

  </div>
</section>


    </>
  );
};

export default About;
