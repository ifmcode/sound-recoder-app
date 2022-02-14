import "./style.less";
import React from 'react';
import {ReactComponent as SettingIcon} from '../../resources/icons/settings.svg';
import {ReactComponent as IndicatorIcon} from '../../resources/icons/indicator.svg';
import {ReactComponent as PlaneIcon} from '../../resources/icons/plane.svg';
import {ReactComponent as TrashIcon} from '../../resources/icons/trash.svg';
import {ReactComponent as RecordingIcon} from '../../resources/icons/recording.svg';

/**
 * Icon component that shows a svg wrapped by a div
 * @param {String} iconName // possible values are 'settings', 'indicator', 'plane', 'trash' and 'recording'
 * @returns 
 */
const Icon = ({iconName}) => {

  const ICON_MAP = {
    "settings": {
      "svg": <SettingIcon/>,
      "class": "settings-icon",
    },
    "indicator": {
      "svg": <IndicatorIcon/>,
      "class": "indicator-icon",
    },
    "plane": {
      "svg": <PlaneIcon/>,
      "class": "plane-icon",
    },
    "trash": {
      "svg": <TrashIcon/>,
      "class": "trash-icon",
    },
    "recording": {
      "svg": <RecordingIcon/>,
      "class": "recording-icon",
    }
  }

  return (
    <div className={`icon ${ICON_MAP[iconName].class}`}>
      {
        ICON_MAP[iconName].svg
      }
    </div>
  );
};

export default Icon;
