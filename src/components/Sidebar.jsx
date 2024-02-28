import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import React from "react";

const Sidemenu = ({ items }) => {

	return (
		<div>
			<div style={{ display: 'flex', height: '100vh', width: '300px' }}>
				<Sidebar>
					<Menu>
						{items.map((item, index) => (
							<SubMenu key={index} label={item.deviceId}>
								{item.subItems.map((subItem, subIndex) => (
									<MenuItem key={subIndex}>{subItem}</MenuItem>
								))}
							</SubMenu>
						))}
					</Menu>
				</Sidebar>
			</div>
		</div>
	);
};

export default Sidemenu;
