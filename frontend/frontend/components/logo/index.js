export default function Logo(){
    return <div className="imgContainer">
                <img src="/logo-coco-bambu.png" alt="logo-coco-bambu"/>
                <style jsx>
                        {`
                            .imgContainer {
                                border-radius : 50%;
                                border-color : white;
                                display : flex;
                                flex-direction : row;
                                justify-content : center;
                                margin-bottom : 10px;
                            }
                        `}
                </style>
            </div>
}