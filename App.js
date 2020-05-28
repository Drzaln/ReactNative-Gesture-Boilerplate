import React from 'react'
import { Dimensions, Image, StyleSheet, View, StatusBar } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { add, clockRunning, cond, debug, divide, eq, floor, not, set, useCode } from 'react-native-reanimated'
import { snapPoint, timing, useClock, usePanGestureHandler, useValue } from 'react-native-redash'

const { width, height } = Dimensions.get('window')

export const assets = [
	require('./assets/3.jpg'),
	require('./assets/2.jpg'),
	require('./assets/4.jpg'),
	require('./assets/5.jpg'),
	require('./assets/1.jpg')
]

const snapPoints = assets.map((_, i) => i * -width)

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		flex: 1,
		justifyContent: 'center'
	},
	pictures: {
		width: width * assets.length,
		flexDirection: 'row'
	},
	picture: {
		width,
		height: 200,
		overflow: 'hidden'
	},
	image: {
		...StyleSheet.absoluteFillObject,
		width: undefined,
		height: undefined
	}
})

const App = () => {
	const clock = useClock()
	const index = useValue(0)
	const offsetX = useValue(0)
	const translateX = useValue(0)
	const { gestureHandler, state, velocity, translation } = usePanGestureHandler()
	const to = snapPoint(translateX, velocity.x, snapPoints)
	useCode(
		() => [
			cond(eq(state, State.ACTIVE), [ set(translateX, add(offsetX, translation.x)) ]),
			cond(eq(state, State.END), [
				set(translateX, timing({ clock, from: translateX, to })),
				set(offsetX, translateX),
				cond(not(clockRunning(clock)), [ set(index, floor(divide(translateX, -width))), debug('index', index) ])
			])
		],
		[]
	)
	return (
		<View style={styles.container}>
			<StatusBar translucent backgroundColor='transparent' />
			<PanGestureHandler {...gestureHandler}>
				<Animated.View style={[ styles.pictures, { transform: [ { translateX } ] } ]}>
					{assets.map((source) => (
						<View key={source} style={styles.picture}>
							<Image style={styles.image} {...{ source }} />
						</View>
					))}
				</Animated.View>
			</PanGestureHandler>
		</View>
	)
}

export default App
