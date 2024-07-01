import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DefaultInput from '../components/inputs/DefaultInput';

describe('DefaultInput', () => {
    it('label and value', () => {
        const { getByText, getByDisplayValue } = render(
            <DefaultInput
                error=""
                value="Test Value"
                label="Test Label"
                onChangeText={() => { }}
            />
        );

        const labelText = getByText('Test Label');
        const inputValue = getByDisplayValue('Test Value');

        expect(labelText).toBeTruthy();
        expect(inputValue).toBeTruthy();
    });

    it('error text', () => {
        const { getByText } = render(
            <DefaultInput
                error="Test Error"
                value=""
                label="Test Label"
                onChangeText={() => { }}
            />
        );

        const errorText = getByText('Test Error');

        expect(errorText).toBeTruthy();
    });

    it('not error text', () => {
        const { queryByText } = render(
            <DefaultInput
                error=""
                value=""
                label="Test Label"
                onChangeText={() => { }}
            />
        );

        const errorText = queryByText('Test Error');

        expect(errorText).toBeNull();
    });

    it('error text style', () => {
        const { getByDisplayValue } = render(
            <DefaultInput
                error="Test Error"
                value="Test Value"
                label="Test Label"
                onChangeText={() => { }}
            />
        );

        const input = getByDisplayValue('Test Value');

        expect(input.props.style).toEqual(
            expect.arrayContaining([expect.objectContaining({ borderColor: 'red' })])
        );
    });

    it('onchangetext', () => {
        const onChangeTextMock = jest.fn();
        const { getByDisplayValue } = render(
            <DefaultInput
                error=""
                value="Test Value"
                label="Test Label"
                onChangeText={onChangeTextMock}
            />
        );

        const input = getByDisplayValue('Test Value');

        fireEvent.changeText(input, 'New Value');

        expect(onChangeTextMock).toHaveBeenCalledWith('New Value');
    });
});