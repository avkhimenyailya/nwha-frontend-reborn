import React from "react";
import classes from './Footer.module.scss'
import {Link} from "react-router-dom";

interface FooterProps {

}

function Footer(props: FooterProps) {
    return (
        <footer className={classes.Footer}>
            <div className={classes.Bar}>
                <p className={classes.Title}>
                    nothing to write home about, 2023
                </p>
                <Link
                    className={classes.InstagramLink}
                    to={'https://instagram.com/nwha.space'}>
                    <p className="link">Instagram</p>
                </Link>
                <Link
                    className={classes.GitHubLink}
                    to={'https://github.com/io-jeveloper'}>
                    <p className="link">GitHub</p>
                </Link>
                <p className={classes.Version}>
                    beta 0.43.2
                </p>
            </div>
        </footer>
    );
}

export default Footer;