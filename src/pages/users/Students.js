import React from "react";

import { StudentTable } from "../../components/Tables";
import InnerTopBar from "../components/InnerTopBar";

const Students = () => {
    return (
        <div>
            <InnerTopBar />
            <StudentTable />
        </div>
    );
};

export default Students;