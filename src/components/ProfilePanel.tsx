import React from 'react'
import { motion } from 'framer-motion'
import { User, MapPin, Calendar, Edit, Crown, Star } from 'lucide-react'

const ProfilePanel: React.FC = () => {
  const userProfile = {
    name: 'Ahmet Yılmaz',
    location: 'Kadıköy, İstanbul',
    bio: 'Bilgisayar Mühendisliği öğrencisi. React ve Node.js konularında deneyimli. Part-time iş arıyor.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinDate: 'Mart 2024',
    isPremium: true,
    rating: 4.8,
    completedJobs: 12,
    skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB'],
    interests: ['Yazılım Geliştirme', 'Web Tasarımı', 'Freelance İşler']
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="fixed right-4 top-20 w-80 bg-dark-200 border border-dark-300 rounded-lg shadow-lg z-40"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Profil</h3>
          <button className="text-dark-500 hover:text-white transition-colors">
            <Edit size={16} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-20 h-20 rounded-full border-4 border-primary-500"
            />
                              {userProfile.isPremium && (
              <div className="absolute -top-2 -right-2 bg-primary-500 rounded-full p-1">
                <Crown size={12} className="text-white" />
              </div>
            )}
          </div>
          
          <h4 className="text-xl font-semibold text-white mb-1">{userProfile.name}</h4>
          
          <div className="flex items-center justify-center space-x-2 text-dark-500 mb-2">
            <MapPin size={14} />
            <span className="text-sm">{userProfile.location}</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-dark-500 mb-3">
            <Calendar size={14} />
            <span className="text-sm">Üye: {userProfile.joinDate}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(userProfile.rating) ? 'text-yellow-400 fill-current' : 'text-dark-500'}
                />
              ))}
            </div>
            <span className="text-sm text-dark-500">({userProfile.rating})</span>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h5 className="text-sm font-medium text-white mb-2">Hakkımda</h5>
          <p className="text-sm text-dark-500 leading-relaxed">
            {userProfile.bio}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-500">{userProfile.completedJobs}</div>
            <div className="text-xs text-dark-500">Tamamlanan İş</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{userProfile.rating}</div>
            <div className="text-xs text-dark-500">Puan</div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h5 className="text-sm font-medium text-white mb-3">Yetenekler</h5>
          <div className="flex flex-wrap gap-2">
            {userProfile.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-primary-500/20 text-primary-400 text-xs px-2 py-1 rounded-full border border-primary-500/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="mb-6">
          <h5 className="text-sm font-medium text-white mb-3">İlgi Alanları</h5>
          <div className="flex flex-wrap gap-2">
            {userProfile.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-dark-300 text-dark-600 text-xs px-2 py-1 rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm py-2 px-4 rounded-lg transition-colors">
            Profili Düzenle
          </button>
          <button className="w-full bg-dark-300 hover:bg-dark-400 text-white text-sm py-2 px-4 rounded-lg transition-colors">
            Ayarlar
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProfilePanel 