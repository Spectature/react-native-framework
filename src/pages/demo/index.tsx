import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../router';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { observer } from 'mobx-react-lite';
import { counterStore } from '../../store/counter';

const DemoScreen = observer(() => {
  const navigation = useNavigation<NavigationProps>();
  const isDarkMode = useColorScheme() === 'dark';
  
  return (
    <View style={[styles.container, {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }]}>
      <Text style={[styles.title, {
        color: isDarkMode ? Colors.white : Colors.black,
      }]}>Demo页面</Text>
      
      <Text style={[styles.description, {
        color: isDarkMode ? Colors.white : Colors.black,
      }]}>MobX状态展示页面</Text>
      
      {/* MobX状态显示 */}
      <View style={styles.stateContainer}>
        <Text style={[styles.stateTitle, {
          color: isDarkMode ? Colors.white : Colors.black,
        }]}>来自Home页面的MobX状态:</Text>
        
        <View style={styles.stateRow}>
          <Text style={[styles.stateLabel, {
            color: isDarkMode ? Colors.white : Colors.black,
          }]}>计数值:</Text>
          <Text style={[styles.stateValue, {
            color: isDarkMode ? Colors.white : Colors.black,
          }]}>{counterStore.count}</Text>
        </View>
        
        <View style={styles.stateRow}>
          <Text style={[styles.stateLabel, {
            color: isDarkMode ? Colors.white : Colors.black,
          }]}>消息:</Text>
          <Text style={[styles.stateValue, {
            color: isDarkMode ? Colors.white : Colors.black,
          }]}>{counterStore.message}</Text>
        </View>
      </View>
      
      <Text style={[styles.helpText, {
        color: isDarkMode ? Colors.light : Colors.dark,
      }]}>
        返回Home页面修改状态，然后再回到此页面查看更新后的状态
      </Text>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>返回首页</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  stateContainer: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(33,150,243,0.1)',
    marginBottom: 20,
  },
  stateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  stateRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  stateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '30%',
  },
  stateValue: {
    fontSize: 18,
    fontWeight: '500',
  },
  helpText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DemoScreen; 