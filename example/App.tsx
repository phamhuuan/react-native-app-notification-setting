import {FC} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

const App = (): FC => {
	return <SafeAreaView style={styles.container}>
		
	</SafeAreaView>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default App;
