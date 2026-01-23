function EasyAccessSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">立即开始</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold mb-3">立即获取</h3>
            <p className="text-indigo-100 mb-6">快速开始您的项目评估</p>
            <button 
              onClick={() => {
                window.location.pathname = '/assessment'
              }}
              className="w-full bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
            >
              开始申请
            </button>
          </div>
          
          <div className="bg-white border-2 border-indigo-200 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">联系我们</h3>
            <p className="text-gray-600 mb-6">快速了解项目可行性</p>
            <a
              href={import.meta.env.VITE_TELEGRAM_LINK || 'https://t.me/your_telegram_username'}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button className="w-full border-2 border-indigo-600 text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                联系我们
              </button>
            </a>
          </div>
          
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">定制方案</h3>
            <p className="text-gray-600 mb-6">了解评估报告格式</p>
            <a
              href={import.meta.env.VITE_TELEGRAM_LINK || 'https://t.me/your_telegram_username'}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button className="w-full border-2 border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                定制方案
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EasyAccessSection
