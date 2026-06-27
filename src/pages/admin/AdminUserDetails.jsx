import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, Banknote, CalendarDays, CreditCard, MapPin, Phone, Shield, Users, Clock3 } from 'lucide-react';
import AdminShell from '@/components/AdminShell';
import Snackbar from '@/components/Snackbar';
import { EmptyState } from '@/components/PageStates';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAdminUserById } from '@/lib/scaffoldData';

function VerificationBadge({ verified }) {
  return (
    <Badge className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${verified ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-100 text-slate-500'}`} title={verified ? 'Identity verified' : 'Verification pending'}>
      <BadgeCheck size={11} className="mr-1" />
      {verified ? 'Verified' : 'Unverified'}
    </Badge>
  );
}

export default function AdminUserDetails() {
  const navigate = useNavigate();
  const { role, id } = useParams();
  const roleKey = role === 'vendor' ? 'vendors' : role === 'runner' ? 'runners' : 'customers';
  const user = getAdminUserById(roleKey, id);

  if (!user) {
    return (
      <AdminShell>
        <div className="p-4">
          <EmptyState title="User not found" subtitle="The requested record is no longer available in the scaffold." actionLabel="Back to users" onAction={() => navigate('/admin/users')} />
        </div>
      </AdminShell>
    );
  }

  const name = user.full_name || user.business_name;
  const avatarText = name.split(' ').map((part) => part[0]).join('').slice(0, 2);

  return (
    <AdminShell>
      <div className="min-h-full bg-background">
        <div className="navy-gradient px-4 pt-6 pb-10 text-white">
          <button type="button" onClick={() => navigate('/admin/users')} className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80">
            <ArrowLeft size={16} />
            Back to users
          </button>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-16 w-16 border-2 border-white/20">
                <AvatarImage src={user.profile_picture} alt={name} />
                <AvatarFallback className="bg-white/15 text-lg font-bold text-white">{avatarText}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-white/60">User details</p>
                <h1 className="font-heading text-2xl font-black">{name}</h1>
                <p className="text-sm text-white/70">{user.role} · {user.campus}</p>
              </div>
            </div>
            <VerificationBadge verified={user.verified} />
          </div>
        </div>

        <div className="-mt-4 px-4 pb-6 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border/40 bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"><Phone size={14} /> Contact</div>
              <p className="mt-3 text-sm font-semibold text-foreground">{user.phone}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="rounded-2xl border border-border/40 bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"><Banknote size={14} /> Bank</div>
              <p className="mt-3 text-sm font-semibold text-foreground">{user.bank_name}</p>
              <p className="text-sm text-muted-foreground">{user.account_name}</p>
              <p className="text-sm text-muted-foreground">{user.account_number}</p>
            </div>
            <div className="rounded-2xl border border-border/40 bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"><MapPin size={14} /> Campus</div>
              <p className="mt-3 text-sm font-semibold text-foreground">{user.campus}</p>
              <p className="text-sm text-muted-foreground">{user.assigned_zones ? user.assigned_zones.join(', ') : 'No assigned zones'}</p>
            </div>
            <div className="rounded-2xl border border-border/40 bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"><Users size={14} /> Activity</div>
              <p className="mt-3 text-sm font-semibold text-foreground">{user.total_deliveries ?? user.total_orders ?? 0} total</p>
              <p className="text-sm text-muted-foreground">Last active {user.last_active}</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            <section className="space-y-4">
              <div className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Shield size={16} className="text-primary" />
                  Approval snapshot
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-muted/60 p-3">
                    <p className="text-xs text-muted-foreground">Registration date</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{user.registration_date}</p>
                  </div>
                  <div className="rounded-2xl bg-muted/60 p-3">
                    <p className="text-xs text-muted-foreground">Account status</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{user.account_status}</p>
                  </div>
                  <div className="rounded-2xl bg-muted/60 p-3">
                    <p className="text-xs text-muted-foreground">Verification</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{user.verification_status}</p>
                  </div>
                  <div className="rounded-2xl bg-muted/60 p-3">
                    <p className="text-xs text-muted-foreground">Documents submitted</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{user.documents_submitted.length}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CalendarDays size={16} className="text-primary" />
                  Submitted documents
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {user.documents_submitted.map((doc) => (
                    <span key={doc} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">{doc}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Clock3 size={16} className="text-primary" />
                  Notes
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {user.suspension_reason || 'This scaffold shows the full approval context before admin action is taken.'}
                </p>
              </div>
            </section>

            <aside className="space-y-4">
              <div className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm">
                <p className="text-sm font-semibold text-foreground">Quick actions</p>
                <div className="mt-3 flex flex-col gap-2">
                  <Button type="button" onClick={() => navigate('/admin/users')} className="justify-start gap-2 rounded-xl">
                    Return to list
                  </Button>
                  <Button type="button" variant="outline" className="justify-start gap-2 rounded-xl">
                    Toggle verification
                  </Button>
                  <Button type="button" variant="outline" className="justify-start gap-2 rounded-xl text-red-600">
                    Suspend account
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <Snackbar message="" onClose={() => {}} />
    </AdminShell>
  );
}

