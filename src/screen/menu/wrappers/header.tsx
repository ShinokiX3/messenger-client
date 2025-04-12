interface Header {
    children?: React.ReactNode;
    sub?: React.ReactNode;
}

export const Header: React.FC<Header> = ({ children, sub }) => {
    return (
        <header className="shadow-side-nav-shadow">
            <div className="flex items-center gap-[0.8125rem] p-side-header-padding">
                { children }
            </div>
            { sub }
        </header>
    )
}
