import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, MapPin, Building, Clock, DollarSign, Users, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const JobSearch: React.FC = () => {
  const [location, setLocation] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    {
      title: 'Part-Time İşler',
      description: 'Esnek çalışma saatleri ile part-time pozisyonlar',
      icon: '⏰',
      jobs: [
        {
          id: 1,
          title: 'Part-Time Garson',
          company: 'Köfteci Mehmet Usta',
          location: 'Kadıköy, İstanbul',
          salary: '15.000 - 18.000 TL',
          type: 'Part-Time',
          experience: 'Deneyim gerekmez',
          description: 'Hafta sonu ve akşam saatlerinde çalışacak garson aranıyor. Esnek çalışma saatleri.',
          benefits: ['Esnek saat', 'Yemek', 'Prim'],
          posted: '2 gün önce',
          isPremium: true
        },
        {
          id: 2,
          title: 'Part-Time Kurye',
          company: 'Getir',
          location: 'Beşiktaş, İstanbul',
          salary: '12.000 - 15.000 TL',
          type: 'Part-Time',
          experience: 'Deneyim gerekmez',
          description: 'Motosiklet ehliyeti olan, esnek çalışma saatlerinde kurye aranıyor.',
          benefits: ['Esnek saat', 'Yakıt desteği', 'Prim'],
          posted: '1 gün önce',
          isPremium: false
        },
        {
          id: 3,
          title: 'Part-Time Satış Danışmanı',
          company: 'Teknosa',
          location: 'Şişli, İstanbul',
          salary: '18.000 - 22.000 TL',
          type: 'Part-Time',
          experience: 'Deneyim gerekmez',
          description: 'Teknoloji ürünleri satışında deneyimli, müşteri odaklı satış danışmanı aranıyor.',
          benefits: ['Komisyon', 'Eğitim', 'İndirim'],
          posted: '3 gün önce',
          isPremium: true
        }
      ]
    },
    {
      title: 'Yeni Mezunlar İçin İşler',
      description: 'Kariyerine yeni başlayanlar için fırsatlar',
      icon: '🎓',
      jobs: [
        {
          id: 4,
          title: 'Junior Yazılım Geliştirici',
          company: 'TechStart',
          location: 'Maslak, İstanbul',
          salary: '25.000 - 35.000 TL',
          type: 'Tam Zamanlı',
          experience: '0-2 yıl',
          description: 'React ve Node.js bilgisi olan, yeni mezun yazılım geliştirici aranıyor.',
          benefits: ['Uzaktan çalışma', 'Eğitim', 'Sağlık sigortası'],
          posted: '1 gün önce',
          isPremium: true
        },
        {
          id: 5,
          title: 'Müşteri Hizmetleri Temsilcisi',
          company: 'Turkcell',
          location: 'Levent, İstanbul',
          salary: '20.000 - 25.000 TL',
          type: 'Tam Zamanlı',
          experience: '0-1 yıl',
          description: 'Müşteri odaklı, iletişim becerileri güçlü müşteri hizmetleri temsilcisi aranıyor.',
          benefits: ['Sağlık sigortası', 'Yemek', 'Prim'],
          posted: '2 gün önce',
          isPremium: false
        },
        {
          id: 6,
          title: 'Pazarlama Asistanı',
          company: 'Global Marketing',
          location: 'Kadıköy, İstanbul',
          salary: '18.000 - 22.000 TL',
          type: 'Tam Zamanlı',
          experience: '0-1 yıl',
          description: 'Sosyal medya ve dijital pazarlama konularında deneyimli pazarlama asistanı aranıyor.',
          benefits: ['Esnek saat', 'Eğitim', 'Kariyer fırsatı'],
          posted: '4 gün önce',
          isPremium: true
        }
      ]
    },
    {
      title: 'Stajyer Pozisyonları',
      description: 'Deneyim kazanmak için staj imkanları',
      icon: '📚',
      jobs: [
        {
          id: 7,
          title: 'Yazılım Stajyeri',
          company: 'Microsoft Türkiye',
          location: 'Maslak, İstanbul',
          salary: '8.000 - 12.000 TL',
          type: 'Staj',
          experience: 'Öğrenci',
          description: 'Bilgisayar mühendisliği öğrencileri için 3 aylık yazılım geliştirme stajı.',
          benefits: ['Mentorluk', 'Sertifika', 'İş fırsatı'],
          posted: '1 hafta önce',
          isPremium: true
        },
        {
          id: 8,
          title: 'Finans Stajyeri',
          company: 'Garanti BBVA',
          location: 'Levent, İstanbul',
          salary: '6.000 - 10.000 TL',
          type: 'Staj',
          experience: 'Öğrenci',
          description: 'İşletme/İktisat öğrencileri için finans departmanında staj imkanı.',
          benefits: ['Eğitim', 'Networking', 'Referans'],
          posted: '3 gün önce',
          isPremium: false
        },
        {
          id: 9,
          title: 'Pazarlama Stajyeri',
          company: 'Unilever',
          location: 'Şişli, İstanbul',
          salary: '7.000 - 11.000 TL',
          type: 'Staj',
          experience: 'Öğrenci',
          description: 'Pazarlama bölümü öğrencileri için marka yönetimi stajı.',
          benefits: ['Proje deneyimi', 'Mentorluk', 'Kariyer fırsatı'],
          posted: '5 gün önce',
          isPremium: true
        }
      ]
    },
    {
      title: 'Uzmanlık Gerektiren Part-Time İşler',
      description: 'Özel beceri gerektiren part-time pozisyonlar',
      icon: '💼',
      jobs: [
        {
          id: 10,
          title: 'Freelance Grafik Tasarımcı',
          company: 'Creative Studio',
          location: 'Uzaktan',
          salary: 'Proje bazlı',
          type: 'Freelance',
          experience: '2+ yıl',
          description: 'Adobe Creative Suite bilgisi olan, logo ve kurumsal kimlik tasarımında deneyimli grafik tasarımcı.',
          benefits: ['Esnek saat', 'Uzaktan çalışma', 'Yüksek ücret'],
          posted: '1 gün önce',
          isPremium: true
        },
        {
          id: 11,
          title: 'Part-Time Yazılım Geliştirici',
          company: 'TechCorp',
          location: 'Hibrit',
          salary: '30.000 - 45.000 TL',
          type: 'Part-Time',
          experience: '3+ yıl',
          description: 'React, Node.js ve MongoDB deneyimi olan, proje bazlı çalışacak yazılım geliştirici.',
          benefits: ['Uzaktan çalışma', 'Esnek saat', 'Yüksek ücret'],
          posted: '2 gün önce',
          isPremium: true
        },
        {
          id: 12,
          title: 'Part-Time Çevirmen',
          company: 'Language Solutions',
          location: 'Uzaktan',
          salary: 'Kelime başına ücret',
          type: 'Freelance',
          experience: '1+ yıl',
          description: 'İngilizce-Türkçe çeviri yapabilecek, teknik doküman çevirisinde deneyimli çevirmen.',
          benefits: ['Esnek saat', 'Uzaktan çalışma', 'Çeşitli projeler'],
          posted: '3 gün önce',
          isPremium: false
        }
      ]
    }
  ]

  const sortingSystem = [
    'Premium + konuma uygun ilanlar',
    'Konuma uygun ama Premium olmayan ilanlar',
    'Premium ama konuma uymayan ilanlar'
  ]

  const handleCategoryClick = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle)
  }

  const selectedCategoryData = categories.find(cat => cat.title === selectedCategory)

  return (
    <div className="min-h-screen bg-dark-100">
      {/* Header */}
      <div className="bg-dark-200 border-b border-dark-300 px-6 py-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white hover:text-primary-400 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <Search size={24} className="text-primary-500" />
          <h1 className="text-xl font-semibold text-white">İş Arama</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Location Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Konum Bilgisi</h2>
          <p className="text-dark-500 mb-6">
            Konumunuzu belirtirseniz size yakın iş ilanları öncelikli olarak gösterilir.
          </p>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Konum (İsteğe Bağlı)
            </label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Örn: Kadıköy, İstanbul"
                className="input-field w-full pl-10"
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-500" size={20} />
            </div>
          </div>
        </motion.div>

        {/* Job Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6">İş Kategorisi Seçin</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -2 }}
                className={`card cursor-pointer group ${selectedCategory === category.title ? 'border-primary-500' : ''}`}
                onClick={() => handleCategoryClick(category.title)}
              >
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">{category.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-dark-500 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Job Listings */}
        {selectedCategoryData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-6">
              {selectedCategoryData.title} - Örnek İlanlar
            </h2>
            
            <div className="space-y-6">
              {selectedCategoryData.jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="card hover:border-primary-500 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                        {job.isPremium && (
                          <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                            <Star size={12} className="mr-1" />
                            Premium
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3 text-sm text-dark-500">
                        <div className="flex items-center space-x-1">
                          <Building size={16} />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin size={16} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={16} />
                          <span>{job.type}</span>
                        </div>
                      </div>
                      
                      <p className="text-dark-500 mb-3">{job.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1 text-green-400">
                            <DollarSign size={16} />
                            <span className="font-medium">{job.salary}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-dark-500">
                            <Users size={16} />
                            <span>{job.experience}</span>
                          </div>
                        </div>
                        
                        <div className="text-xs text-dark-500">
                          {job.posted}
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.benefits.map((benefit, benefitIndex) => (
                          <span key={benefitIndex} className="bg-dark-300 text-dark-600 text-xs px-2 py-1 rounded">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Sorting System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <h2 className="text-xl font-semibold text-white mb-4">İlan Sıralama Sistemi</h2>
          <p className="text-dark-500 mb-4">Konum belirtirseniz:</p>
          
          <div className="space-y-3">
            {sortingSystem.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                <span className="text-dark-600">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default JobSearch 