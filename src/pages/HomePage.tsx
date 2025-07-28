import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Package, Building, MessageCircle } from 'lucide-react'

const HomePage: React.FC = () => {
  const features = [
    { icon: '💬', text: 'Gerçek zamanlı mesajlaşma' },
            { icon: '👑', text: 'Premium üyelik sistemi' },
    { icon: '📍', text: 'Konum bazlı sıralama' }
  ]

  const cards = [
    {
      icon: <Search className="w-8 h-8 text-primary-500" />,
      title: 'İş Arıyorum',
      description: 'Size uygun iş tekliflerini keşfedin',
      link: '/job-search',
      features: [
        'Part-Time İşler',
        'Yeni Mezunlar İçin İşler',
        'Stajyer Pozisyonları',
        'Uzmanlık Gerektiren Part-Time İşler'
      ]
    },
    {
      icon: <Package className="w-8 h-8 text-primary-500" />,
      title: 'Ürün Pazarla',
      description: 'Ürününüz için firma teklifleri alın',
      link: '/product-marketing',
      features: [
        'Ürün tanıtımı yapın',
        'Firmalara ulaşın',
        'Teklif alın',
        'İş birliği kurun'
      ]
    },
    {
      icon: <Building className="w-8 h-8 text-primary-500" />,
      title: 'İş İlanı Ver',
      description: 'Çalışan adayları bulun',
      link: '/post-job',
      features: [
        'Hızlı ilan',
        'Premium öncelik',
        'Konum bazlı görünüm',
        'Başvuru yönetimi'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-dark-100">
      {/* Hero Section */}
      <div className="text-center py-20 px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-white mb-4"
        >
          TeklifKapısı
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-dark-600 mb-8"
        >
          Kariyerine, fikrine, yoluna teklif var
        </motion.p>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center space-x-8 mb-16"
        >
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-dark-500">
              <span className="text-lg">{feature.icon}</span>
              <span className="text-sm">{feature.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="card cursor-pointer group"
            >
              <Link to={card.link} className="block">
                <div className="flex items-center mb-4">
                  {card.icon}
                  <h3 className="text-xl font-semibold text-white ml-3">
                    {card.title}
                  </h3>
                </div>
                
                <p className="text-dark-500 mb-6">
                  {card.description}
                </p>
                
                <ul className="space-y-2">
                  {card.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-dark-600">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="text-center py-12">
        <div className="flex justify-center space-x-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">1000+</div>
            <div className="text-sm text-blue-400">Aktif İş İlanı</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-500 mb-2">500+</div>
            <div className="text-sm text-green-400">Kayıtlı Şirket</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-500 mb-2">5000+</div>
            <div className="text-sm text-purple-400">Kullanıcı</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-2">2000+</div>
            <div className="text-sm text-orange-400">Başarılı Eşleşme</div>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-colors relative">
          <MessageCircle size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            1
          </span>
        </button>
      </div>
    </div>
  )
}

export default HomePage 