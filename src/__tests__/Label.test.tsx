
import React from 'react';
import { render } from '@testing-library/react-native';
import Label from '../components/texts/Label';

describe('Label', () => {
    it('text and color', () => {
        const { getByText } = render(
            <Label>Test Label</Label>
        );
        const labelText = getByText('Test Label');
        expect(labelText).toBeTruthy();

        expect(labelText.props.style).toEqual(
            expect.arrayContaining([expect.objectContaining({ color: 'gray' })])
        );
    });

    it('custom color', () => {
        const { getByText } = render(
            <Label color="blue">Test Label</Label>
        );
        const labelText = getByText('Test Label');

        expect(labelText.props.style).toEqual(
            expect.arrayContaining([expect.objectContaining({ color: 'blue' })])
        );
    });
});