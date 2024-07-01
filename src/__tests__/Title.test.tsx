import React from 'react';
import { render } from '@testing-library/react-native';
import Title from '../components/texts/Title';

describe('Title', () => {
    it('text and color', () => {
        const { getByText } = render(
            <Title>Test Title</Title>
        );
        const titleText = getByText('Test Title');
        expect(titleText).toBeTruthy();
        expect(titleText.props.style).toEqual(
            expect.arrayContaining([expect.objectContaining({ color: 'inherit' })])
        );
    });

    it('applies the correct custom color', () => {
        const { getByText } = render(
            <Title color="blue">Test Title</Title>
        );
        const titleText = getByText('Test Title');

        expect(titleText.props.style).toEqual(
            expect.arrayContaining([expect.objectContaining({ color: 'blue' })])
        );
    });

    it('applies the correct font size and weight', () => {
        const { getByText } = render(
            <Title>Test Title</Title>
        );
        const titleText = getByText('Test Title');

        expect(titleText.props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ fontSize: 24 }),
                expect.objectContaining({ fontWeight: 'bold' })
            ])
        );
    });
});