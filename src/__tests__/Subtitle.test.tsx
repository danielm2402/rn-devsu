import React from 'react';
import { render } from '@testing-library/react-native';
import Subtitle from '../components/texts/Subtitle';

describe('Subtitle', () => {
    it('text and color', () => {
        const { getByText } = render(
            <Subtitle>Test Subtitle</Subtitle>
        );
        const subtitleText = getByText('Test Subtitle');
        expect(subtitleText).toBeTruthy();
        expect(subtitleText.props.style).toEqual(
            expect.arrayContaining([expect.objectContaining({ color: 'gray' })])
        );
    });

    it('custom color', () => {
        const { getByText } = render(
            <Subtitle color="blue">Test Subtitle</Subtitle>
        );
        const subtitleText = getByText('Test Subtitle');

        expect(subtitleText.props.style).toEqual(
            expect.arrayContaining([expect.objectContaining({ color: 'blue' })])
        );
    });

    it('margin and styles', () => {
        const { getByText } = render(
            <Subtitle>Test Subtitle</Subtitle>
        );
        const subtitleText = getByText('Test Subtitle');

        expect(subtitleText.props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ fontSize: 16 }),
                expect.objectContaining({ marginBottom: 20 }),
                expect.objectContaining({ textAlign: 'center' })
            ])
        );
    });
});