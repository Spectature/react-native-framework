import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserStore {
  token = '';
  userId = '';
  username = '';
  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this);
    
    // 持久化用户相关数据
    makePersistable(this, {
      name: 'UserStore',
      properties: ['token', 'userId', 'username', 'isLoggedIn'],
      storage: AsyncStorage
    });
  }

  // 设置token
  setToken(token: string) {
    this.token = token;
  }

  // 设置用户信息
  setUserInfo(userId: string, username: string) {
    this.userId = userId;
    this.username = username;
    this.isLoggedIn = true;
  }

  // 登录
  login(token: string, userId: string, username: string) {
    this.setToken(token);
    this.setUserInfo(userId, username);
  }

  // 登出
  logout() {
    this.token = '';
    this.userId = '';
    this.username = '';
    this.isLoggedIn = false;
  }

  // 清除持久化数据
  clearPersistedData() {
    return AsyncStorage.removeItem('UserStore');
  }

  // 获取Bearer Token格式
  get bearerToken() {
    return this.token ? `Bearer ${this.token}` : '';
  }
}

// 导出单例实例
export const userStore = new UserStore(); 