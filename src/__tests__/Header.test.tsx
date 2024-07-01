import React from 'react';
import { render } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import Header from '../components/appheaders/Header';
import TestRenderer from 'react-test-renderer';
import { View } from 'react-native';

describe('Header', () => {
    it('renders correctly with given title', () => {
        const title = 'Test Header';
        const { getByText } = render(<Header title={title} />);

        // Comprueba que el título se muestra correctamente
        expect(getByText(title)).toBeTruthy();
    });

    it('applies the correct styles', () => {
        const title = 'Styled Header';
        const { getByText } = render(<Header title={title} />);

        // Comprueba que el título tiene el estilo correcto
        const titleElement = getByText(title);
        expect(titleElement.props.style).toMatchObject({
            color: 'black',
            fontSize: 18,
        });
    });

    it('renders with the correct container styles', () => {
        const title = 'Container Styled Header';
        const testRenderer = TestRenderer.create(<Header title={title} />);
        const testInstance = testRenderer.root;

        // Obtén el elemento contenedor
        const headerElement = testInstance.findByType(View); // Asegúrate de importar View desde 'react-native'

        expect(headerElement).not.toBeNull();
        if (headerElement) {
            expect(headerElement.props.style).toMatchObject({
                width: '100%',
                height: 80,
                paddingTop: 36,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
            });
        }
    });
});