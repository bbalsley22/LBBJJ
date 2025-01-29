import { MembershipCard } from "./MembershipCard";

interface MembershipSectionProps {
  onSubscribe: (priceId: string) => Promise<void>;
}

export const MembershipSection = ({ onSubscribe }: MembershipSectionProps) => {
  const memberships = [
    {
      title: "Kids Membership",
      price: "$100/month",
      benefits: [
        "All Kids Classes",
        "Structured Learning Environment",
        "Character Development",
        "Physical Fitness",
      ],
      priceId: "price_1QlxjsAL0tqqmUelD92HJtfa",
    },
    {
      title: "Adult Membership",
      price: "$120/month",
      benefits: [
        "Unlimited Classes",
        "Open Mat Access",
        "Competition Training",
        "All Skill Levels Welcome",
      ],
      priceId: "price_1QlxklAL0tqqmUelPML6Oqwj",
    },
  ];

  return (
    <section className="py-20 bg-[#222222]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#ea384c]">MEMBERSHIP OPTIONS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {memberships.map((membership) => (
            <MembershipCard
              key={membership.title}
              {...membership}
              onSubscribe={onSubscribe}
            />
          ))}
        </div>
      </div>
    </section>
  );
};