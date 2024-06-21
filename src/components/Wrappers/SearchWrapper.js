import React, {Fragment} from 'react';
import {Mainboard} from "../Mainboard/Mainboard";

export const SeacrhWrapper = (props) => {
    return(
        <Fragment>
            <Mainboard pins={props.pins}/>
        </Fragment>
    );
};