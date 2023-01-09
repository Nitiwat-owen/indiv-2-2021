import React, {useEffect} from 'react'

interface MoleculeProp {
    id : number
    structure : string
}

const Molecule2D : React.FC<MoleculeProp> = ({id, structure}) => {
    useEffect(() => {
        const mol = new (window as any).MolViewer.Molecule();
        mol.get2DFromSMILE( structure );
    
        const mol2D = new (window as any).MolViewer.Mol2D(
            mol, 
            (window as any).d3.select( `#molucule${id}` ).node()
        ).init();
        drawMol();

        function drawMol(){
            mol.parseMol();
            mol.centre();
            mol2D.draw();
        }
    });

    return (
        <div id={`molucule${id}`} style={{ height:250, width:250}}>
        </div>
    )
}

export default Molecule2D;