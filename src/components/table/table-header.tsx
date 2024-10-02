import React from "react";
import { TableHeader, TableHead, TableRow } from "./table";

interface HeadTableComponentProps {

    headerInfo;
}


const HeadTable: React.FC<HeadTableComponentProps> = ({ headerInfo }) => {

    return (
        <TableHeader className='bg-slate-100'>
            <TableRow>
                {headerInfo.map(item => (
                    <TableHead className="px-6 py-3 border-b-2 text-center" key={item.id}>
                        {item.name}
                    </TableHead>
                ))}
            </TableRow>
        </TableHeader>
    );
}
export default HeadTable;