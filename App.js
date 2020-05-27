import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { usePanGestureHandler, withOffset } from 'react-native-redash'

const App = () => {
	
	return (
		<View>
      <Card/>
    </View>
	)
}

export default App

const Card = () => {
  const { gestureHandler, state, translation, velocity } = usePanGestureHandler()
	const translateX = withOffset(translation.x, state)
  return(
    <View style={{ justifyContent: 'center', height: 220 }}>
			<View style={{ backgroundColor: 'red', width: 50, height: 50, marginLeft: 60, borderRadius: 100 }} />
			<View style={{ ...StyleSheet.absoluteFillObject }}>
				<PanGestureHandler {...gestureHandler}>
					<Animated.View
						style={{
							backgroundColor: 'green',
							width: '95%',
							height: 220,
							borderRadius: 6,
							transform: [ { translateX } ]
						}}
					/>
				</PanGestureHandler>
			</View>
		</View>
  )
}
