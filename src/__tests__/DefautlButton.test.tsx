import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DefaultButton from '../components/buttons/DefaultButton';

describe('DefaultButton', () => {
    it('render', () => {
        const { getByText } = render(
            <DefaultButton color="blue" textColor="white" onPress={() => { }}>
                Click Me
            </DefaultButton>
        );
        const buttonText = getByText('Click Me');
        expect(buttonText).toBeTruthy();
        expect(buttonText.props.style).toEqual(
            expect.arrayContaining([expect.objectContaining({ color: 'white' })])
        );
    });

    it('bg color', () => {
        const { getByTestId } = render(
            <DefaultButton color="blue" textColor="white" onPress={() => { }} testID="button">
                Click Me
            </DefaultButton>
        );
        const button = getByTestId('button');
        expect(button.props.style).toMatchObject({ backgroundColor: 'blue' });
    });

    it('onpress', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(
            <DefaultButton color="blue" textColor="white" onPress={onPressMock}>
                Click Me
            </DefaultButton>
        );
        fireEvent.press(getByText('Click Me'));
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('props adds', () => {
        const { getByTestId } = render(
            <DefaultButton color="blue" textColor="white" onPress={() => { }} accessibilityLabel="test-button" testID="button">
                Click Me
            </DefaultButton>
        );
        const button = getByTestId('button');
        expect(button.props.accessibilityLabel).toBe('test-button');
    });
});