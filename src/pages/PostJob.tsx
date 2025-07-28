import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Building, MapPin, Crown, FileText, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const PostJob: React.FC = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    category: '',
    location: '',
    salary: '',
            isPremium: false
  })

  const categories = [
    'Kategori seçin',
    'Part-Time İş',
    'Yeni Mezunlara Yönelik İş',
    'Stajyer Pozisyonu',
    'Uzmanlık Gerektiren Part-Time İş'
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-dark-100">
      {/* Header */}
      <div className="bg-dark-200 border-b border-dark-300 px-6 py-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white hover:text-primary-400 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <Building size={24} className="text-primary-500" />
          <h1 className="text-xl font-semibold text-white">İş İlanı Ver</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              İş Başlığı <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              placeholder="Örn: Part-Time Garson"
              className="input-field w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Şirket Adı <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="Şirket adınız"
              className="input-field w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="input-field w-full"
            >
              {categories.map((category, index) => (
                <option key={index} value={category} className="bg-dark-200 text-white">
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Konum <span className="text-dark-500 text-xs">(İsteğe Bağlı)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Örn: Kadıköy, İstanbul"
                className="input-field w-full pl-10"
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-500" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Maaş Bilgisi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.salary}
              onChange={(e) => handleInputChange('salary', e.target.value)}
              placeholder="Örn: 15.000 - 20.000 TL"
              className="input-field w-full"
            />
          </div>

          {/* Premium Option */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.isPremium}
                onChange={(e) => handleInputChange('isPremium', e.target.checked)}
                className="w-5 h-5 text-primary-600 bg-dark-300 border-dark-400 rounded focus:ring-primary-500 mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Crown className="text-primary-500" size={20} />
                  <span className="font-semibold text-white">Premium İlan Yap</span>
                </div>
                <p className="text-sm text-dark-500">
                  Premium ilanlar seçilen kategoride öncelikli olarak gösterilir ve daha fazla görünürlük sağlar.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <FileText size={20} />
            <span>İlanı Yayınla</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Chat Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-colors">
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
  )
}

export default PostJob 