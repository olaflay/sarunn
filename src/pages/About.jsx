import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Store, Bike } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import PublicFooter from '@/components/PublicFooter';

export default function About() {
  return (
    <RunnaShell>
      <div className="runna-screen bg-background">
        <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-border/40 sticky top-0 z-30">
          <Link to="/customer/home" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-heading font-bold text-foreground text-base">About RUNNA</h1>
        </div>

        <div className="px-5 py-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl navy-gradient flex items-center justify-center">
              <span className="text-white font-heading font-extrabold text-lg">R</span>
            </div>
            <div>
              <p className="font-heading font-extrabold text-xl" style={{ color: '#1B2B45' }}>RUNNA</p>
              <p className="text-muted-foreground text-xs">Campus delivery, made easy</p>
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-sm text-foreground leading-relaxed">
              RUNNA is a campus-first delivery super-app built specifically for Nigerian university communities.
              It connects students with campus vendors and local couriers, enabling instant access to meals,
              parcels, and everyday errands without ever leaving campus grounds.
            </p>
            <p className="text-sm text-foreground leading-relaxed mt-3">
              The platform serves three core audiences: students who need fast, affordable delivery of food and
              packages; campus vendors — from kitchen operators to small chops sellers — who want a simple way
              to receive and fulfil orders; and student-runners who earn income by picking up and delivering
              orders within their campus community.
            </p>
            <p className="text-sm text-foreground leading-relaxed mt-3">
              RUNNA operates on a three-level location system — Campus, Zone, and Landmark — ensuring every
              delivery is precisely routed and fairly priced. The app currently supports LASU Epe and LASUED Epe
              campuses, with plans to expand to more institutions across Nigeria.
            </p>
            <p className="text-sm text-foreground leading-relaxed mt-3">
              Built by a team passionate about solving last-mile logistics for African universities, RUNNA
              leverages modern mobile technology to make campus life easier, faster, and more connected.
              Whether it's a plate of jollof rice between lectures or sending a parcel across campus, RUNNA
              gets it there — fast, fresh, and reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2">
            <div className="rounded-2xl bg-white border border-border/50 p-4">
              <h2 className="font-heading font-bold text-foreground text-sm mb-2">What We Do</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  Food delivery from campus vendors and kitchens
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  Same-campus parcel and package delivery
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  Errand services (shopping, pickups, queuing)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  Coming soon: laundry and printing services
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white border border-border/50 p-4">
              <h2 className="font-heading font-bold text-foreground text-sm mb-2">Who We Serve</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#E8F5E9' }}>
                    <GraduationCap size={18} color="#2E7D32" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Students</p>
                    <p className="text-xs text-muted-foreground">Fast, affordable campus delivery</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#FFF3E0' }}>
                    <Store size={18} color="#E65100" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Vendors</p>
                    <p className="text-xs text-muted-foreground">Grow your campus business</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#EDF3FF' }}>
                    <Bike size={18} color="#1565C0" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Runners</p>
                    <p className="text-xs text-muted-foreground">Earn on your schedule</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PublicFooter />
      </div>
    </RunnaShell>
  );
}
