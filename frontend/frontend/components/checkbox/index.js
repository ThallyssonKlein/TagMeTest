import { useState, useEffect } from 'react';
import classNames from 'classnames';

export default function CheckBox({checked, onChange, item}){
    const [value, setValue] = useState(checked);

    let liClasses = classNames({
        'round': true,
        'checked': value,
    });

    useEffect(_ => {
        onChange(value, item);
    }, [value]);

    return <div className="row">
                <div className={liClasses}
                     onClick={_ => {
                        setValue(!value);
                     }}>
                    <img src="/icon-check.png" alt="icon-check" width="20px" height="20px"/>
                </div>
                {item.name}
                <style jsx>
                    {`
                        .round { 
                            border-radius : 50%;
                            border : 1px solid black;
                            cursor : pointer;
                            background-color : white;
                            margin-right : 10px;
                            margin-bottom : 5px;
                            margin-top : 5px;
                            width : 20px;
                            height : 20px;
                            display : flex;
                            flex-direction : row;
                            align-items : center;
                            justify-content : center;
                        }
                        .checked {
                            background-color : green;
                        }
                    `}
                </style>
            </div>
}
