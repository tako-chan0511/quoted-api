<template>
  <div id="app" class="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
    <div class="w-full max-w-2xl p-8 mx-4 bg-white rounded-2xl shadow-lg text-center">
      
      <header class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">名言ジェネレーター</h1>
        <p class="text-gray-500">A Simple API Practice App</p>
      </header>

      <main class="min-h-[200px] flex flex-col justify-center items-center mb-8">
        <blockquote v-if="!loading" class="transition-opacity duration-500">
          <p class="text-2xl md:text-3xl font-medium text-gray-700 leading-relaxed">
            "{{ quote }}"
          </p>
          <cite class="block text-right text-lg text-gray-500 mt-4">
            - {{ author }}
          </cite>
        </blockquote>
        <div v-else class="text-gray-500">
          Loading...
        </div>
      </main>

      <footer class="flex justify-center">
        <button 
          @click="getQuote" 
          :disabled="loading"
          class="px-8 py-4 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          新しい名言を生成
        </button>
      </footer>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// --- State ---
const quote = ref('');
const author = ref('');
const loading = ref(true);

// --- Methods ---
const getQuote = async () => {
  loading.value = true;
  try {
    // 自作したAPIエンドポイント /api/quote を呼び出す
    const response = await fetch('/api/quote');
    if (!response.ok) {
      throw new Error('APIの呼び出しに失敗しました。');
    }
    const data = await response.json();
    
    // 受け取ったデータでStateを更新
    quote.value = data.quote;
    author.value = data.author;

  } catch (error) {
    console.error(error);
    quote.value = '名言の取得に失敗しました。';
    author.value = 'システム';
  } finally {
    loading.value = false;
  }
};

// --- Lifecycle Hooks ---
// コンポーネントがマウントされた時に、最初の名言を取得する
onMounted(() => {
  getQuote();
});
</script>

<style>
/* Tailwind CSSを読み込むための記述（index.htmlに記述してもOK） */
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
