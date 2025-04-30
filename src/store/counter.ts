import { makeAutoObservable, configure } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 关闭MobX的严格模式
configure({
  enforceActions: 'never'
});

class CounterStore {
  count = 0;
  message = '未设置消息';

  constructor() {
    makeAutoObservable(this);
    
    // 只持久化message属性
    makePersistable(this, {
      name: 'CounterStore',
      properties: ['message'],
      storage: AsyncStorage
    });
  }

  // 用于清除持久化数据的方法
  clearPersistedData() {
    return AsyncStorage.removeItem('CounterStore');
  }
}

// 导出单例实例
export const counterStore = new CounterStore(); 