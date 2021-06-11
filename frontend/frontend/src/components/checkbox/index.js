import { useState } from 'react';

export default function CheckBox({checked, onChange, item}){
    const [value, setValue] = useState(checked);

    return <input type="checkbox"
                  checked={value}
                  onChange={e => {
                      setValue(e.target.checked);
                      onChange(e.target.checked, item);
                  }}/>
}