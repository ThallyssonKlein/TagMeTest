import { screen } from "@testing-library/react";
import { getPage } from 'next-page-tester';
import Login from "./index";

describe("Testing the login", _ => {
    test("should items be present in the document", async _ => {
        const { render } = await getPage({
            route: '/login',
        });
        render();      

        expect(screen.getByPlaceholderText("Nome do usuário")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
        expect(screen.getByText("Acessar")).toBeInTheDocument();
    }, 10000);

    it("should login with correct credentials", async _ => {
        Login.doLogin("test", "test");
        const { render } = await getPage({
            route: '/app',
        });
        render();

        expect(screen.getByText("App")).toBeInTheDocument();
    });

    it("should not login with wrong credentials", async _ => {
        Login.doLogin("test", "test2");
        const { render } = await getPage({
            route: '/app',
        });
        render();

        expect(screen.getByText("App")).not.toBeInTheDocument();
    });
});