import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DefaultBottomSheet from '../components/bottomsheets/DefaultBottomSheet';

describe('DefaultBottomSheet', () => {
    it('renders correctly with given props', () => {
        const { getByText } = render(
            <DefaultBottomSheet
                open={true}
                name="Producto de prueba"
                accept={() => { }}
                callbackOnClossing={() => { }}
            />
        );

        const subtitleText = getByText('¿Esta seguro de eliminar el producto Producto de prueba?');
        expect(subtitleText).toBeTruthy();
    });

    it('calls accept when Confirmar button is pressed', () => {
        const acceptMock = jest.fn();
        const { getByText } = render(
            <DefaultBottomSheet
                open={true}
                name="Producto de prueba"
                accept={acceptMock}
                callbackOnClossing={() => { }}
            />
        );

        const confirmButton = getByText('Confirmar');
        fireEvent.press(confirmButton);

        expect(acceptMock).toHaveBeenCalled();
    });

    it('calls callbackOnClossing when Cancelar button is pressed', () => {
        const callbackOnClossingMock = jest.fn();
        const { getByText } = render(
            <DefaultBottomSheet
                open={true}
                name="Producto de prueba"
                accept={() => { }}
                callbackOnClossing={callbackOnClossingMock}
            />
        );

        const cancelButton = getByText('Cancelar');
        fireEvent.press(cancelButton);

        expect(callbackOnClossingMock).toHaveBeenCalled();
    });

    it('applies correct styles and animation on open and close', async () => {
        const { getByText, getByTestId } = render(
            <DefaultBottomSheet
                open={false}
                name="Producto de prueba"
                accept={() => { }}
                callbackOnClossing={() => { }}
            />
        );

        const subtitleText = getByText('¿Esta seguro de eliminar el producto Producto de prueba?');
        const closeButton = getByText('X');

        // Initially hidden
        expect(subtitleText.props.style).toEqual(
            expect.arrayContaining([expect.objectContaining({ opacity: 0 })])
        );

        // Open the bottom sheet
        fireEvent.press(closeButton);

        await waitFor(() => {
            expect(subtitleText.props.style).toEqual(
                expect.arrayContaining([expect.objectContaining({ opacity: 1 })])
            );
        });
    });
});