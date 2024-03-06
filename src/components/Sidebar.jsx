import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import React from "react";

const Sidemenu = ({ items }) => {

	return (
		<div>
			{items.devices && (<div>
				<Sidebar>
						<Menu>
							{items.devices.map((item, index) => (
								<SubMenu key={index} label={item.deviceId}>

									<MenuItem />
								</SubMenu>
							))}
						</Menu>
					</Sidebar>
			</div>)}
		</div>
	);
};

export default Sidemenu;
