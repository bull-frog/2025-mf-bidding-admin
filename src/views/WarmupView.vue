<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const message = ref('APIサーバーが起動するのを待っています。これには１分以上かかる場合があります...');

const { proxy } = getCurrentInstance() as any;
const API_BASE_URL = proxy.$apiBaseUrl;

onMounted(async () => {
  try {
    // サーバーにリクエストを送信して、ウォームアップさせる
    await axios.get(`${API_BASE_URL}/warmup`, {
      // render.com のAPIサーバーがスリープ状態から起動するまでの時間を考慮して、タイムアウトを設定
      timeout: 80 * 1000, // 80秒のタイムアウト
    });

    // APIリクエストが成功した場合の処理
    console.log('APIサーバーとの接続に成功しました。');
    message.value = '準備が完了しました。トップページに移動します。';

    // 2秒後にトップページへ遷移
    setTimeout(() => {
      router.push('/');
    }, 2000);

  } catch (error) {
    console.error('APIサーバーとの接続に失敗しました:', error);
    message.value = 'APIサーバーとの接続に失敗しました。しばらくお待ちいただくか、再読み込みしてください。';
    // 必要に応じてエラー処理を追加
  }
});
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <v-progress-circular indeterminate color="primary" size="80" width="7" class="mb-4"></v-progress-circular>
        <p class="text-h6">{{ message }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>
