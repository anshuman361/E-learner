import AIChat from "@/app/components/AIChat";
import StudentNavbar from "@/app/components/navbar/StudentNavbar";

export default function Page() {
  return (
    <div className="max-w-1xl mx-auto p-10">
      <StudentNavbar />
      <AIChat />
    </div>
  );
}
