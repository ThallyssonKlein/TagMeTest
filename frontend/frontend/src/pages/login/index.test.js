import { screen, fireEvent } from "@testing-library/react";
import { getPage } from 'next-page-tester';
import Login from './index';
import ListOrders from '../listOrders';
import { act } from 'react-dom/test-utils';

describe("Testing the login", _ => {
    // test("should items be present in the document", async _ => {
    //     const { render } = await getPage({
    //         route: '/login',
    //     });
    //     render();      

    //     expect(screen.getByPlaceholderText("Nome do usuário")).toBeInTheDocument();
    //     expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    //     expect(screen.getByText("Acessar")).toBeInTheDocument();
    // }, 10000);

    it("should login with correct credentials", async _ => {
        // render(<Login/>);
        const { render } = await getPage({
            route : '/login'
        });
        render();
        const input1 = screen.getByPlaceholderText("Nome do usuário");
        const input2 = screen.getByPlaceholderText("Senha");
        const button = screen.getByText("Acessar");
        await act(async _ => {
            fireEvent.change(input1, { target: { value: 'test' } });
            fireEvent.change(input2, { target: { value: 'test' } });
            fireEvent.click(button);
        });

        expect(screen.getByText("App")).toBeInTheDocument();
    });

    it("should not login with wrong credentials", async _ => {
        // render(<Login/>);
        const { render } = await getPage({
            route : '/login'
        });
        render();
        const input1 = screen.getByPlaceholderText("Nome do usuário");
        const input2 = screen.getByPlaceholderText("Senha");
        const button = screen.getByText("Acessar");
        await act(async _ => {
            fireEvent.change(input1, { target: { value: 'test' } });
            fireEvent.change(input2, { target: { value: 'test' } });
            fireEvent.click(button);
        });

        expect(screen.getByText("App")).not.toBeInTheDocument();
    });
});