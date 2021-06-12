export default function GlobalStyles({ children }) {
    return (
        <>
            {children}
            <style jsx global>
                {`
                    * {
                        padding: 0;
                        margin: 0;
                        border: 0;
                    }
                    .viewport {
                        height : 100vh;
                        display : flex;
                        flex : 1;
                        flex-direction : column;
                        justify-content : center;
                        align-items: center;
                    }
                    .row {
                        display : flex;
                        flex-direction : row;
                    }

                    .col {
                        display : flex;
                        flex-direction : column;
                    }
                `}
            </style>
        </>
    );
}
