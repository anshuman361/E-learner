import { BookOpen, Users, Award } from "lucide-react";

const features = [
  {
    title: "Diverse Content",
    desc: "Access thousands of courses in technology, business, design, and more.",
    icon: BookOpen,
  },

  {
    title: "Expert Instructors",
    desc: "Learn from industry experts passionate about teaching and sharing knowledge.",
    icon: Users,
  },

  {
    title: "Certification",
    desc: "Earn certificates upon completion to showcase your skills.",
    icon: Award,
  },
];

export default function WhyChoose() {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-bold">Why Choose E-LearnMarket?</h2>

        <p className="text-gray-500 mt-4 text-lg">
          We provide the best tools and resources for effective learning.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-xl transition"
              >
                <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-500 flex items-center justify-center mb-6 mx-auto">
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-bold">{item.title}</h3>

                <p className="text-gray-500 mt-4 leading-7">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
