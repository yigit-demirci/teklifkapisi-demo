import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, Moon, Sun, MapPin, Calendar, Crown, Star, Edit, Settings, LogOut, Building, Users, Globe, Award, X, Bell } from 'lucide-react'

const Header: React.FC = () => {
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showCompanyModal, setShowCompanyModal] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)

  // Initialize dark mode on component mount
  useEffect(() => {
    document.body.classList.add('dark')
  }, [])

  // Dark mode toggle function
  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    
    // Apply dark mode to body
    if (newMode) {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    }
  }

  const userProfile = {
    name: 'İsmet Yiğit DEMİRCİ',
    location: 'Kadıköy, İstanbul',
    bio: '20 yaşında Polimer Malzeme Mühendisliği öğrencisi. Yenilenebilir enerji alanında çeşitli projelere sahip.',
    avatar: '/profile-photo.jpg',
    joinDate: 'Mart 2024',
                    isPremium: true,
    rating: 4.8,
    completedJobs: 12,
    skills: ['Lider ruhlu', 'Yeniliğe açık', 'SolidWorks', 'AutoCAD', 'TeklifKapısı platformunun sahibi'],
    interests: ['Sustainable energy', 'Web tasarımı', 'Proje yapmak']
  }

  const companyProfile = {
    name: 'Demirci Yenilenebilir Enerji',
    sector: 'Yenilenebilir Enerji',
    location: 'Maslak, İstanbul',
    description: 'Türkiye\'nin ve Avrupa\'nın önde gelen yenilenebilir enerji şirketlerinden biri. Yenilenebilir enerji ile ilgili projeleri hayata geçirmede uzman olan bir şirket.',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
    founded: '2018',
    isVerified: true,
    rating: 4.9,
    totalEmployees: 150,
    completedProjects: 89,
    specialties: ['%100 geri dönüştürülebilen malzemelerden bilgisayar, telefon ve otomotiv parçaları üretimi', 'Milli muharip savaş uçakları için kompozit ve nanokompozit malzemelerden oluşan parça üretimi'],
    awards: ['🏆 Fortune Global 500', '🏆 Fast Company – World\'s Most', '🏆 Great Place to Work – World\'s Best Workplaces Companies']
  }

  return (
    <>
      <header className="bg-dark-200 border-b border-dark-300 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            TeklifKapısı
          </Link>
          
          <div className="flex items-center space-x-4">
            {/* Profile Modal Button */}
            <button 
              onClick={() => setShowProfileModal(true)}
              className="flex items-center space-x-2 text-white hover:text-primary-400 transition-colors"
            >
              <User size={20} />
              <span>Profil</span>
            </button>

            {/* Company Modal Button */}
            <button 
              onClick={() => setShowCompanyModal(true)}
              className="flex items-center space-x-2 text-white hover:text-primary-400 transition-colors"
            >
              <Building size={20} />
              <span>Şirket</span>
            </button>

            {/* Notifications Button */}
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex items-center space-x-2 text-white hover:text-primary-400 transition-colors relative"
              title="Bildirimler"
            >
              <Bell size={20} />
              {notificationCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount}
                </div>
              )}
              <span>Bildirimler</span>
            </button>
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="flex items-center space-x-2 text-white hover:text-primary-400 transition-colors"
              title={isDarkMode ? "Açık tema" : "Koyu tema"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDarkMode ? "Açık Tema" : "Koyu Tema"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-200 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Kişisel Profil</h2>
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className="text-dark-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Profile Info */}
                <div className="space-y-6">
                  {/* Profile Header */}
                  <div className="text-center">
                    <div className="relative inline-block mb-6">
                      <div className="w-32 h-32 rounded-full border-4 border-primary-500 bg-primary-600 flex items-center justify-center">
                        <div className="text-white text-4xl font-bold">
                          👨
                        </div>
                      </div>
                                                        {userProfile.isPremium && (
                        <div className="absolute -top-2 -right-2 bg-primary-500 rounded-full p-2">
                          <Crown size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{userProfile.name}</h3>
                    
                    <div className="flex items-center justify-center space-x-4 text-dark-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{userProfile.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>Üye: {userProfile.joinDate}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-center space-x-2 mb-6">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={i < Math.floor(userProfile.rating) ? 'text-yellow-400 fill-current' : 'text-dark-500'}
                          />
                        ))}
                      </div>
                      <span className="text-lg text-dark-500">({userProfile.rating})</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Hakkımda</h4>
                    <p className="text-dark-500 leading-relaxed">
                      {userProfile.bio}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center bg-dark-300 rounded-lg p-4">
                      <div className="text-3xl font-bold text-primary-500">{userProfile.completedJobs}</div>
                      <div className="text-sm text-dark-500">Tamamlanan İş</div>
                    </div>
                    <div className="text-center bg-dark-300 rounded-lg p-4">
                      <div className="text-3xl font-bold text-green-400">{userProfile.rating}</div>
                      <div className="text-sm text-dark-500">Puan</div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Skills & Actions */}
                <div className="space-y-6">
                  {/* Skills */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Yetenekler</h4>
                    <div className="flex flex-wrap gap-3">
                      {userProfile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-primary-500/20 text-primary-400 px-3 py-2 rounded-full border border-primary-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">İlgi Alanları</h4>
                    <div className="flex flex-wrap gap-3">
                      {userProfile.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="bg-primary-500/20 text-primary-400 px-3 py-2 rounded-full border border-primary-500/30"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg transition-colors font-medium">
                      Profili Düzenle
                    </button>
                    <button className="w-full bg-dark-300 hover:bg-dark-400 text-white py-3 px-6 rounded-lg transition-colors font-medium">
                      Ayarlar
                    </button>
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors font-medium">
                      Çıkış Yap
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Company Modal */}
      {showCompanyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-200 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Şirket Profili</h2>
                <button 
                  onClick={() => setShowCompanyModal(false)}
                  className="text-dark-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Company Info */}
                <div className="space-y-6">
                  {/* Company Header */}
                  <div className="text-center">
                    <div className="relative inline-block mb-6">
                      <img
                        src={companyProfile.logo}
                        alt={companyProfile.name}
                        className="w-32 h-32 rounded-lg border-4 border-primary-500"
                      />
                      {companyProfile.isVerified && (
                        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2">
                          <Award size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{companyProfile.name}</h3>
                    
                    <div className="flex items-center justify-center space-x-4 text-dark-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Building size={16} />
                        <span>{companyProfile.sector}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{companyProfile.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2 text-dark-500 mb-6">
                      <Calendar size={16} />
                      <span>Kuruluş: {companyProfile.founded}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-center space-x-2 mb-6">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={i < Math.floor(companyProfile.rating) ? 'text-yellow-400 fill-current' : 'text-dark-500'}
                          />
                        ))}
                      </div>
                      <span className="text-lg text-dark-500">({companyProfile.rating})</span>
                    </div>
                  </div>

                  {/* Company Description */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Hakkımızda</h4>
                    <p className="text-dark-500 leading-relaxed">
                      {companyProfile.description}
                    </p>
                  </div>

                  {/* Company Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center bg-dark-300 rounded-lg p-4">
                      <div className="text-2xl font-bold text-primary-500">{companyProfile.totalEmployees}</div>
                      <div className="text-sm text-dark-500">Çalışan</div>
                    </div>
                    <div className="text-center bg-dark-300 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-400">{companyProfile.completedProjects}</div>
                      <div className="text-sm text-dark-500">Proje</div>
                    </div>
                    <div className="text-center bg-dark-300 rounded-lg p-4">
                      <div className="text-2xl font-bold text-yellow-400">{companyProfile.rating}</div>
                      <div className="text-sm text-dark-500">Puan</div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Specialties & Actions */}
                <div className="space-y-6">
                  {/* Specialties */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Uzmanlık Alanları</h4>
                    <div className="flex flex-wrap gap-3">
                      {companyProfile.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-primary-500/20 text-primary-400 px-3 py-2 rounded-full border border-primary-500/30"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Awards */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Ödüller</h4>
                    <div className="space-y-3">
                      {companyProfile.awards.map((award, index) => (
                        <div key={index} className="flex items-center space-x-3 text-dark-500">
                          <Award size={16} className="text-yellow-400" />
                          <span>{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg transition-colors font-medium">
                      Şirket Profilini Düzenle
                    </button>
                    <button className="w-full bg-dark-300 hover:bg-dark-400 text-white py-3 px-6 rounded-lg transition-colors font-medium">
                      İş İlanı Ver
                    </button>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors font-medium">
                      Şirket Ayarları
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed right-4 top-20 w-80 bg-dark-200 border border-primary-500 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-primary-400 font-semibold flex items-center">
                <Bell size={16} className="mr-2" />
                Bildirimler
              </h3>
              <button 
                onClick={() => setShowNotifications(false)}
                className="text-dark-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { 
                  type: 'success', 
                  icon: '✅', 
                  title: 'Yeni İş İlanı', 
                  message: 'Aradığınız pozisyona uygun yeni bir ilan yayınlandı.',
                  time: '2 dakika önce',
                  color: 'text-green-400',
                  bgColor: 'bg-green-500/20',
                  borderColor: 'border-green-500/50'
                },
                { 
                  type: 'info', 
                  icon: '👁️', 
                  title: 'Profil Görüntülendi', 
                  message: 'Profilinizi görüntüleyen yeni bir şirket var.',
                  time: '15 dakika önce',
                  color: 'text-blue-400',
                  bgColor: 'bg-blue-500/20',
                  borderColor: 'border-blue-500/50'
                },
                { 
                  type: 'success', 
                  icon: '📧', 
                  title: 'Başvuru Yanıtı', 
                  message: 'Başvurunuza yanıt geldi.',
                  time: '1 saat önce',
                  color: 'text-green-400',
                  bgColor: 'bg-green-500/20',
                  borderColor: 'border-green-500/50'
                }
              ].map((notification, index) => (
                <div key={index} className={`bg-dark-300 rounded-lg p-3 border ${notification.borderColor}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className={`flex items-center text-sm font-medium mb-1 ${notification.color}`}>
                        <span className="mr-1">{notification.icon}</span>
                        {notification.title}
                      </div>
                      <p className="text-dark-500 text-xs mb-2">{notification.message}</p>
                      <div className="text-xs text-dark-600">{notification.time}</div>
                    </div>
                    <button 
                      onClick={() => setNotificationCount(Math.max(0, notificationCount - 1))}
                      className="text-dark-500 hover:text-white transition-colors ml-2"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header 