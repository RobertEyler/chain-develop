function ReciprocitySection() {
  const benefits = [
    '你的想法是否值得做',
    '哪些功能不值得花钱',
    '哪些地方最容易踩坑'
  ]

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">我们能为您做什么</h2>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            我们会直接告诉你：
          </p>
          <ul className="space-y-3 text-left bg-white rounded-lg p-6 shadow-md">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700">
                <span className="text-indigo-600 text-xl font-bold mt-1">•</span>
                <span className="text-base md:text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              window.location.pathname = '/assessment'
            }}
            className="w-full bg-indigo-600 text-white rounded-lg p-6 shadow-lg hover:bg-indigo-700 transition-colors duration-200 transform hover:scale-105"
          >
            <p className="text-lg md:text-xl font-semibold">免费获得专业的技术评估</p>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ReciprocitySection
