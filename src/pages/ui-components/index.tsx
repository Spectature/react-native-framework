import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../router';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { 
  Button, 
  Card, 
  Space,
  Cell,
} from '@fruits-chain/react-native-xiaoshu';

const UIComponentsScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProps>();
  
  // 按钮组件示例的状态
  const [buttonLoading, setButtonLoading] = useState(false);
  
  // 模拟按钮加载
  const handleLoadingButtonPress = () => {
    setButtonLoading(true);
    setTimeout(() => {
      setButtonLoading(false);
    }, 2000);
  };

  return (
    <ScrollView style={[styles.container, {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }]}>
      <Text style={[styles.title, {
        color: isDarkMode ? Colors.white : Colors.black,
      }]}>小暑 UI 组件示例</Text>
      
      {/* 按钮组件示例 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {
          color: isDarkMode ? Colors.white : Colors.black,
        }]}>按钮组件 (Button)</Text>
        
        <Space direction="vertical" gap={10}>
          <Button>默认按钮</Button>
          <Button type="primary">主要按钮</Button>
          <Button danger>危险按钮</Button>
          <Button loading={buttonLoading} onPress={handleLoadingButtonPress}>
            {buttonLoading ? '加载中...' : '点击加载'}
          </Button>
          <Button size="xs">小按钮</Button>
          <Button size="xl">大按钮</Button>
          <Button disabled>禁用按钮</Button>
        </Space>
      </View>
      
      {/* 重要链接地址展示 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {
          color: isDarkMode ? Colors.white : Colors.black,
        }]}>重要链接地址</Text>
        
        <Space direction="vertical" gap={16}>
          {/* 使用Card组件展示地址 */}
          <Card
            title="小暑组件文档"
            style={styles.linkCard}
          >
            <Text style={styles.cardText}>访问小暑组件官方文档，了解更多用法和示例</Text>
            <Text style={[styles.urlText, {
              color: isDarkMode ? '#58a6ff' : '#0969da'
            }]}>https://24jieqi.github.io/react-native-xiaoshu/</Text>
          </Card>
          
        </Space>
      </View>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>返回首页</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  linkCard: {
    borderRadius: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  urlText: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  customLinkCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  customCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  linkIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2196F3',
    marginRight: 8,
  },
  customCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  customCardDesc: {
    fontSize: 12,
    color: '#666',
  },
  cellValue: {
    fontSize: 13,
    fontFamily: 'monospace',
    color: '#0969da',
    marginTop: 4,
  },
  cellExtra: {
    fontSize: 12,
    color: '#666',
  },
  cellValueContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    marginTop: -8,
  },
});

export default UIComponentsScreen; 