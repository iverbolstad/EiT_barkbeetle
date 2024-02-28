import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import React from "react";

const Sidemenu = () => {

	return (
		<div>
			<div style={{ display: 'flex', height: '100vh', width: '300px' }}>
				<Sidebar>
					<Menu>
						<SubMenu label="Charts">
							<MenuItem> Pie charts</MenuItem>
							<MenuItem> Line charts</MenuItem>
							<MenuItem> Bar charts</MenuItem>
						</SubMenu>
						<SubMenu label="Maps">
							<MenuItem> Google maps</MenuItem>
							<MenuItem> Open street maps</MenuItem>
						</SubMenu>
						<SubMenu label="Theme">
							<MenuItem> Dark</MenuItem>
							<MenuItem> Light</MenuItem>
						</SubMenu>
					</Menu>
				</Sidebar>
			</div>
		</div>
	);
};

export default Sidemenu;
