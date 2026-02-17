import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageLayout from '../../components/layout/PageLayout';
import RequireLogin from '../../components/auth/RequireLogin';
import FrameShapePicker from '../../components/profile/FrameShapePicker';
import { useCallerUserProfile } from '../../hooks/profile/useCallerUserProfile';
import { useSaveCallerUserProfile } from '../../hooks/profile/useSaveCallerUserProfile';
import { useUpdateProfilePicture, useUpdatePrescriptionPicture } from '../../hooks/profile/useProfilePictures';
import { Gender, FrameShape, ExternalBlob } from '../../backend';
import { toast } from 'sonner';
import { Loader2, Upload, X, User, FileText } from 'lucide-react';

export default function MyProfilePage() {
  const { data: profile, isLoading: profileLoading, isFetched } = useCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const updateProfilePic = useUpdateProfilePicture();
  const updatePrescriptionPic = useUpdatePrescriptionPicture();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.other);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [framePreferences, setFramePreferences] = useState<FrameShape[]>([]);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const [prescriptionPicPreview, setPrescriptionPicPreview] = useState<string | null>(null);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [prescriptionPicFile, setPrescriptionPicFile] = useState<File | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setAge(profile.age ? profile.age.toString() : '');
      setGender(profile.gender || Gender.other);
      setAddress(profile.address || '');
      setPhone(profile.phone || '');
      setEmail(profile.email || '');
      setFramePreferences(profile.framePreferences || []);
      
      if (profile.profilePicture) {
        setProfilePicPreview(profile.profilePicture.getDirectURL());
      }
      if (profile.prescriptionPicture) {
        setPrescriptionPicPreview(profile.prescriptionPicture.getDirectURL());
      }
    }
  }, [profile]);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrescriptionPicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPrescriptionPicFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrescriptionPicPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePic = () => {
    setProfilePicFile(null);
    setProfilePicPreview(null);
  };

  const removePrescriptionPic = () => {
    setPrescriptionPicFile(null);
    setPrescriptionPicPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Upload pictures if changed
      if (profilePicFile) {
        const arrayBuffer = await profilePicFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const blob = ExternalBlob.fromBytes(uint8Array);
        await updateProfilePic.mutateAsync(blob);
      }

      if (prescriptionPicFile) {
        const arrayBuffer = await prescriptionPicFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const blob = ExternalBlob.fromBytes(uint8Array);
        await updatePrescriptionPic.mutateAsync(blob);
      }

      // Save profile data
      await saveProfile.mutateAsync({
        name,
        age: age ? BigInt(age) : BigInt(0),
        gender,
        address,
        phone,
        email,
        framePreferences: framePreferences.length > 0 ? framePreferences : undefined,
        profilePicture: profile?.profilePicture,
        prescriptionPicture: profile?.prescriptionPicture,
      });

      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  if (profileLoading) {
    return (
      <RequireLogin message="Please log in to access your profile">
        <PageLayout>
          <div className="flex justify-center items-center min-h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </PageLayout>
      </RequireLogin>
    );
  }

  return (
    <RequireLogin message="Please log in to access your profile">
      <PageLayout title="My Profile" description="Manage your personal information and preferences">
        <form onSubmit={handleSubmit}>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>All fields are optional</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Your age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      min="0"
                      max="150"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={(value) => setGender(value as Gender)}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Gender.male}>Male</SelectItem>
                      <SelectItem value={Gender.female}>Female</SelectItem>
                      <SelectItem value={Gender.other}>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Your full address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pictures</CardTitle>
                <CardDescription>Upload your profile and prescription pictures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Profile Picture</Label>
                  {profilePicPreview ? (
                    <div className="relative inline-block">
                      <img
                        src={profilePicPreview}
                        alt="Profile"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={removeProfilePic}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/30">
                        <User className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div>
                        <Label htmlFor="profilePic" className="cursor-pointer">
                          <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                            <Upload className="h-4 w-4" />
                            <span>Upload Picture</span>
                          </div>
                        </Label>
                        <Input
                          id="profilePic"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleProfilePicChange}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label>Prescription Picture</Label>
                  {prescriptionPicPreview ? (
                    <div className="relative inline-block">
                      <img
                        src={prescriptionPicPreview}
                        alt="Prescription"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={removePrescriptionPic}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/30">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div>
                        <Label htmlFor="prescriptionPic" className="cursor-pointer">
                          <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                            <Upload className="h-4 w-4" />
                            <span>Upload Picture</span>
                          </div>
                        </Label>
                        <Input
                          id="prescriptionPic"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePrescriptionPicChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frame Preferences</CardTitle>
                <CardDescription>Select your preferred frame shapes (multiple selections allowed)</CardDescription>
              </CardHeader>
              <CardContent>
                <FrameShapePicker
                  selected={framePreferences}
                  onChange={setFramePreferences}
                />
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={saveProfile.isPending || updateProfilePic.isPending || updatePrescriptionPic.isPending}
                className="flex-1"
              >
                {(saveProfile.isPending || updateProfilePic.isPending || updatePrescriptionPic.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Profile
              </Button>
            </div>
          </div>
        </form>
      </PageLayout>
    </RequireLogin>
  );
}
