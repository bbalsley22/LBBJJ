import { useNavigate } from "react-router-dom";
import { MainNav } from "@/components/NavigationMenu";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNav />
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <h1 className="text-5xl font-bold mb-6 text-[#ea384c]">Lostboys – Show up, No Excuses.</h1>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#ea384c]">Welcome to Lostboys</h2>
          <p className="text-lg mb-4">
            We are not just a gym. We are not a franchise, a fitness trend, or a belt factory. Lostboys is a fight club built by the most dedicated, disciplined, and dangerous fighters in Humboldt County. We don't bow to tradition, we don't hand out easy wins, and we don't sell a watered-down version of Jiu Jitsu to the masses.
          </p>
          <p className="text-lg mb-4">
            We fight. We endure. We sharpen each other until only the strongest remain.
          </p>
          <p className="text-lg">
            Lostboys started as an underground crew of fighters who didn't care about rank or recognition—only skill, grit, and heart. We trained hard, we fought harder, and through sheer force of will, we became the best. Today, we still operate by those same principles: <span className="font-bold">If you don't love this, you don't belong here.</span>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#ea384c]">Who We Are</h2>
          <p className="text-lg mb-4">
            We are a brotherhood of fighters, forged in the crucible of combat. Our ranks include MMA fighters, law enforcement officers, military veterans, and everyday warriors who refuse to accept mediocrity.
          </p>
          <p className="text-lg">
            Our instructors aren't just teachers—they're battle-tested fighters with real competition experience. They've been in the trenches, faced the pressure, and emerged victorious. When they teach, they're not reciting from a manual—they're sharing hard-won knowledge from actual fights.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#ea384c]">What We Stand For</h2>
          <p className="text-lg mb-4">
            Strength. Discipline. Relentless pursuit of excellence. We believe in earning every inch of progress, in pushing past comfort zones, and in the transformative power of hard work.
          </p>
          <p className="text-lg">
            We don't promise easy wins or quick promotions. What we promise is the opportunity to test yourself against some of the toughest fighters in the area, to learn from those who have been in real fights, and to become part of a brotherhood that demands and rewards excellence.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#ea384c]">Why Train at Lostboys?</h2>
          <p className="text-lg">
            There are plenty of places to train Jiu Jitsu, but none like this. The difference? <span className="font-bold">Culture.</span><br />
            We don't just train together—we fight, we push each other, we bleed together. Every person on these mats is family, bonded through sweat, struggle, and sacrifice. You don't join Lostboys because you want a hobby. You join because you have something to prove—to yourself, to your team, and to the fight itself.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#ea384c]">The Next Generation of Killers</h2>
          <p className="text-lg mb-4">
            Our youth program is one of the strongest in Humboldt County. We build young fighters from the ground up—not just teaching techniques, but instilling the discipline, resilience, and toughness required to dominate in competition and in life.
          </p>
          <p className="text-lg mb-4">
            Everyone that trains at Lostboys learns that <span className="font-bold">strength is earned, not given</span>. That <span className="font-bold">effort is everything</span>. And that <span className="font-bold">there are no victims, only warriors in the making.</span>
          </p>
          <p className="text-lg">
            If you want your child to learn self-respect, discipline, and the ability to defend themselves, there's no better place.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4 text-[#ea384c]">Train With Us—If You Can</h2>
          <p className="text-lg mb-4">
            If you're looking for a gentle introduction to martial arts or a place to casually train, look elsewhere. But if you're ready to commit yourself to the pursuit of martial excellence, if you're willing to be humbled, tested, and forged into something stronger—then maybe, just maybe, you belong at Lostboys.
          </p>
          <p className="text-lg">
            We're not for everyone. And that's exactly how we like it.
          </p>
        </section>

        <p className="text-2xl font-bold text-[#ea384c]">Lostboys: Where Weakness Dies.</p>
      </div>
    </div>
  );
}