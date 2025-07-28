import React, { useState } from 'react'
import { MessageCircle, X, Search, Phone, Video, MoreVertical, Send, Plus, Settings, Archive, CheckCircle } from 'lucide-react'

interface Conversation {
  id: number
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  isSelected: boolean
}

interface Message {
  id: number
  text: string
  sender: 'user' | 'other'
  timestamp: string
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('completed')

  const conversations: Conversation[] = [
    {
      id: 1,
      name: 'TechCorp HR',
      avatar: 'TH',
      lastMessage: 'Merhaba tabii ki. Bu pozisyon için React ve TypeScript deneyimi arıyoruz. Daha detaylı konuşabilir miyiz?',
      timestamp: '1 yıldan fazla önce',
      unreadCount: 0,
      isOnline: true,
      isSelected: true
    },
    {
      id: 2,
      name: 'Kreatif Ajans',
      avatar: 'KA',
      lastMessage: 'Grafik tasarım portföyünüzü gönderdik. Değerlendirme sonucunu paylaşacağız.',
      timestamp: '1 yıldan fazla önce',
      unreadCount: 1,
      isOnline: false,
      isSelected: false
    },
    {
      id: 3,
      name: 'StartupXYZ',
      avatar: 'SX',
      lastMessage: 'Mülakat tarihini onayladık. Pazartesi saat 14:00\'da görüşmek üzere.',
      timestamp: '2 gün önce',
      unreadCount: 0,
      isOnline: true,
      isSelected: false
    },
    {
      id: 4,
      name: 'Digital Marketing Co.',
      avatar: 'DM',
      lastMessage: 'Sosyal medya yönetimi pozisyonu için CV\'nizi aldık.',
      timestamp: '1 hafta önce',
      unreadCount: 0,
      isOnline: false,
      isSelected: false
    }
  ]

  const allMessages: { [key: number]: Message[] } = {
    1: [
      {
        id: 1,
        text: 'Merhaba, Frontend Developer pozisyonu hakkında bilgi alabilir miyim?',
        sender: 'user',
        timestamp: '1 yıldan az önce'
      },
      {
        id: 2,
        text: 'Merhaba tabii ki. Bu pozisyon için React ve TypeScript deneyimi arıyoruz. Daha detaylı konuşabilir miyiz?',
        sender: 'other',
        timestamp: '1 yıldan fazla önce'
      }
    ],
    2: [
      {
        id: 1,
        text: 'Grafik tasarım portföyümü gönderdim. Değerlendirme ne zaman tamamlanacak?',
        sender: 'user',
        timestamp: '2 gün önce'
      },
      {
        id: 2,
        text: 'Portföyünüzü inceledik. Çok başarılı çalışmalarınız var. Pazartesi görüşmek üzere.',
        sender: 'other',
        timestamp: '1 gün önce'
      }
    ],
    3: [
      {
        id: 1,
        text: 'Mülakat tarihini onayladık. Pazartesi saat 14:00\'da görüşmek üzere.',
        sender: 'other',
        timestamp: '2 gün önce'
      },
      {
        id: 2,
        text: 'Teşekkürler! Pazartesi görüşmek üzere.',
        sender: 'user',
        timestamp: '1 gün önce'
      }
    ]
  }

  const messages = allMessages[selectedConversation || 1] || []

  // Çevrimiçi kullanıcılar
  const onlineUsers = [
    {
      id: 5,
      name: 'ABC Yazılım',
      avatar: 'AY',
      lastMessage: 'Yazılım geliştirici pozisyonu için başvurunuzu aldık.',
      timestamp: '5 dakika önce',
      unreadCount: 0,
      isOnline: true,
      isSelected: false
    },
    {
      id: 6,
      name: 'XYZ İnşaat',
      avatar: 'XI',
      lastMessage: 'Proje yöneticisi pozisyonu için görüşme talep ediyoruz.',
      timestamp: '10 dakika önce',
      unreadCount: 1,
      isOnline: true,
      isSelected: false
    },
    {
      id: 7,
      name: 'Tech Solutions',
      avatar: 'TS',
      lastMessage: 'DevOps Engineer pozisyonu için teknik mülakat planlanıyor.',
      timestamp: '15 dakika önce',
      unreadCount: 0,
      isOnline: true,
      isSelected: false
    }
  ]

  // Arşivlenmiş mesajlar
  const archivedConversations = [
    {
      id: 8,
      name: 'Eski Şirket A',
      avatar: 'EA',
      lastMessage: 'Merhaba, iş ilanınız hakkında bilgi alabilir miyim?',
      timestamp: '1 ay önce',
      unreadCount: 0,
      isOnline: false,
      isSelected: false
    },
    {
      id: 9,
      name: 'Geçmiş Firma B',
      avatar: 'GF',
      lastMessage: 'Pozisyon dolduruldu, teşekkürler.',
      timestamp: '2 ay önce',
      unreadCount: 0,
      isOnline: false,
      isSelected: false
    },
    {
      id: 10,
      name: 'Eski İşveren C',
      avatar: 'EI',
      lastMessage: 'Mülakat sonucu olumsuz, başka fırsatlarda görüşürüz.',
      timestamp: '3 ay önce',
      unreadCount: 0,
      isOnline: false,
      isSelected: false
    }
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleConversationSelect = (conversationId: number) => {
    setSelectedConversation(conversationId)
    // Update conversation selection
    conversations.forEach(conv => {
      conv.isSelected = conv.id === conversationId
    })
    console.log('Conversation selected:', conversationId)
  }

  const handleFilterClick = (filterType: string) => {
    setActiveFilter(filterType)
    console.log('Filter clicked:', filterType)
  }

  const getFilteredConversations = () => {
    let currentConversations = conversations
    
    if (activeFilter === 'online') {
      currentConversations = onlineUsers
    } else if (activeFilter === 'archive') {
      currentConversations = archivedConversations
    }
    
    return currentConversations.filter(conv =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const filteredConversations = getFilteredConversations()

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 bg-dark-200 border border-dark-300 rounded-lg shadow-2xl z-50 w-[800px] h-[600px] flex">
          
          {/* Left Side - Conversation List */}
          <div className="w-1/2 border-r border-dark-300 flex flex-col">
            
            {/* Header */}
            <div className="p-4 border-b border-dark-300 bg-dark-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Mesajlar</h3>
                  <p className="text-xs text-dark-500">1 okunmamış mesaj</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-dark-500 hover:text-white transition-colors p-1">
                    <Plus size={16} />
                  </button>
                  <button className="text-dark-500 hover:text-white transition-colors p-1">
                    <Settings size={16} />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-dark-500 hover:text-white transition-colors p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-dark-300">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-500" />
                <input
                  type="text"
                  placeholder="Konuşma ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-dark-300 border border-dark-400 rounded-lg pl-10 pr-4 py-2 text-white placeholder-dark-500 focus:border-primary-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="p-4 border-b border-dark-300">
              <div className="flex items-center space-x-4 text-sm">
                <button 
                  onClick={() => handleFilterClick('completed')}
                  className={`pb-1 transition-colors ${
                    activeFilter === 'completed' 
                      ? 'text-primary-400 border-b border-primary-400' 
                      : 'text-dark-500 hover:text-white'
                  }`}
                >
                  Tamamlanmış (1)
                </button>
                <button 
                  onClick={() => handleFilterClick('online')}
                  className={`pb-1 transition-colors ${
                    activeFilter === 'online' 
                      ? 'text-primary-400 border-b border-primary-400' 
                      : 'text-dark-500 hover:text-white'
                  }`}
                >
                  Çevrimiçi (3)
                </button>
                <button 
                  onClick={() => handleFilterClick('archive')}
                  className={`pb-1 transition-colors ${
                    activeFilter === 'archive' 
                      ? 'text-primary-400 border-b border-primary-400' 
                      : 'text-dark-500 hover:text-white'
                  }`}
                >
                  Arşiv (3)
                </button>
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleConversationSelect(conversation.id)}
                  className={`p-4 border-b border-dark-300 cursor-pointer transition-colors ${
                    conversation.isSelected ? 'bg-dark-300' : 'hover:bg-dark-300'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {conversation.avatar}
                      </div>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-200"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-medium truncate">{conversation.name}</h4>
                        <span className="text-xs text-dark-500">{conversation.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-dark-500 truncate">{conversation.lastMessage}</p>
                        {conversation.unreadCount > 0 && (
                          <div className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-dark-300 bg-dark-300">
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-500">7 konuşma</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400">Çevrimiçi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Active Chat */}
          <div className="w-1/2 flex flex-col">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-dark-300 bg-dark-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {conversations.find(c => c.id === selectedConversation)?.avatar || 'TH'}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-200"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      {conversations.find(c => c.id === selectedConversation)?.name || 'TechCorp HR'}
                    </h3>
                    <p className="text-xs text-green-400">Çevrimiçi</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="text-dark-500 hover:text-white transition-colors p-1">
                    <Search size={16} />
                  </button>
                  <button className="text-dark-500 hover:text-white transition-colors p-1">
                    <Phone size={16} />
                  </button>
                  <button className="text-dark-500 hover:text-white transition-colors p-1">
                    <Video size={16} />
                  </button>
                  <button className="text-dark-500 hover:text-white transition-colors p-1">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-primary-600 text-white' : 'bg-dark-300 text-white'} rounded-lg px-3 py-2`}>
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-dark-300">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Mesajınızı yazın..."
                  className="flex-1 bg-dark-300 border border-dark-400 rounded-lg px-3 py-2 text-white placeholder-dark-500 focus:border-primary-500 focus:outline-none text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-primary-600 hover:bg-primary-700 disabled:bg-dark-400 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatWidget 