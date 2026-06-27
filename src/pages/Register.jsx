import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Mail, Lock, Loader2, Upload, Store, Bike, User as UserIcon } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import AuthLayout from '@/components/AuthLayout';
import GoogleIcon from '@/components/GoogleIcon';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ROLE_OPTIONS = [
  { value: 'customer', label: 'Customer', icon: UserIcon },
  { value: 'runner', label: 'Runner', icon: Bike },
  { value: 'vendor', label: 'Vendor', icon: Store },
];

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState('customer');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [profilePicturePreview, setProfilePicturePreview] = useState('');
  const [profilePictureName, setProfilePictureName] = useState('');
  const [governmentIdType, setGovernmentIdType] = useState('National ID');
  const [governmentIdNumber, setGovernmentIdNumber] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [campus, setCampus] = useState('');
  const [address, setAddress] = useState('');
  const [guarantor, setGuarantor] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessGovernmentId, setBusinessGovernmentId] = useState('');
  const [cacNumber, setCacNumber] = useState('');

  useEffect(() => () => {
    if (profilePicturePreview) URL.revokeObjectURL(profilePicturePreview);
  }, [profilePicturePreview]);

  const onProfilePictureChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const nextPreview = URL.createObjectURL(file);
    setProfilePictureName(file.name);
    setProfilePicturePreview((current) => {
      if (current) URL.revokeObjectURL(current);
      return nextPreview;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await authActions.register({
        role,
        email,
        password,
        full_name: role === 'vendor' ? ownerName || businessName : fullName || email.split('@')[0],
        phone,
        campus_id: campus,
        profile_picture: profilePicturePreview,
        profile_picture_name: profilePictureName,
        government_id_type: governmentIdType,
        government_id_number: governmentIdNumber,
        emergency_contact: emergencyContact,
        bank_name: bankName,
        account_number: accountNumber,
        account_name: accountName,
        address,
        guarantor,
        business_name: businessName,
        owner_name: ownerName,
        business_address: businessAddress,
        business_government_id: businessGovernmentId,
        cac_number: cacNumber,
      });
      setShowOtp(true);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError('');
    setLoading(true);
    try {
      await authActions.verifyOtp({ email, otpCode });
      navigate(role === 'vendor' ? '/vendor/orders' : role === 'runner' ? '/runner/home' : '/customer/home', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    try {
      await authActions.resendOtp(email);
      toast({
        title: 'Code sent',
        description: 'Check your email for the new code.',
      });
    } catch (err) {
      setError(err.message || 'Failed to resend code');
    }
  };

  const handleGoogle = () => {
    authActions.loginWithProvider('/customer/home');
  };

  if (showOtp) {
    return (
      <AuthLayout icon={Mail} title="Verify your email" subtitle={`We sent a code to ${email}`}>
        {error && (
          <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        <div className="mb-6 flex justify-center">
          <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode} autoFocus autoComplete="one-time-code">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button className="h-12 w-full font-medium" onClick={handleVerify} disabled={loading || otpCode.length < 6}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify'
          )}
        </Button>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Didn't receive the code?{' '}
          <button onClick={handleResend} className="font-medium text-primary hover:underline">
            Resend
          </button>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      icon={UserPlus}
      title="Create your account"
      subtitle="Sign up to get started"
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <Button variant="outline" className="mb-6 h-12 w-full text-sm font-medium" onClick={handleGoogle}>
        <GoogleIcon className="mr-2 h-5 w-5" />
        Continue with Google
      </Button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground">or</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="role">Account type</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger id="role" className="h-12">
              <SelectValue placeholder="Choose a role" />
            </SelectTrigger>
            <SelectContent>
              {ROLE_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <SelectItem key={option.value} value={option.value}>
                    <span className="flex items-center gap-2">
                      <Icon size={14} />
                      {option.label}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Profile picture</Label>
          <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border p-3">
            <Avatar className="h-14 w-14 border border-border/40">
              <AvatarImage src={profilePicturePreview} alt="Profile preview" />
              <AvatarFallback className="bg-muted text-muted-foreground">
                <Upload size={16} />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">Upload a profile picture</p>
              <p className="truncate text-xs text-muted-foreground">{profilePictureName || 'PNG, JPG, or WEBP'}</p>
            </div>
            <label className="inline-flex h-11 cursor-pointer items-center rounded-xl bg-muted px-4 text-sm font-semibold text-foreground">
              Choose file
              <input type="file" accept="image/*" className="hidden" onChange={onProfilePictureChange} />
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">{role === 'vendor' ? 'Business name' : 'Full name'}</Label>
          <Input
            id="fullName"
            autoComplete="name"
            autoFocus
            placeholder={role === 'vendor' ? 'Campus Store Ltd' : 'Your full name'}
            value={role === 'vendor' ? businessName : fullName}
            onChange={(e) => {
              if (role === 'vendor') setBusinessName(e.target.value);
              else setFullName(e.target.value);
            }}
            className="h-12"
            required
          />
        </div>

        {role === 'vendor' && (
          <div className="space-y-2">
            <Label htmlFor="ownerName">Owner name</Label>
            <Input id="ownerName" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="h-12" required />
          </div>
        )}

        {role === 'runner' && (
          <div className="space-y-2">
            <Label htmlFor="runnerFullName">Runner full name</Label>
            <Input id="runnerFullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-12" required />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" type="tel" autoComplete="tel" placeholder="+234 ..." value={phone} onChange={(e) => setPhone(e.target.value)} className="h-12" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-12 pl-10"
              required
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="campus">Campus</Label>
            <Input id="campus" value={campus} onChange={(e) => setCampus(e.target.value)} className="h-12" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="h-12" required={role !== 'customer'} />
          </div>
        </div>

        {(role === 'runner' || role === 'vendor') && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="governmentIdType">Government ID type</Label>
              <Input id="governmentIdType" value={governmentIdType} onChange={(e) => setGovernmentIdType(e.target.value)} className="h-12" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="governmentIdNumber">Government ID number</Label>
              <Input id="governmentIdNumber" value={governmentIdNumber} onChange={(e) => setGovernmentIdNumber(e.target.value)} className="h-12" required />
            </div>
          </div>
        )}

        {role === 'runner' && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency contact</Label>
                <Input id="emergencyContact" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} className="h-12" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guarantor">Guarantor</Label>
                <Input id="guarantor" value={guarantor} onChange={(e) => setGuarantor(e.target.value)} className="h-12" required />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank name</Label>
                <Input id="bankName" value={bankName} onChange={(e) => setBankName(e.target.value)} className="h-12" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account number</Label>
                <Input id="accountNumber" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="h-12" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountName">Account name</Label>
                <Input id="accountName" value={accountName} onChange={(e) => setAccountName(e.target.value)} className="h-12" required />
              </div>
            </div>
          </>
        )}

        {role === 'vendor' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="businessAddress">Business address</Label>
              <Input id="businessAddress" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} className="h-12" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="bankNameVendor">Bank name</Label>
                <Input id="bankNameVendor" value={bankName} onChange={(e) => setBankName(e.target.value)} className="h-12" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumberVendor">Account number</Label>
                <Input id="accountNumberVendor" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="h-12" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNameVendor">Account name</Label>
                <Input id="accountNameVendor" value={accountName} onChange={(e) => setAccountName(e.target.value)} className="h-12" required />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="businessGovernmentId">Government ID</Label>
                <Input id="businessGovernmentId" value={businessGovernmentId} onChange={(e) => setBusinessGovernmentId(e.target.value)} className="h-12" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cacNumber">CAC number (optional)</Label>
                <Input id="cacNumber" value={cacNumber} onChange={(e) => setCacNumber(e.target.value)} className="h-12" />
              </div>
            </div>
          </>
        )}

        <Button type="submit" className="h-12 w-full font-medium" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}
