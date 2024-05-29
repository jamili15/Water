import EmailVerification from "@/components/form/EmailVerification";
import MasterLayout from "@/components/layouts/MasterLayout";

const lguName: { [key: string]: string } = {
  bohol_tagbilaran: "Tagbilaran City",
  bohol_danao: "Bohol Danao",

  // Add more id to title mappings as needed
};

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const title = lguName[id] || "Unknown City";
  return (
    <MasterLayout lgucaption={title}>
      <EmailVerification moduleTitle=" waterworks online billing and payment" />
    </MasterLayout>
  );
}
