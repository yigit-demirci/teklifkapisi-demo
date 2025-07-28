import React, { useState } from 'react'
import { X, Bell, CheckCircle, Info, Star } from 'lucide-react'

const NotificationPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  return (
    <div className="fixed right-4 top-20 w-80 bg-dark-200 border border-primary-500 rounded-lg shadow-lg z-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-primary-400 font-semibold flex items-center">
            <Bell size={16} className="mr-2" />
            Bildirimler
          </h3>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-dark-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-3">
          {[
            { 
              type: 'success', 
              icon: CheckCircle, 
              title: 'Profil Güncellendi', 
              message: 'Profil bilgileriniz başarıyla güncellendi',
              time: '2 dakika önce',
              color: 'text-green-400',
              bgColor: 'bg-green-500/20',
              borderColor: 'border-green-500/50'
            },
            { 
              type: 'info', 
              icon: Info, 
              title: 'Yeni İş İlanı', 
              message: 'Kriterlerinize uygun 3 yeni iş ilanı bulundu',
              time: '15 dakika önce',
              color: 'text-blue-400',
              bgColor: 'bg-blue-500/20',
              borderColor: 'border-blue-500/50'
            },
            { 
              type: 'premium', 
              icon: Star, 
                      title: 'Premium Özellik',
        message: 'Premium üyeliğiniz aktif. Özel özelliklere erişebilirsiniz',
              time: '1 saat önce',
              color: 'text-yellow-400',
              bgColor: 'bg-yellow-500/20',
              borderColor: 'border-yellow-500/50'
            }
          ].map((notification, index) => (
            <div key={index} className={`bg-dark-300 rounded-lg p-3 border ${notification.borderColor}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className={`flex items-center text-sm font-medium mb-1 ${notification.color}`}>
                    <notification.icon size={12} className="mr-1" />
                    {notification.title}
                  </div>
                  <p className="text-dark-500 text-xs mb-2">{notification.message}</p>
                  <div className="text-xs text-dark-600">{notification.time}</div>
                </div>
                <button className="text-dark-500 hover:text-white transition-colors ml-2">
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotificationPanel 