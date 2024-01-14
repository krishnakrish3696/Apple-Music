import React from "react";
import '../Styles/Footer.css';

function Footer() {
    return(
        <div className="footer">
            <p className="language">India | हिंदी </p>
            <p className="cppyright"> 
                <span className="cpyrt">
                    Copyright © 2024  
                </span>
                <a href="https://www.apple.com" target="_blank" rel="noopener"><span dir="auto" class="appleinc">  Apple Inc. </span></a>
                <span dir="auto" class="allrights"> All rights reserved.</span>
            </p>
            <p className="otherinfo">
            <a href="https://www.apple.com/legal/internet-services/" target="_blank" rel="noopener"><span dir="auto" class="appleinc"> Internet Service Terms |</span>  </a>
            <a href="https://www.apple.com/legal/privacy/data/en/apple-music/" target="_blank" rel="noopener"><span dir="auto" class="appleinc">   Apple Music & Privacy   |   </span>  </a>
            <a href="https://www.apple.com/legal/privacy/en-ww/cookies/" target="_blank" rel="noopener"><span dir="auto" class="appleinc">   Cookie Warning  |   </span>    </a>
            <a href="https://support.apple.com/music" target="_blank" rel="noopener"><span dir="auto" class="appleinc">   Support   </span>    </a>
            </p>
        </div>
    )
}

export default Footer;