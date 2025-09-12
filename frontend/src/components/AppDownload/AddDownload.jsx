import React from "react";
import './AppDownload.css'
import { assets } from "../../assets/assets";
import { Trans } from 'react-i18next';

const AppDownload = () => {
    return (
        <div className='app-download' id='app-download'>
            <p>
                <Trans i18nKey="forBetterExperienceDownload">
                    For Better Experience Download <br/> Tomato App
                </Trans>
            </p>
            <div className="app-download-platforms">
                <img src={assets.play_store} alt="" />
                <img src={assets.app_store} alt="" />
            </div>
        </div>
    )
}
export default AppDownload;