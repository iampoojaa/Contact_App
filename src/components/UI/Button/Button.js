import React from 'react';

import classes from './Button.css';

const button = (props) => (
    <button
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked} onSubmit={props.submitted}>{props.children}</button>
);

export default button;