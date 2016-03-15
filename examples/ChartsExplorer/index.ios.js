import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight
} from 'react-native';

import Pie from './components/Pie';
import Bar from './components/Bar';
import Line from './components/Line';
import Radar from './components/Radar';
import Bubble from './components/Bubble';
import Scatter from './components/Scatter';
import CandleStick from './components/CandleStick';
import HorizontalBar from './components/HorizontalBar';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

const data = ds.cloneWithRows([
  {
    id: 2,
    title: '<PieChart>',
    description: 'Displays a PieChart'
  }, {
    id: 3,
    title: '<BarChart>',
    description: 'Displays a BarChart'
  }, {
    id: 4,
    title: '<LineChart>',
    description: 'Displays a LineChart'
  }, {
    id: 5,
    title: '<RadarChart>',
    description: 'Displays a RadarChart'
  }, {
    id: 6,
    title: '<BubbleChart>',
    description: 'Displays a BubbleChart'
  }, {
    id: 7,
    title: '<ScatterChart>',
    description: 'Displays a ScatterChart'
  }, {
    id: 8,
    title: '<CandleStickChart>',
    description: 'Displays a CandleStickChart'
  }, {
    id: 9,
    title: '<HorizontalBarChart>',
    description: 'Displays a HorizontalBarChart'
  }
]);

class Navbar extends Component {
  handleBack = () => {
    this.props.navigator.pop();
  };
  render() {
    const backStyles = this.props.routeId === 1 ? [styles.navText, styles.right] : styles.navText;
    return (
      <View style={styles.bar}>
        <TouchableHighlight
          underlayColor='white'
          onPress={this.handleBack}
        >
          <Text style={backStyles}>Back</Text>
        </TouchableHighlight>
        <Text style={styles.navText}>{this.props.title}</Text>
        <Text style={styles.right}>Back</Text>
      </View>
    );
  }
}

class ChartList extends Component {
  static displayName = 'ChartList';

  renderRow = (row) => {
    const handlePress = () => {
      this.props.navigator.push({ id: row.id });
    };

    return (
      <TouchableHighlight
        onPress={handlePress}
        underlayColor='rgba(200, 200, 200, 0.3)'
      >
        <View style={styles.listItem}>
          <Text style={styles.title}>{row.title}</Text>
          <Text style={styles.description}>{row.description}</Text>
        </View>
      </TouchableHighlight>
    );
  };
  render() {
    return (
      <ListView
        dataSource={data}
        renderRow={this.renderRow}
        style={styles.list}
      />
    );
  }
}

class ChartsExplorer extends Component {
  static displayName = 'ChartsExplorer';
  renderScene = (route, navigator) => {
    let content = null;
    let navText = 'ChartExplorer';
    switch (route.id) {
      case 1:
        content = <ChartList navigator={navigator}/>;
        navText = 'ChartExplorer';
        break;
      case 2:
        content = <Pie navigator={navigator}/>;
        navText = 'PieChart';
        break;
      case 3:
        content = <Bar navigator={navigator}/>;
        navText = 'BarChart';
        break;
      case 4:
        content = <Line navigator={navigator}/>;
        navText = 'LineChart';
        break;
      case 5:
        content = <Radar navigator={navigator}/>;
        navText = 'RadarChart';
        break;
      case 6:
        content = <Bubble navigator={navigator}/>;
        navText = 'BubbleChart';
        break;
      case 7:
        content = <Scatter navigator={navigator}/>;
        navText = 'ScatterChart';
        break;
      case 8:
        content = <CandleStick navigator={navigator}/>;
        navText = 'CandleStickChart';
        break;
      case 9:
        content = <HorizontalBar navigator={navigator}/>;
        navText = 'HorizontalBarChart';
        break;
      default:
        content = null;
        break;
    }

    if (route.id !== 1) {
      content = <View style={styles.container}>{content}</View>;
    }
    return (
      <View style={{flex: 1}}>
        <Navbar
          navigator={navigator}
          title={navText}
          routeId={route.id}
        />
        {content}
      </View>
    );
  };

  render() {
    return (
      <Navigator
        configureScene={() => {
          return {
            ...Navigator.SceneConfigs.HorizontalSwipeJump,
            gestures: null
          };
        }}
        initialRoute={{ id: 1 }}
        renderScene={this.renderScene}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 60,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(230, 230, 230, 0.3)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(100, 100, 100, 0.2)'
  },
  navText: {
    fontSize: 16
  },
  right: {
    opacity: 0
  },
  list: {
    backgroundColor: 'white',
    padding: 0
  },
  listItem: {
    padding: 10,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(100, 100, 100, 0.2)'
  },
  description: {
    marginTop: 5,
    fontSize: 12,
    color: 'rgba(100, 100, 100, 0.7)'
  }
});

AppRegistry.registerComponent('ChartsExplorer', () => ChartsExplorer);
