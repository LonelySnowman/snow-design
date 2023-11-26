import React from 'react';
import '@snow-design/snow-foundation/empty/empty.scss'

const Button = ({ label, onClick }) => (
    <button onClick={onClick} className={'color'}>{label}</button>
);

export default Button;