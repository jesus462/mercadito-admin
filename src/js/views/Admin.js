import React, { Component, useState, useEffect, useContext } from "react";
import { Context } from "../store/Context";
import { ExcelReader } from "../components/ExcelReader";

import "../../styles/Admin.scss";

export const Admin = () => {
	return (
		<div>
			<ExcelReader />
		</div>
	);
};
