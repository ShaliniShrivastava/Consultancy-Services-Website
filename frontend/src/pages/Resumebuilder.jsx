import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const API = "http://localhost:3000/api";

// ─── Step Indicator ───────────────────────────────────────────────────────────
const steps = ["Fill Form", "Pay ₹50", "Download Resume"];

const StepBar = ({ current }) => (
  <div className="flex items-center justify-center gap-0 mb-8">
    {steps.map((s, i) => (
      <div key={i} className="flex items-center">
        <div className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
              ${i < current ? "bg-[#8FB339] border-[#8FB339] text-white" : i === current ? "bg-white border-[#8FB339] text-[#8FB339]" : "bg-gray-100 border-gray-300 text-gray-400"}`}
          >
            {i < current ? "✓" : i + 1}
          </div>
          <span
            className={`text-[9px] mt-1 font-semibold whitespace-nowrap ${i === current ? "text-[#8FB339]" : "text-gray-400"}`}
          >
            {s}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div
            className={`w-10 h-0.5 mb-4 ${i < current ? "bg-[#8FB339]" : "bg-gray-200"}`}
          />
        )}
      </div>
    ))}
  </div>
);

// ─── PDF Generator ────────────────────────────────────────────────────────────
const generateResumePDF = (data) => {
  const doc = new jsPDF();
  const green = [143, 179, 57];
  const dark = [30, 30, 30];

  doc.setFillColor(...green);
  doc.rect(0, 0, 210, 45, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(data.name || "Your Name", 15, 20);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(data.designation || "", 15, 30);

  doc.setFontSize(9);
  doc.text(`Email: ${data.email}   Phone: ${data.phone}`, 15, 40);

  let y = 55;

  if (data.summary) {
    doc.setTextColor(...green);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("PROFESSIONAL SUMMARY", 15, y);
    doc.setDrawColor(...green);
    doc.line(15, y + 2, 195, y + 2);
    y += 8;
    doc.setTextColor(...dark);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const summaryLines = doc.splitTextToSize(data.summary, 180);
    doc.text(summaryLines, 15, y);
    y += summaryLines.length * 5 + 6;
  }

  if (data.skills?.length > 0) {
    doc.setTextColor(...green);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("SKILLS", 15, y);
    doc.setDrawColor(...green);
    doc.line(15, y + 2, 195, y + 2);
    y += 8;
    doc.setTextColor(...dark);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const skillLines = data.skills.map((skill) => `• ${skill}`);
    doc.text(skillLines, 15, y);

    y += skillLines.length * 5 + 6;
  }

  if (data.education?.length > 0) {
    doc.setTextColor(...green);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("EDUCATION", 15, y);
    doc.setDrawColor(...green);
    doc.line(15, y + 2, 195, y + 2);
    y += 4;
    autoTable(doc, {
      startY: y,
      head: [["Degree", "Institute", "Year", "Score"]],
      body: data.education.map((e) => [
        e.degree,
        e.institute,
        e.year,
        e.percentage,
      ]),
      headStyles: { fillColor: green, fontSize: 8 },
      bodyStyles: { fontSize: 8 },
      margin: { left: 15, right: 15 },
    });
    y = doc.lastAutoTable.finalY + 6;
  }

autoTable(doc, {
  startY: y,
  head: [["Company", "Role", "Duration"]],
  body: data.experience.flatMap((e) => [
    // First row
    [e.company, e.role, e.duration],

    // Second row (formatted description)
    [
      {
        content: e.description
          .split(",") 
          .map((d) => `• ${d.trim()}`) 
          .join("\n"), 
        colSpan: 3,
        styles: {
          fontStyle: "normal",
          textColor: [80, 80, 80],
          cellPadding: 2,
        },
      },
    ],
  ]),
  headStyles: { fillColor: green, fontSize: 9 },
  bodyStyles: { fontSize: 9 },
  margin: { left: 15, right: 15 },
});

  doc.save(`${data.name || "Resume"}_Resume.pdf`);
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ResumeBuilder({ onClose }) {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    designation: "",
    summary: "",
    skills: "",
    education: [{ degree: "", institute: "", year: "", percentage: "" }],
    experience: [{ company: "", role: "", duration: "", description: "" }],
  });

  const set = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const setEdu = (i, field, val) => {
    const arr = [...form.education];
    arr[i][field] = val;
    set("education", arr);
  };
  const addEdu = () =>
    set("education", [
      ...form.education,
      { degree: "", institute: "", year: "", percentage: "" },
    ]);
  const removeEdu = (i) =>
    set(
      "education",
      form.education.filter((_, idx) => idx !== i),
    );

  const setExp = (i, field, val) => {
    const arr = [...form.experience];
    arr[i][field] = val;
    set("experience", arr);
  };
  const addExp = () =>
    set("experience", [
      ...form.experience,
      { company: "", role: "", duration: "", description: "" },
    ]);
  const removeExp = (i) =>
    set(
      "experience",
      form.experience.filter((_, idx) => idx !== i),
    );

  // ── Razorpay Payment ────────────────────────────────────────────────────────
  const handlePayment = async () => {
    if (!form.name || !form.email || !form.phone || !form.designation) {
      setError("All Fields Required!");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const orderRes = await axios.post(`${API}/resume-builder/create-order`);
      const order = orderRes.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "SR Web — Resume Builder",
        description: "Professional Resume ₹50",
        order_id: order.id,
        handler: async (response) => {
          try {
            console.log("Payment response:", response);

            const verifyRes = await axios.post(
              `${API}/resume-builder/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
            );

            console.log("Verify response:", verifyRes.data);

            if (verifyRes.data.success) {
              await axios.post(
                `${API}/resume-builder/save`,
                {
                  userId: user?.id,
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                  designation: form.designation,
                  summary: form.summary,
                  education: JSON.stringify(form.education),
                  experience: JSON.stringify(form.experience),
                  skills: JSON.stringify(
                    form.skills
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  ),
                  razorpayOrderId: order.id,
                },
                { withCredentials: true },
              );

              setStep(2); // Download step
            } else {
              setError("Payment verification failed. Please try again.");
            }
          } catch (err) {
            console.error("Handler error:", err);
            setError("Payment  is not successful, try again!");
          }
        },
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#8FB339" },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.response?.data?.message || "Payment mein error!");
    } finally {
      setLoading(false);
    }
  };

  // ── Download PDF ────────────────────────────────────────────────────────────
  const handleDownload = () => {
    generateResumePDF({
      ...form,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
  };

  const inp =
    "w-full p-2.5 rounded-lg border border-gray-200 outline-none focus:border-[#8FB339] text-sm bg-gray-50";
  const label =
    "text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1 block";

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-4 relative">
        {/* Header */}
        <div className="bg-[#8FB339] rounded-t-2xl px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-white font-bold text-lg">📄 Resume Builder</h2>
            <p className="text-white/80 text-xs">
              Professional resume in only ₹50
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <StepBar current={step} />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-4 py-2 mb-4">
              ⚠️ {error}
            </div>
          )}

          {/* ── STEP 0: Form ── */}
          {step === 0 && (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={label}>Full Name *</label>
                  <input
                    className={inp}
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Shalini Shirivastava"
                  />
                </div>
                <div>
                  <label className={label}>Email *</label>
                  <input
                    className={inp}
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="shalini@email.com"
                  />
                </div>
                <div>
                  <label className={label}>Phone *</label>
                  <input
                    className={inp}
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="9876543210"
                  />
                </div>
                <div>
                  <label className={label}>Designation *</label>
                  <input
                    className={inp}
                    value={form.designation}
                    onChange={(e) => set("designation", e.target.value)}
                    placeholder="React Developer"
                  />
                </div>
              </div>

              <div>
                <label className={label}>Professional Summary</label>
                <textarea
                  className={inp + " resize-none"}
                  rows={3}
                  value={form.summary}
                  onChange={(e) => set("summary", e.target.value)}
                  placeholder="Briefly describe your professional background and key strengths."
                />
              </div>

              <div>
                <label className={label}>Skills (seperate with comma)</label>
                <input
                  className={inp}
                  value={form.skills}
                  onChange={(e) => set("skills", e.target.value)}
                  placeholder="React, Node.js, MongoDB, Tailwind"
                />
              </div>

              {/* Education */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className={label + " mb-0"}>Education</label>
                  <button
                    onClick={addEdu}
                    className="text-[#8FB339] text-xs font-bold hover:underline"
                  >
                    + Add
                  </button>
                </div>
                {form.education.map((e, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 gap-2 mb-2 p-3 bg-gray-50 rounded-lg relative"
                  >
                    {form.education.length > 1 && (
                      <button
                        onClick={() => removeEdu(i)}
                        className="absolute top-2 right-2 text-red-400 text-xs"
                      >
                        ✕
                      </button>
                    )}
                    <input
                      className={inp}
                      placeholder="Degree (B.Tech)"
                      value={e.degree}
                      onChange={(ev) => setEdu(i, "degree", ev.target.value)}
                    />
                    <input
                      className={inp}
                      placeholder="Institute"
                      value={e.institute}
                      onChange={(ev) => setEdu(i, "institute", ev.target.value)}
                    />
                    <input
                      className={inp}
                      placeholder="Year (2024)"
                      value={e.year}
                      onChange={(ev) => setEdu(i, "year", ev.target.value)}
                    />
                    <input
                      className={inp}
                      placeholder="Score (8.5 CGPA)"
                      value={e.percentage}
                      onChange={(ev) =>
                        setEdu(i, "percentage", ev.target.value)
                      }
                    />
                  </div>
                ))}
              </div>

              {/* Experience */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className={label + " mb-0"}>Experience</label>
                  <button
                    onClick={addExp}
                    className="text-[#8FB339] text-xs font-bold hover:underline"
                  >
                    + Add
                  </button>
                </div>
                {form.experience.map((e, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 gap-2 mb-2 p-3 bg-gray-50 rounded-lg relative"
                  >
                    {form.experience.length > 1 && (
                      <button
                        onClick={() => removeExp(i)}
                        className="absolute top-2 right-2 text-red-400 text-xs"
                      >
                        ✕
                      </button>
                    )}
                    <input
                      className={inp}
                      placeholder="Company"
                      value={e.company}
                      onChange={(ev) => setExp(i, "company", ev.target.value)}
                    />
                    <input
                      className={inp}
                      placeholder="Role"
                      value={e.role}
                      onChange={(ev) => setExp(i, "role", ev.target.value)}
                    />
                    <input
                      className={inp}
                      placeholder="Duration (Jan 2023 - Dec 2023)"
                      value={e.duration}
                      onChange={(ev) => setExp(i, "duration", ev.target.value)}
                    />
                    <input
                      className={inp}
                      placeholder="Description"
                      value={e.description}
                      onChange={(ev) =>
                        setExp(i, "description", ev.target.value)
                      }
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-[#8FB339] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#7a9a30] transition disabled:opacity-60"
              >
                {loading ? "Processing..." : "Continue → Pay ₹50"}
              </button>
            </div>
          )}

          {/* ── STEP 2: Download ── */}
          {step === 2 && (
            <div className="text-center space-y-6 py-6">
              <div className="text-6xl">🎉</div>
              <div>
                <h3 className="font-bold text-gray-800 text-xl">
                  Resume is Ready!
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  Payment successful! Download Your Resume.
                </p>
              </div>
              <button
                onClick={handleDownload}
                className="bg-[#8FB339] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#7a9a30] transition shadow-lg"
              >
                ⬇️ Download Resume PDF
              </button>
              <button
                onClick={onClose}
                className="block mx-auto text-xs text-gray-400 hover:text-gray-600 hover:underline"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
