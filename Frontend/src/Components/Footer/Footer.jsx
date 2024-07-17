/* eslint-disable no-unused-vars */
import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
	return (
		<>
			<div className="footer" id="footer">
				<div className="footer-content">
					<div className="footer-content-left">
						<img
							style={{ width: "150px", borderRadius: "10px" }}
							src={assets.footer_logo}
							alt="logo_icon"
						/>
						{/* <img src={assets.logo} alt="logo_icon" /> */}
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Cum beatae sunt molestiae possimus, sed vero
							itaque! Saepe dolorum animi quo recusandae, nisi
							velit commodi doloremque.
						</p>
						<div className="footer-social-icons">
							<img src={assets.facebook_icon} alt="fb" />
							<img src={assets.twitter_icon} alt="x" />
							<img src={assets.linkedin_icon} alt="linkedin" />
						</div>
					</div>
					<div className="footer-content-center">
						<h2>Company</h2>
						<ul>
							<li>Home</li>
							<li>About Us</li>
							<li>Delivery</li>
							<li>Privacy Policy</li>
						</ul>
					</div>
					<div className="footer-content-right">
						<h2>Get in Touch</h2>
						<ul>
							<li>+91 9876543210</li>
							<li>info@tomato.com</li>
						</ul>
					</div>
				</div>
				<hr />
				<p className="footer-copyright">
					Copyright 2024 &copy; Tomato.com - All Rights Reserved.
				</p>
			</div>
		</>
	);
};

export default Footer;
