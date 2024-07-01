import React from 'react';
import { render } from '@testing-library/react-native';
import Value from '../components/texts/Value';

describe('Value', () => {
    it('text and color', () => {
        const { getByText } = render(
            <Value>Test Value</Value>
        );
        const valueText = getByText('Test Value');
        expect(valueText).toBeTruthy();
        expect(valueText.props.style).toEqual(
            expect.arrayContaining([expect.objectContaining({ color: 'inherit' })])
        );
    });

    it('custom color', () => {
        const { getByText } = render(
            <Value color="blue">Test Value</Value>
        );
        const valueText = getByText('Test Value');
        expect(valueText.props.style).toEqual(
            expect.arrayContaining([expect.objectContaining({ color: 'blue' })])
        );
    });

    it(' size and weight', () => {
        const { getByText } = render(
            <Value>Test Value</Value>
        );
        const valueText = getByText('Test Value');

        expect(valueText.props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ fontSize: 18 }),
                expect.objectContaining({ fontWeight: 'bold' })
            ])
        );
    });
});
