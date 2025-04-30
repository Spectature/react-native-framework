import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, TextInput } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../router';
import emitter from '../../utils/eventBus';
import { observer } from 'mobx-react-lite';
import { counterStore } from '../../store/counter';

const HomeScreen = observer(() => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProps>();
  const [newMessage, setNewMessage] = useState('');
  
  // 在组件加载时检查持久化状态
  useEffect(() => {
    console.log('加载持久化状态:', counterStore.message);
  }, []);
  
  // 发送简单事件到当前页面
  const sendEvent = () => {
    // 发送事件到当前页面的EventReceiver
    emitter.emit('simple:message', `来自Home的消息 - ${new Date().toLocaleTimeString()}`);
  };
  
  // MobX状态操作
  const handleIncrement = () => {
    counterStore.count += 1;
  };
  
  const handleDecrement = () => {
    counterStore.count -= 1;
  };
  
  const handleReset = () => {
    counterStore.count = 0;
  };
  
  const handleSetMessage = () => {
    if (newMessage.trim()) {
      counterStore.message = newMessage;
      setNewMessage('');
    }
  };
  
  // 清除持久化数据
  const handleClearPersistedData = () => {
    counterStore.clearPersistedData().then(() => {
      console.log('持久化数据已清除');
      counterStore.message = '未设置消息';
    });
  };

  return (
    <View style={[styles.container, {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }]}>
      <Text style={[styles.title, {
        color: isDarkMode ? Colors.white : Colors.black,
      }]}>React Native 首页</Text>
      
      {/* Mitt事件总线示例 */}
      <View style={styles.eventBusExample}>
        <Text style={[styles.exampleTitle, {
          color: isDarkMode ? Colors.white : Colors.black,
        }]}>Mitt事件总线示例</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={sendEvent}
        >
          <Text style={styles.buttonText}>发送事件到当前页面</Text>
        </TouchableOpacity>
      </View>
      
      <EventReceiver />
      
      {/* MobX状态管理示例 */}
      <View style={styles.mobxExample}>
        <Text style={[styles.exampleTitle, {
          color: isDarkMode ? Colors.white : Colors.black,
        }]}>MobX状态管理示例 (message持久化)</Text>
        
        <Text style={[styles.stateText, {
          color: isDarkMode ? Colors.white : Colors.black,
        }]}>计数值 (非持久化): {counterStore.count}</Text>
        
        <Text style={[styles.stateText, {
          color: isDarkMode ? Colors.white : Colors.black,
        }]}>消息 (持久化): {counterStore.message}</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.counterButton, styles.decrementButton]}
            onPress={handleDecrement}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.counterButton, styles.resetButton]}
            onPress={handleReset}
          >
            <Text style={styles.buttonText}>重置</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.counterButton, styles.incrementButton]}
            onPress={handleIncrement}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.messageInputContainer}>
          <TextInput
            style={[styles.messageInput, {
              color: isDarkMode ? Colors.white : Colors.black,
              borderColor: isDarkMode ? Colors.light : Colors.dark,
            }]}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="输入新消息"
            placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
          />
          
          <TouchableOpacity 
            style={styles.setMessageButton}
            onPress={handleSetMessage}
          >
            <Text style={styles.buttonText}>设置</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={handleClearPersistedData}
        >
          <Text style={styles.buttonText}>清除持久化数据</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.navigationButton}
        onPress={() => navigation.navigate('Demo')}
      >
        <Text style={styles.buttonText}>跳转到Demo页面</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navigationButton}
        onPress={() => navigation.navigate('ApiExample')}
      >
        <Text style={styles.buttonText}>跳转到API示例页面</Text>
      </TouchableOpacity>
    </View>
  );
});

const EventReceiver = () => {
  const [receivedMessage, setReceivedMessage] = useState('尚未收到消息');
  
  React.useEffect(() => {
    const handleEvent = (message: string) => {
      console.log('接收到的消息:', message);
      setReceivedMessage(message);
    };

    emitter.on('simple:message', handleEvent);

    return () => {
      emitter.off('simple:message', handleEvent);
    };
  }, []);

  return (
    <View style={styles.eventReceiver}>
      <Text style={styles.receiverTitle}>事件接收器:</Text>
      <Text style={styles.receiverText}>{receivedMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  eventBusExample: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginBottom: 20,
    alignItems: 'center',
  },
  mobxExample: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(33,150,243,0.1)',
    marginBottom: 20,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  stateText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  counterButton: {
    padding: 12,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  decrementButton: {
    backgroundColor: '#F44336',
  },
  resetButton: {
    backgroundColor: '#FF9800',
  },
  incrementButton: {
    backgroundColor: '#4CAF50',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  messageInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  setMessageButton: {
    backgroundColor: '#9C27B0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventReceiver: {
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    borderRadius: 5,
    marginVertical: 20,
  },
  receiverTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  receiverText: {
    fontSize: 16,
    color: 'green',
  },
  clearButton: {
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default HomeScreen; 
export default HomeScreen; 