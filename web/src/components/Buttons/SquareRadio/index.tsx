import { ISquareRadioProps } from './props';
import './style.css';
import React from 'react';

const SquareRadio: React.FC<any> = (props: { Radios: ISquareRadioProps[] }) => {

    const radios = Array.from(props.Radios);
    return (
        <div className='radio-toolbar'>
            {radios.map((v) => {
                return (
                    <React.Fragment key={v.id}>
                        <input type='radio' id={'radio' + v.id} name='radio' value={v.value} checked />
                        <label htmlFor={'radio' + v.id}>{v.label}</label>
                    </React.Fragment>
                );
            })}
        </div>);
}

export default SquareRadio;