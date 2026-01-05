<template>
  <header id="home" class="relative min-h-screen flex items-center justify-center text-center pt-24 px-4 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-300 to-cream-100">
      <div class="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-brown-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl"></div>

      <div
        class="absolute inset-0 opacity-5"
        style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22><text y=%2240%22 font-size=%2240%22>☕</text></svg>'); background-size: 80px"
      ></div>
    </div>

    <div class="relative z-10 max-w-3xl">
      <span class="hero-badge inline-flex items-center gap-2 py-2 px-6 bg-white/80 backdrop-blur-sm text-green-700 font-semibold rounded-full border border-green-200 text-sm mb-6 shadow-lg">
        <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        Special Arabica Coffee & Tea
      </span>

      <h1 class="hero-title text-4xl md:text-6xl lg:text-7xl font-extrabold text-brown-900 leading-tight mb-6">
        Discover Your
        <br />
        <span class="relative">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">Perfect Moment</span>
          <svg class="absolute -bottom-2 left-0 w-full h-3 text-green-500/30" viewBox="0 0 200 12" preserveAspectRatio="none">
            <path d="M0,6 Q50,0 100,6 T200,6" stroke="currentColor" stroke-width="4" fill="none" />
          </svg>
        </span>
      </h1>

      <p class="hero-subtitle text-lg md:text-xl text-brown-500 max-w-2xl mx-auto mb-10">
        Menyajikan secangkir kebahagiaan dari biji kopi pilihan dan daun teh terbaik.

      </p>

      <div class="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#menu"
          class="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brown-700 to-brown-900 text-white font-bold py-4 px-8 rounded-full hover:shadow-2xl hover:shadow-brown-500/30 transition-all duration-300 transform hover:scale-105 overflow-hidden"
        >
          <span class="relative z-10 flex items-center gap-2">
      
            Explore Menu
          </span>
          <div class="absolute inset-0 bg-gradient-to-r from-brown-900 to-brown-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>

        <a
          href="#products"
          class="group inline-flex items-center justify-center gap-2 bg-white text-brown-700 font-bold py-4 px-8 rounded-full border-2 border-brown-200 hover:border-green-500 hover:text-green-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >

          Our Products
        </a>
      </div>

      <div class="hidden md:flex flex-col items-center mt-16 animate-bounce">
        <span class="text-xs text-brown-400 mb-2">Scroll Down</span>
        <svg class="w-6 h-6 text-brown-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>

    <!-- Floating Coffee Icons - Decorative -->
    <div class="hidden lg:block absolute bottom-24 left-24 text-6xl animate-float opacity-20">☕</div>
    <div class="hidden lg:block absolute top-32 right-24 text-5xl animate-float animation-delay-1000 opacity-20">🍵</div>
    <div class="hidden lg:block absolute bottom-40 right-40 text-4xl animate-float animation-delay-2000 opacity-20">🌿</div>
  </header>
</template>



<style scoped>
.hero-badge {
  animation: fadeInDown 0.6s ease-out;
}

.hero-title {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.hero-subtitle {
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.hero-buttons {
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
