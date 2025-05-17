<script setup lang="ts">
import { ref, onMounted } from 'vue';

// ステータス表示用のデータ
const status = ref('アイドル');
const connectionStatus = ref('未接続');
const lastUpdated = ref('---');

// アクションボタンの処理
const startAction = () => {
  status.value = '開始処理中...';
  console.log('開始アクションが実行されました。');
  // ここにAPIリクエストなどの処理を記述
  setTimeout(() => {
    status.value = '実行中';
  }, 2000);
};

const stopAction = () => {
  status.value = '停止処理中...';
  console.log('停止アクションが実行されました。');
  // ここにAPIリクエストなどの処理を記述
  setTimeout(() => {
    status.value = '停止';
  }, 2000);
};

const refreshData = async () => {
  connectionStatus.value = 'データ取得中...';
  try {
    const response = await fetch('/api/control/data'); // APIのエンドポイントは適宜変更
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    apiData.value = data;
    connectionStatus.value = '接続済み';
    lastUpdated.value = new Date().toLocaleString('ja-JP');
  } catch (error) {
    console.error('APIデータの取得に失敗しました:', error);
    connectionStatus.value = 'エラー';
    apiData.value = [];
  }
};

const resetSystem = () => {
  if (confirm('システムをリセットしますか？')) {
    status.value = 'リセット処理中...';
    console.log('システムリセットが実行されました。');
    // ここにAPIリクエストなどの処理を記述
    setTimeout(() => {
      status.value = 'アイドル';
      console.log('システムがリセットされました。');
    }, 3000);
  }
};

// APIから取得するデータとテーブルのヘッダー
const apiData = ref([]);
const headers = ref([
  { key: 'id', title: 'ID' },
  { key: 'name', title: '名前' },
  { key: 'value', title: '値' },
  { key: 'timestamp', title: 'タイムスタンプ' },
]);

onMounted(() => {
  // ページがマウントされたときにデータを初期ロードする場合
  // refreshData();
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">システム制御</h2>
      </v-col>
    </v-row>

    <v-row class="mb-6">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>ステータス</v-card-title>
          <v-card-text>
            <p>現在の状態: <span class="font-weight-bold">{{ status }}</span></p>
            <p>接続状況: <span class="font-weight-bold">{{ connectionStatus }}</span></p>
            <p>最終更新: {{ lastUpdated }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>アクション</v-card-title>
          <v-card-actions>
            <v-btn color="primary" @click="startAction">開始</v-btn>
            <v-btn color="warning" @click="stopAction">停止</v-btn>
            <v-btn color="success" @click="refreshData">データ更新</v-btn>
            <v-btn color="error" @click="resetSystem">システムリセット</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h3>APIデータ</h3>
        <v-table v-if="apiData.length > 0">
          <thead>
            <tr>
              <th v-for="header in headers" :key="header.key">{{ header.title }}</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="item in apiData" :key="item.id">
              <td v-for="header in headers" :key="header.key">
                {{ item[header.key] }}
              </td>
            </tr> -->
          </tbody>
        </v-table>
        <p v-else>APIからデータが取得されていません。</p>
      </v-col>
    </v-row>
  </v-container>
</template>
