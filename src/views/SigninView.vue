<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const { proxy } = (getCurrentInstance() as any);
const API_BASE_URL = proxy.$apiBaseUrl;

const signin = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  // 簡易的なパスワードチェック（実際にはAPIサーバーに送信して検証します）
  try {
    // ここにAPIリクエストの処理を記述します
    const response = await fetch(`${API_BASE_URL}/admin/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: password.value }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('サインイン成功:', data);

      // パスワードをlocalStorageに保存
      // 今回は簡易的な実装のため、パスワードを保存していますが、実際にはセキュリティ上の理由から避けるべきです。
      localStorage.setItem('savedPassword', password.value);

      // サインイン成功後の処理（例：トップページへ遷移）
      router.push('/');
    } else {
      const errorData = await response.json();
      console.error('サインイン失敗:', errorData);
      errorMessage.value = errorData.message || 'サインインに失敗しました。';
    }
  } catch (error) {
    console.error('サインイン処理中にエラーが発生しました:', error);
    errorMessage.value = 'サインイン処理中にエラーが発生しました。';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center" style="max-width: 500px; min-width: 400px;">
    <v-row justify="center" class="w-100">
      <v-col cols="12">
        <v-card title="サインイン">
          <v-card-text>
            <v-text-field v-model="password" label="パスワード" type="password" required></v-text-field>
            <p v-if="errorMessage" class="text-error">{{ errorMessage }}</p>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="primary" :loading="isLoading" @click="signin">
              サインイン
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
