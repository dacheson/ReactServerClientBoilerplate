import React from "react";
import { observer } from 'mobx-react';

export default observer(function JackFruit(props: any) {
    return(
        <div>
            { props.user } <br></br>
            { props.chips }
        </div>
    );
});