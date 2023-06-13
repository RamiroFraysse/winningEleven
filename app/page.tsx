"use client";
import "../src/styles/global.css";
import store from "../src/redux/store";
import {Bracket, FormikAbstraction} from "./components";
import {Provider} from "react-redux";

export default function Home(): React.ReactElement {
    return (
        <Provider store={store}>
            <div className="dark bg-gray-800">
                <header>
                    <h1 className="title text-center">
                        Bienvenido a Winning Eleven
                    </h1>
                </header>
            </div>

            <main className="dark bg-gray-800 flex min-h-screen flex-row items-center justify-between">
                <div className="w-full  max-w-md mx-auto">
                    <FormikAbstraction />
                </div>
                <Bracket />
            </main>
        </Provider>
    );
}
