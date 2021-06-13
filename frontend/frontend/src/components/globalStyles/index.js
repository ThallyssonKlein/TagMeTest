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
                        font-family : arial;
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
                        
                        align-items : center;
                    }

                    .col {
                        display : flex;
                        flex-direction : column;
                    }

                    .header {
                        display : flex;
                        flex-direction : row;
                        background-color : black;
                        margin-bottom : 20px;
                        justify-content : space-between;
                    }

                    hr {
                        border-top: 0.1px solid gray;
                    }
                `}
            </style>
        </>
    );
}
