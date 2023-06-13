import "./globals.css";
import {Poppins} from "next/font/google";

export const metadata = {
    title: "Winning Eleven",
    description: "Generated by create next app",
};

const poppins = Poppins({
    weight: ["400", "500", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    variable: "--font-opensans",
    preload: true,
    display: "swap",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return (
        <html className={poppins.className} lang="en">
            <body>{children}</body>
        </html>
    );
}
