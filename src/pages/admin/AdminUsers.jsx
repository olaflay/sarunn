import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, CheckCircle, XCircle, User, Store, Bike, Shield, BadgeCheck, Eye, AlertTriangle, Undo2 } from 'lucide-react';
import AdminShell from '@/components/AdminShell';
import Snackbar from '@/components/Snackbar';
import { EmptyState } from '@/components/PageStates';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { getAdminUsersByRole } from '@/lib/scaffoldData';

const TABS = ['Customers', 'Vendors', 'Runners'];

function buildState(roleKey) {
  return getAdminUsersByRole(roleKey).map((user) => ({ ...user }));
}

function VerificationBadge({ verified }) {
  const title = verified ? 'Identity verified' : 'Verification pending';
  const label = verified ? 'Verified' : 'Unverified';
  const className = verified
    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
    : 'border-slate-200 bg-slate-100 text-slate-500';

  return (
    <Badge className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${className}`} title={title}>
      <BadgeCheck size={11} />
      {label}
    </Badge>
  );
}

export default function AdminUsers() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab');
  const [tab, setTab] = useState(TABS.includes(initialTab) ? initialTab : 'Customers');
  const [search, setSearch] = useState('');
  const [vendors, setVendors] = useState(buildState('vendors'));
  const [runners, setRunners] = useState(buildState('runners'));
  const [customers, setCustomers] = useState(buildState('customers'));
  const [snack, setSnack] = useState('');
  const [suspendTarget, setSuspendTarget] = useState(null);
  const [suspensionReason, setSuspensionReason] = useState('');

  const currentUsers = useMemo(() => {
    const source = tab === 'Customers' ? customers : tab === 'Vendors' ? vendors : runners;
    return source.filter((item) => !search || (item.full_name || item.business_name).toLowerCase().includes(search.toLowerCase()));
  }, [tab, customers, vendors, runners, search]);

  const updateUser = (role, id, patch) => {
    const setter = role === 'Customers' ? setCustomers : role === 'Vendors' ? setVendors : setRunners;
    setter((prev) => prev.map((user) => (user.id === id ? { ...user, ...patch } : user)));
  };

  const userLabel = (user) => user.full_name || user.business_name;

  const openDetails = (role, user) => {
    navigate(`/admin/users/${role.toLowerCase()}/${user.id}`);
  };

  const approve = (role, id) => {
    updateUser(role, id, { approval_status: 'active', account_status: 'active', verified: true, verification_status: 'verified' });
    setSnack('Approval saved and verification badge updated.');
  };

  const reject = (role, id) => {
    updateUser(role, id, { approval_status: 'rejected', account_status: 'rejected' });
    setSnack('User rejected.');
  };

  const verify = (role, id) => {
    updateUser(role, id, { verified: true, verification_status: 'verified' });
    setSnack('Verification granted.');
  };

  const removeVerification = (role, id) => {
    updateUser(role, id, { verified: false, verification_status: 'pending' });
    setSnack('Verification removed.');
  };

  const suspend = () => {
    if (!suspendTarget || !suspensionReason.trim()) return;
    updateUser(suspendTarget.role, suspendTarget.id, {
      account_status: 'suspended',
      approval_status: 'suspended',
      suspension_reason: suspensionReason.trim(),
      suspended_at: new Date().toISOString(),
    });
    setSnack('User suspended with audit history saved.');
    setSuspendTarget(null);
    setSuspensionReason('');
  };

  const unsuspend = (role, id) => {
    updateUser(role, id, { account_status: 'active', approval_status: 'active', suspension_reason: '', suspended_at: '' });
    setSnack('Access restored immediately.');
  };

  const renderCard = (user, role) => {
    const avatarText = userLabel(user)
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2);
    const accountStatus = user.account_status || user.approval_status;
    const statusTone = accountStatus === 'active' ? 'bg-emerald-50 text-emerald-700' : accountStatus === 'suspended' ? 'bg-red-50 text-red-600' : accountStatus === 'rejected' ? 'bg-slate-100 text-slate-500' : 'bg-amber-50 text-amber-700';

    return (
      <div key={user.id} className="md3-card mb-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="h-12 w-12 border border-border/40">
              <AvatarImage src={user.profile_picture} alt={userLabel(user)} />
              <AvatarFallback className="bg-slate-100 text-sm font-semibold text-slate-700">{avatarText}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate font-semibold text-foreground text-sm">{userLabel(user)}</p>
                <VerificationBadge verified={user.verified} />
              </div>
              <p className="text-xs text-muted-foreground">{user.email} · {user.phone}</p>
              <p className="text-xs text-muted-foreground">{user.role} · Registered {user.registration_date}</p>
            </div>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusTone}`}>{accountStatus}</span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-muted/60 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Bank details</p>
            <p className="mt-2 text-sm font-semibold text-foreground">{user.bank_name}</p>
            <p className="text-sm text-muted-foreground">{user.account_name}</p>
            <p className="text-sm text-muted-foreground">{user.account_number}</p>
          </div>
          <div className="rounded-2xl bg-muted/60 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Campus and activity</p>
            <p className="mt-2 text-sm font-semibold text-foreground">{user.campus}</p>
            <p className="text-sm text-muted-foreground">{user.total_deliveries ?? 0} total deliveries/orders</p>
            <p className="text-sm text-muted-foreground">Last active {user.last_active}</p>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-border/40 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Documents submitted</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {user.documents_submitted.map((doc) => (
                <span key={doc} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">{doc}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border/40 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Approval notes</p>
            <p className="mt-2 text-sm text-foreground">{user.suspension_reason || 'No suspension history recorded yet.'}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" onClick={() => openDetails(role, user)} className="gap-2 rounded-xl">
            <Eye size={14} />
            View details
          </Button>
          {user.approval_status === 'pending' && (
            <>
              <Button type="button" onClick={() => approve(role, user.id)} className="gap-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">
                <CheckCircle size={14} />
                Approve
              </Button>
              <Button type="button" variant="outline" onClick={() => reject(role, user.id)} className="gap-2 rounded-xl">
                <XCircle size={14} />
                Reject
              </Button>
            </>
          )}
          {user.verified ? (
            <Button type="button" variant="outline" onClick={() => removeVerification(role, user.id)} className="gap-2 rounded-xl">
              <Undo2 size={14} />
              Remove verification
            </Button>
          ) : (
            <Button type="button" onClick={() => verify(role, user.id)} className="gap-2 rounded-xl bg-slate-950 text-white hover:bg-slate-800">
              <Shield size={14} />
              Verify
            </Button>
          )}
          {user.account_status === 'suspended' ? (
            <Button type="button" variant="outline" onClick={() => unsuspend(role, user.id)} className="gap-2 rounded-xl">
              <Undo2 size={14} />
              Unsuspend
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSuspendTarget({ role, id: user.id });
                setSuspensionReason(user.suspension_reason || '');
              }}
              className="gap-2 rounded-xl text-red-600"
            >
              <AlertTriangle size={14} />
              Suspend
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <AdminShell>
      <div className="bg-background min-h-full">
        <div className="bg-white border-b border-border/40 px-4 py-4 sticky top-0 z-10">
          <h1 className="font-heading font-bold text-foreground text-lg mb-3">User Management</h1>
          <div className="flex items-center gap-2 bg-muted rounded-2xl px-3 py-2.5 mb-3">
            <Search size={15} color="#94a3b8" />
            <input
              className="flex-1 bg-transparent outline-none text-sm placeholder-muted-foreground"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1 bg-muted rounded-xl p-1">
            {TABS.map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all"
                style={{ background: tab === item ? 'white' : 'transparent', color: tab === item ? '#1B2B45' : '#94a3b8', boxShadow: tab === item ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pt-4">
          {currentUsers.length === 0 ? (
            <EmptyState
              icon={User}
              title={`No ${tab.toLowerCase()} found`}
              subtitle="Try a different search or clear the filter."
            />
          ) : (
            currentUsers.map((user) => renderCard(user, tab))
          )}
        </div>
      </div>

      <Dialog open={Boolean(suspendTarget)} onOpenChange={(open) => {
        if (!open) {
          setSuspendTarget(null);
          setSuspensionReason('');
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend account</DialogTitle>
            <DialogDescription>
              Add a warning reason before suspending this {suspendTarget?.role?.toLowerCase()} account. Access should stop immediately after confirmation.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="suspension-reason">Suspension reason</label>
            <Textarea
              id="suspension-reason"
              value={suspensionReason}
              onChange={(e) => setSuspensionReason(e.target.value)}
              placeholder="Explain why the account is being suspended..."
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setSuspendTarget(null)}>
              Cancel
            </Button>
            <Button type="button" onClick={suspend} className="bg-red-600 text-white hover:bg-red-700">
              Suspend now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Snackbar message={snack} onClose={() => setSnack('')} />
    </AdminShell>
  );
}

