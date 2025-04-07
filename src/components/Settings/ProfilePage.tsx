import React, { useState } from 'react';
import { Camera, Edit2, User, Mail, Smartphone } from 'lucide-react';

interface ProfileFormData {
  username: string;
  email: string;
  phone: string;
}

export const ProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileFormData>({
    username: 'allenbnvtra',
    email: 'allen@gg.com',
    phone: '+1 (555) 123-4567',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="mx-auto min-h-[85vh] overflow-hidden">
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 h-32 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <img
              src="/api/placeholder/120/120"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
              <Camera size={16} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <User size={16} className="mr-2 text-gray-500" />
            Username
          </label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          ) : (
            <p className="text-gray-800 font-semibold">
              {profileData.username}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Mail size={16} className="mr-2 text-gray-500" />
            Email
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          ) : (
            <p className="text-gray-800 font-semibold">{profileData.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Smartphone size={16} className="mr-2 text-gray-500" />
            Phone
          </label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          ) : (
            <p className="text-gray-800 font-semibold">{profileData.phone}</p>
          )}
        </div>
        <div className="flex justify-end space-x-4 pb-4">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
            >
              <Edit2 size={16} className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
