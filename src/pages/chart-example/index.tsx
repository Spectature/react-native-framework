import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../router';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { SvgChart , SVGRenderer } from '@wuba/react-native-echarts';

// 注册必须的组件
echarts.use([
  SVGRenderer,
  LineChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const { width } = Dimensions.get('window');
const chartWidth = width - 32; // 考虑页面左右边距
const chartHeight = 300;

const ChartExampleScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProps>();
  const svgRef = useRef<any>(null);

  useEffect(() => {
    let chart: any;

    // 图表配置选项
    const option = {
      title: {
        text: '月度数据趋势',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['数据1', '数据2'],
        top: 30,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '数据1',
          type: 'line',
          data: [150, 230, 224, 218, 135, 147, 260],
          itemStyle: {
            color: '#2196F3',
          },
        },
        {
          name: '数据2',
          type: 'line',
          data: [120, 182, 191, 234, 290, 330, 310],
          itemStyle: {
            color: '#FF9800',
          },
        },
      ],
    };

    // 初始化图表
    if (svgRef.current) {
      chart = echarts.init(svgRef.current, 'light', {
        renderer: 'svg',
        width: chartWidth,
        height: chartHeight,
      });
      chart.setOption(option);
    }

    // 组件卸载时清理
    return () => chart?.dispose();
  }, []);

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        ECharts 图表示例
      </Text>

      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}
        >
          基础折线图
        </Text>
        <View style={styles.chartContainer}>
          <SvgChart ref={svgRef} />
        </View>
        <Text style={styles.chartDesc}>
          这是一个基础折线图示例，使用 @wuba/react-native-echarts 和 echarts 绘制。
          该图表展示了两组不同的月度数据趋势。
        </Text>
      </View>

      <View style={styles.docSection}>
        <Text style={styles.docTitle}>官方文档地址：</Text>
        <Text style={styles.docLink}>
        https://wuba.github.io/react-native-echarts/zh-Hans/
        </Text>
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 12,
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
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: chartHeight,
    marginVertical: 12,
  },
  chartDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    lineHeight: 20,
  },
  docSection: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  docTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  docLink: {
    fontSize: 14,
    color: '#2196F3',
    fontFamily: 'monospace',
  },
  backButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ChartExampleScreen; 