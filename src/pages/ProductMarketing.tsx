import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Package, Upload, MessageCircle, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProductMarketing: React.FC = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    link: '',
    message: 'Merhaba, size ürünümü tanıtmak istiyorum...'
  })

  const companies = [
    { name: 'Arçelik', sector: 'Beyaz Eşya' },
    { name: 'Ford', sector: 'Otomotiv' },
    { name: 'Turkcell', sector: 'Telekomünikasyon' },
    { name: 'Garanti BBVA', sector: 'Bankacılık' }
  ]

  const handleInputChange = (field: string, value: string) => {
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
          <Package size={24} className="text-primary-500" />
          <h1 className="text-xl font-semibold text-white">Ürün Pazarlama</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Ürün Bilgileri</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Ürün Adı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => handleInputChange('productName', e.target.value)}
                  placeholder="Ürününüzün adı"
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Ürün Açıklaması <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Ürününüzü detaylı olarak tanıtın..."
                  rows={4}
                  className="input-field w-full resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Ürün Linki <span className="text-dark-500 text-xs">(İsteğe Bağlı)</span>
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => handleInputChange('link', e.target.value)}
                  placeholder="https://www.urunsite.com"
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Ürün Görseli
                </label>
                <div className="border-2 border-dashed border-dark-400 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
                  <Upload className="mx-auto mb-4 text-dark-500" size={32} />
                  <p className="text-dark-500 mb-2">Dosyayı buraya sürükleyin veya tıklayın</p>
                  <p className="text-xs text-dark-600">Maksimum 2MB</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Firmalara Gönderilecek Mesaj <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={3}
                  className="input-field w-full resize-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Target Companies */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Hedef Firmalar</h2>
            
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Firma ara..."
                  className="input-field w-full pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-500" size={20} />
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {companies.map((company, index) => (
                  <div key={index} className="card cursor-pointer hover:border-primary-500 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{company.name}</h3>
                        <p className="text-sm text-dark-500">{company.sector}</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 text-primary-600 bg-dark-300 border-dark-400 rounded focus:ring-primary-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <Package size={20} />
          <span>Gönder</span>
        </motion.button>
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

export default ProductMarketing 