import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native';
import React, { useEffect } from 'react';
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS, Extrapolation, interpolate } from 'react-native-reanimated';
import Label from '../texts/Label';
import Subtitle from '../texts/Subtitle';
import DefaultButton from '../buttons/DefaultButton';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.5;
const MIN_TRANSLATE_Y = SCREEN_HEIGHT / 5;

interface DefaultBottomSheetProps extends ViewProps {
    open: boolean,
    callbackOnClossing: () => void
}

const DefaultBottomSheet: React.FC<DefaultBottomSheetProps> = ({ open, callbackOnClossing, children, style, ...props }) => {
    const translateY = useSharedValue(SCREEN_HEIGHT);
    const context = useSharedValue({ y: 0 });

    const handleGestureUpdate = (translationY: number) => {
        translateY.value = translationY + context.value.y;
        translateY.value = Math.max(translateY.value, -MAX_TRANSLATE_Y);
    };

    const handleGestureStart = () => {
        context.value = { y: translateY.value };
    };

    const handleGestureEnd = () => {
        if (translateY.value > -MIN_TRANSLATE_Y) {
            translateY.value = withSpring(SCREEN_HEIGHT);
        } else if (translateY.value < -MIN_TRANSLATE_Y) {
            translateY.value = withSpring(-MAX_TRANSLATE_Y);
        }
    };

    const gesture = Gesture.Pan()
        .onStart(() => {
            runOnJS(handleGestureStart)();
        })
        .onUpdate(e => {
            runOnJS(handleGestureUpdate)(e.translationY);
        })
        .onEnd(() => {
            runOnJS(handleGestureEnd)();
        });

    const reanimatedBottomStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    const scrollTo = (destination: number) => {
        'worklet';
        translateY.value = withSpring(destination, { damping: 50 });
    };

    const backgroundStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateY.value,
            [-MAX_TRANSLATE_Y, 0],
            [1, 0],
            Extrapolation.CLAMP
        );
        const pointerEvents = translateY.value === SCREEN_HEIGHT ? 'none' : 'auto';
        return { opacity, pointerEvents };

    });

    const openBottomSheet = () => {
        scrollTo(-MIN_TRANSLATE_Y);
    };

    const closeBottomSheet = () => {
        scrollTo(SCREEN_HEIGHT);
        callbackOnClossing()
    }

    useEffect(() => {
        scrollTo(SCREEN_HEIGHT);
    }, []);

    useEffect(() => {
        if (open)
            openBottomSheet()
    }, [open])

    return (
        <>
            <Animated.View style={[styles.background, backgroundStyle]} />
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.bottomsheet_container, reanimatedBottomStyle]}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={closeBottomSheet}>

                            <Text>X</Text>

                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.containerText}>
                        <Subtitle>
                            Eliminar
                        </Subtitle>
                    </ScrollView>

                    <DefaultButton color='#FEDD03' textColor='#000' onPress={() => { }}>
                        <Text>Confirmar</Text>
                    </DefaultButton>
                    <DefaultButton color='#E9ECF2' textColor='#000' onPress={closeBottomSheet}>
                        <Text>Cancelar</Text>
                    </DefaultButton>
                </Animated.View>
            </GestureDetector>

        </>
    );
};

const styles = StyleSheet.create({
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
        zIndex: 11000,
    },

    bottomsheet_container: {
        width: '100%',
        height: SCREEN_HEIGHT,
        backgroundColor: "#fff",
        position: 'absolute',
        top: SCREEN_HEIGHT / 1.5,
        zIndex: 12000,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingRight: 10
    },
    header: {
        width: '100%',
        alignItems: 'flex-end',
        paddingVertical: 10
    },
    containerText: {
        width: '100%',
        height: 200,
        maxHeight: '20%',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        textAlignVertical: 'center',
        paddingVertical: 30



    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: '#ddd',
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 10,
    },
});

export default DefaultBottomSheet;
