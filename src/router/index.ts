import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 定义路由参数类型
export type RootStackParamList = {
  Home: undefined;
  Demo: undefined;
  ApiExample: undefined;
  // 在这里添加更多路由...
};

// 定义导航属性类型
export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

// 路由配置，包含所有页面信息
export interface RouteConfig {
  name: keyof RootStackParamList;
  component: React.ComponentType<any>;
  options?: {
    title?: string;
    headerShown?: boolean;
    // 可以添加更多导航选项...
  };
}

// 应用路由配置
import HomeScreen from '../pages/home';
import DemoScreen from '../pages/demo';
import ApiExampleScreen from '../pages/api-example';
import React from "react";

// 路由表配置
const routes: RouteConfig[] = [
  {
    name: 'Home',
    component: HomeScreen,
    options: {
      title: '首页'
    }
  },
  {
    name: 'Demo',
    component: DemoScreen,
    options: {
      title: 'Demo页面'
    }
  },
  {
    name: 'ApiExample',
    component: ApiExampleScreen,
    options: {
      title: 'API示例'
    }
  },
  // 可以在这里添加更多路由...
];

export default routes; 