import PortfolioHeader from "./Header";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PortfolioHeader />
            {children}
        </>
    )
}