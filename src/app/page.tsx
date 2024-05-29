import Link from "next/link";

export default function PostList() {
  const lgus = [
    { id: "bohol_tagbilaran", title: "Bohol Tagbilaran Water Billing" },
    { id: "cebu", title: "Cebu Water Billing" },
    { id: "danao", title: "Danao Water Billing" },
    { id: "leyte", title: "Leyte Water Billing" },
  ];
  return (
    <div className="flex flex-col gap-10">
      {lgus.map((lgu: any) => (
        <div key={lgu.id}>
          <Link
            href={`/partners/${lgu.id}/water/billing`}
            className="bg-gray-300 p-3 rounded"
          >
            {lgu.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
