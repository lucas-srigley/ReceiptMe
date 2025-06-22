import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User } from 'lucide-react';

const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
const googleId = loggedInUser?.googleId;

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    ethnicity: '',
    maritalStatus: '',
    children: '',
    income: '',
    location: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
      const googleId = loggedInUser?.googleId;
      if (!googleId) return;

      try {
        const res = await fetch(`http://localhost:3001/api/users/${googleId}`);
        const data = await res.json();
        setProfile({
          name: `${data.firstName} ${data.lastName}` || '',
          email: data.email || '',
          age: data.age || '',
          gender: data.gender || '',
          ethnicity: data.ethnicity || '',
          maritalStatus: data.maritalStatus || '',
          children: data.children?.toString() || '',
          income: data.income?.toString() || '',
          location: data.location || ''
        });
      } catch (err) {
        console.error("Failed to load user profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
  const googleId = loggedInUser?.googleId;

  if (!googleId) {
    console.error("User not logged in");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3001/api/users/${googleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    if (!response.ok) throw new Error("Failed to save profile");
    const updated = await response.json();

    console.log("Profile saved:", updated);
    alert("Profile updated successfully!");
  } catch (error) {
    console.error("Error saving profile:", error);
    alert("Failed to save profile");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Profile</h1>
          <p className="text-gray-600">Update your demographic information for better spending comparisons</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Profile Picture Section */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <Input
                value={profile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <Input
                type="number"
                value={profile.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ethnicity</label>
              <select
                value={profile.ethnicity}
                onChange={(e) => handleInputChange('ethnicity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="hispanic">Hispanic/Latino</option>
                <option value="white">White</option>
                <option value="black">Black/African American</option>
                <option value="asian">Asian</option>
                <option value="native">Native American</option>
                <option value="pacific">Pacific Islander</option>
                <option value="mixed">Mixed Race</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
              <select
                value={profile.maritalStatus}
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
                <option value="partnership">Domestic Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Children</label>
              <Input
                type="number"
                value={profile.children}
                onChange={(e) => handleInputChange('children', e.target.value)}
                className="w-full"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income ($ CAD)</label>
              <Input
                type="number"
                value={profile.income}
                onChange={(e) => handleInputChange('income', e.target.value)}
                className="w-full"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location (City, Province)</label>
              <Input
                value={profile.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <Button 
              onClick={handleSave}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-2"
            >
              Save Profile
            </Button>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Why we collect this information</h3>
            <p className="text-sm text-blue-800">
              Your demographic information helps us provide more accurate spending comparisons with people in similar situations. 
              This data is encrypted and never shared with third parties. You can update or delete this information at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;