import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../router';
import { useGet, usePost, usePut, useDelete } from '../../hooks/useHttp';
import { userStore } from '../../store/user';
import { observer } from 'mobx-react-lite';

const ApiExampleScreen = observer(() => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProps>();
  
  // 状态
  const [userId, setUserId] = useState('1');
  const [postId, setPostId] = useState('1');
  const [response, setResponse] = useState<any>(null);
  
  // 用户登录示例
  const [username, setUsername] = useState('');
  const [demoToken, setDemoToken] = useState('');
  
  // HTTP hooks示例
  const getTodos = useGet('https://jsonplaceholder.typicode.com/todos');
  const getUser = useGet(`/111`);
  const createPost = usePost('https://jsonplaceholder.typicode.com/posts');
  const updatePost = usePut(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const deletePost = useDelete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  
  // 加载时检查用户是否已登录
  useEffect(() => {
    console.log('用户登录状态:', userStore.isLoggedIn);
    console.log('用户Token:', userStore.token);
  }, []);
  
  // 处理登录
  const handleLogin = () => {
    // 模拟登录成功
    const token = `demo_token_${Date.now()}`;
    const userId = '12345';
    
    // 保存到UserStore
    userStore.login(token, userId, username);
    setDemoToken(token);
  };
  
  // 处理登出
  const handleLogout = () => {
    userStore.logout();
    setDemoToken('');
  };
  
  // 处理函数
  const handleGetTodos = async () => {
    try {
      const data = await getTodos.execute();
      setResponse({ method: 'GET', url: '/todos', data: data.slice(0, 5) });
    } catch (error) {
      console.error('获取todos失败', error);
    }
  };
  
  const handleGetUser = async () => {
    try {
      const data = await getUser.execute();
      setResponse({ method: 'GET', url: `/users/${userId}`, data });
    } catch (error) {
      console.error('获取用户失败', error);
    }
  };
  
  const handleCreatePost = async () => {
    try {
      const payload = {
        title: 'foo',
        body: 'bar',
        userId: 1
      };
      const data = await createPost.execute(payload);
      setResponse({ method: 'POST', url: '/posts', data });
    } catch (error) {
      console.error('创建帖子失败', error);
    }
  };
  
  const handleUpdatePost = async () => {
    try {
      const payload = {
        id: postId,
        title: 'foo updated',
        body: 'bar updated',
        userId: 1
      };
      const data = await updatePost.execute(payload);
      setResponse({ method: 'PUT', url: `/posts/${postId}`, data });
    } catch (error) {
      console.error('更新帖子失败', error);
    }
  };
  
  const handleDeletePost = async () => {
    try {
      const data = await deletePost.execute();
      setResponse({ method: 'DELETE', url: `/posts/${postId}`, data });
    } catch (error) {
      console.error('删除帖子失败', error);
    }
  };
  
  // 加载状态
  const isLoading = getTodos.loading || getUser.loading || createPost.loading || updatePost.loading || deletePost.loading;
  
  // 添加用户登录/登出UI
  const userSection = (
    <View style={styles.userSection}>
      <Text style={[styles.sectionTitle, {
        color: isDarkMode ? Colors.white : Colors.black,
      }]}>用户认证示例 (UserStore)</Text>
      
      {userStore.isLoggedIn ? (
        // 已登录状态
        <View>
          <Text style={[styles.userInfo, {
            color: isDarkMode ? Colors.white : Colors.black,
          }]}>当前用户: {userStore.username}</Text>
          
          <Text style={[styles.userInfo, {
            color: isDarkMode ? Colors.white : Colors.black,
          }]}>用户ID: {userStore.userId}</Text>
          
          <Text style={[styles.tokenText, {
            color: isDarkMode ? Colors.light : Colors.dark,
          }]}>Token: {userStore.token.substring(0, 10)}...</Text>
          
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>登出</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // 未登录状态
        <View>
          <TextInput
            style={[styles.input, {
              color: isDarkMode ? Colors.white : Colors.black,
              borderColor: isDarkMode ? Colors.light : Colors.dark,
            }]}
            value={username}
            onChangeText={setUsername}
            placeholder="输入用户名"
            placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
          />
          
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={!username.trim()}
          >
            <Text style={styles.buttonText}>登录</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
  
  return (
    <ScrollView style={[styles.container, {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }]}>
      <Text style={[styles.title, {
        color: isDarkMode ? Colors.white : Colors.black,
      }]}>HTTP Hooks 示例</Text>
      
      {/* 用户ID输入 */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, {
          color: isDarkMode ? Colors.white : Colors.black,
        }]}>用户 ID:</Text>
        <TextInput
          style={[styles.input, {
            color: isDarkMode ? Colors.white : Colors.black,
            borderColor: isDarkMode ? Colors.light : Colors.dark,
          }]}
          value={userId}
          onChangeText={setUserId}
          keyboardType="numeric"
        />
      </View>
      
      {/* 帖子ID输入 */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, {
          color: isDarkMode ? Colors.white : Colors.black,
        }]}>帖子 ID:</Text>
        <TextInput
          style={[styles.input, {
            color: isDarkMode ? Colors.white : Colors.black,
            borderColor: isDarkMode ? Colors.light : Colors.dark,
          }]}
          value={postId}
          onChangeText={setPostId}
          keyboardType="numeric"
        />
      </View>
      
      {/* 用户认证部分 */}
      {userSection}
      
      {/* 按钮组 */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, styles.getButton]}
          onPress={handleGetTodos}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>GET Todos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.getButton]}
          onPress={handleGetUser}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>GET User</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.postButton]}
          onPress={handleCreatePost}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>POST Post</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.putButton]}
          onPress={handleUpdatePost}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>PUT Post</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDeletePost}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>DELETE Post</Text>
        </TouchableOpacity>
      </View>
      
      {/* 加载指示器 */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={[styles.loadingText, {
            color: isDarkMode ? Colors.white : Colors.black,
          }]}>加载中...</Text>
        </View>
      )}
      
      {/* 响应结果 */}
      {response && (
        <View style={styles.responseContainer}>
          <Text style={[styles.responseTitle, {
            color: isDarkMode ? Colors.white : Colors.black,
          }]}>响应结果 ({response.method} {response.url}):</Text>
          
          <ScrollView style={styles.responseScroll}>
            <Text style={[styles.responseText, {
              color: isDarkMode ? Colors.light : Colors.dark,
            }]}>
              {JSON.stringify(response.data, null, 2)}
            </Text>
          </ScrollView>
        </View>
      )}
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>返回首页</Text>
      </TouchableOpacity>
    </ScrollView>
  );
});

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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '20%',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  buttonGroup: {
    marginVertical: 20,
  },
  button: {
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  getButton: {
    backgroundColor: '#2196F3',
  },
  postButton: {
    backgroundColor: '#4CAF50',
  },
  putButton: {
    backgroundColor: '#FF9800',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
  },
  responseContainer: {
    marginTop: 10,
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  responseScroll: {
    maxHeight: 200,
  },
  responseText: {
    fontFamily: 'monospace',
  },
  backButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  userSection: {
    marginVertical: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(156, 39, 176, 0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
  tokenText: {
    fontSize: 14,
    fontFamily: 'monospace',
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#9C27B0',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default ApiExampleScreen; 