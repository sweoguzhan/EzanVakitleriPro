import React from 'react';


import {SvgXml} from "react-native-svg";
import {MosqueActive} from "../assets/icons/MosqueActive";
import {MosquePassive} from "../assets/icons/MosquePassive";
import {MonthlyActive} from "../assets/icons/MonthlyActive";
import {MonthlyPassive} from "../assets/icons/MonthlyPassive";
import {SettingsActive} from "../assets/icons/SettingsActive";
import {SettingsPassive} from "../assets/icons/SettingsPassive";
import {CompassActive} from "../assets/icons/CompassActive";
import {CompassPassive} from "../assets/icons/CompassPassive";


type TabIconsProps = {
    name: string;
    active: boolean;
};

const TabIcons = ({name, active}: TabIconsProps) => {
    switch (name) {
        case 'Home':
            return active ? <SvgXml xml={MosqueActive}/> : <SvgXml xml={MosquePassive} />;
        case 'MonthlyPrayTimes':
            return active ? <SvgXml xml={MonthlyActive} /> : <SvgXml xml={MonthlyPassive} />;
        case 'Settings':
            return active ? <SvgXml xml={SettingsActive} /> : <SvgXml xml={SettingsPassive} />;
        case 'QiblaScreen':
            return active ? <SvgXml xml={CompassActive} /> : <SvgXml xml={CompassPassive} />;
        default:
            return null;
    }
};

export default TabIcons;
