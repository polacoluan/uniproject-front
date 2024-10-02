import React from "react";
import { TableRow, TableBody, TableCell } from "./table";

interface BodyTableComponentProps {

    bodyInfo: Array<[]>;
    cells: Array<[]>;
}

const BodyTable: React.FC<BodyTableComponentProps> = ({ bodyInfo, cells  }) => {

    return (
        <TableBody className='bg-slate-100'>
            {bodyInfo.map(item => (
                <TableRow className='odd:bg-white even:bg-slate-100 text-center text-slate-600' key={item.id}>                                        
                        {item.map()}    
                        <TableCell className="px-6 py-4 border-b" ref={item}>
                        </TableCell>                            
                </TableRow>
            ))}
        </TableBody>
    );
}

export default BodyTable;