import React from 'react'
import ProfileTabs from '@/components/ui/Profile/ProfileTabs'

function Profile() {
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-right">الملف الشخصي</h1>
      <ProfileTabs />
    </div>
  )
}

export default Profile
