import Navbar from '@/components/Navbar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, updateUser } from '@/store/slices/authSlice';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, User as UserIcon, AtSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { apiGetProfile, apiUpdateProfile, apiUpdateProfileImage } from '@/api/profile';
import { z } from 'zod';

const profileSchema = z.object({
  first_name: z.string().min(1, 'Nama depan harus diisi'),
  last_name: z.string().min(1, 'Nama belakang harus diisi'),
});


const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);


  // Sync profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiGetProfile();
        dispatch(updateUser(res.data.data));
      } catch (error) {
        console.error('Failed to sync profile', error);
      }
    };
    fetchProfile();
  }, [dispatch]);

  // By removing the useEffect and using the 'key' prop in the JSX below,
  // React will automatically re-initialize the formData state whenever 
  // the user email changes (e.g. after initial login or profile fetch).
  
  const handleLogout = () => {

    dispatch(logout());
    localStorage.removeItem('auth');
    navigate('/login');
    toast.success('Berhasil logout');
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Revert if cancelling
      if (user) {
        setFormData({
          first_name: user.first_name,
          last_name: user.last_name,
        });
      }
      setErrors({});
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleUpdateProfile = async () => {
    const validation = profileSchema.safeParse(formData);
    
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const res = await apiUpdateProfile(formData);
      dispatch(updateUser(res.data.data));
      setIsEditing(false);
      setErrors({});
      toast.success('Profil berhasil diperbarui');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal memperbarui profil');
    }
  };


  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024) {
      toast.error('Ukuran file maksimal 100KB');
      return;
    }

    const fileData = new FormData();
    fileData.append('file', file);

    try {
      const res = await apiUpdateProfileImage(fileData);
      dispatch(updateUser(res.data.data));
      toast.success('Foto profil berhasil diperbarui');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal memperbarui foto profil');
    }
  };

  const profileImage = user?.profile_image && !user.profile_image.includes('null') 
    ? user.profile_image 
    : '/icon/profile.png';

  const fullName = user ? `${user.first_name} ${user.last_name}` : '';

  return (
    <div className="min-h-screen bg-white pb-20">
      <Navbar />

      <main key={user?.email} className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center">
        {/* Profile Header */}
        <div className="relative group cursor-pointer" onClick={handleImageClick}>
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-muted relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/icon/profile.png';
              }}
            />
          </div>
          <div className="absolute bottom-0 right-1 bg-white p-2 rounded-full border border-muted shadow-sm group-hover:bg-gray-50 transition-colors">
            <Pencil className="w-4 h-4 text-secondary" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleImageChange}
          />
        </div>

        <h1 className="text-3xl font-bold text-secondary mt-6 mb-12 text-center">
          {fullName}
        </h1>

        {/* Form */}
        <div className="w-full max-w-xl space-y-6 text-secondary">
          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary">Email</label>
            <Input
              value={user?.email || ''}
              readOnly
              disabled
              icon={<AtSign className="w-4 h-4" />}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary">Nama Depan</label>
            <Input
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              readOnly={!isEditing}
              disabled={!isEditing}
              placeholder="Nama Depan"
              icon={<UserIcon className="w-4 h-4" />}
              className={!isEditing ? 'bg-white' : 'focus:ring-primary'}
              error={!!errors.first_name}
            />
            {errors.first_name && <p className="text-xs text-destructive">{errors.first_name}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary">Nama Belakang</label>
            <Input
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              readOnly={!isEditing}
              disabled={!isEditing}
              placeholder="Nama Belakang"
              icon={<UserIcon className="w-4 h-4" />}
              className={!isEditing ? 'bg-white' : 'focus:ring-primary'}
              error={!!errors.last_name}
            />
            {errors.last_name && <p className="text-xs text-destructive">{errors.last_name}</p>}
          </div>


          <div className="pt-6 space-y-4">
            {!isEditing ? (
              <>
                <Button
                  variant="outline"
                  className="w-full h-12 text-primary border-primary hover:bg-primary/5 rounded-md"
                  onClick={handleEditToggle}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="default"
                  className="w-full h-12 rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="default"
                  className="w-full h-12 rounded-md"
                  onClick={handleUpdateProfile}
                >
                  Simpan
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 text-primary border-primary hover:bg-primary/5 rounded-md"
                  onClick={handleEditToggle}
                >
                  Batalkan
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
