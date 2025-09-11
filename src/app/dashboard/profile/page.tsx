'use client';

import { useEffect, useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import axiosInstance from '@/utils/axiosInstance';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import ProtectedRoute from '@/lib/ProtectedRoute';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
}

export default function ProfilePage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {

    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser: User = JSON.parse(userData);
        setUser(parsedUser);
        console.log('oay', parsedUser)
        // Ensure we always have string values, never undefined
        setFirstName(parsedUser.firstName || '');
        setLastName(parsedUser.lastName || '');
        setEmail(parsedUser.email || '');
        if (parsedUser.profileImage) {
          setProfileImage(parsedUser.profileImage);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Set safe defaults if parsing fails
        setFirstName('');
        setLastName('');
        setEmail('');
      }
    }
  }, []);

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      toast.error('Please fill in both fields');
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.patch('/auth/update-password', {
        currentPassword,
        newPassword
      });

      toast.success('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };


 const handleProfileUpdate = async () => {
  try {
    setLoading(true);
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);

    if (fileInputRef.current?.files?.[0]) {
      formData.append('profileImage', fileInputRef.current.files[0]);
    }

   const { data } = await axiosInstance.patch('/auth/update-profile', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

    // Use `data.user` instead of `data`
  const updatedUser = {
  ...JSON.parse(localStorage.getItem('user') || '{}'),
  ...data.user
};

   localStorage.setItem('user', JSON.stringify(updatedUser));
setUser(updatedUser);

    toast.success('Profile updated successfully!');
    setIsEditing(false);
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to update profile');
  } finally {
    setLoading(false);
  }
};


  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error('Please enter your password');
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.delete('/users/delete-account', {
        data: { password: deletePassword }
      });

      // Clear local storage and redirect
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } catch (err: any) {
      toast.error(err.response?.message || 'Failed to delete account');
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setDeletePassword('');
    }
  };

  return (
     <ProtectedRoute requireSubscription subscriptionRedirect="/dashboard/subscription">
         <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName || ''} // Ensure always a string
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName || ''} // Ensure always a string
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="w-full">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email || ''} // Ensure always a string
                disabled
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    // Reset to original values with fallbacks
                    if (user) {
                      setFirstName(user.firstName || '');
                      setLastName(user.lastName || '');
                      setProfileImage(user.profileImage || null);
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleProfileUpdate} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Password Update */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <Button
            className="mt-4"
            variant="outline"
            onClick={handlePasswordChange}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Change Password'}
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Danger Zone */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            Deleting your account is irreversible. All your data will be lost.
          </p>
          <Button 
            variant="destructive"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>

      {/* Delete Account Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              This action cannot be undone. All your data will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="deletePassword">Enter your password to confirm:</Label>
            <Input
              id="deletePassword"
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Your password"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={loading || !deletePassword}
            >
              {loading ? 'Deleting...' : 'Delete Account'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
     </ProtectedRoute>
   
  );
}